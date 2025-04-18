<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIntervalFn } from '@vueuse/core'

import QVoiceBase from './base/QVoiceBase.vue'
import type QTagColors from '@pkg/lib/QTagColors'
import type QTagCustomize from '@pkg/lib/QTagCustomize'

const props = withDefaults(
  defineProps<{
    self?: boolean
    name: string
    avatar?: string
    tag?: string
    tagColor?: QTagColors | keyof typeof QTagColors | QTagCustomize
    isBot?: boolean
    src: string
    text?: string
    volume?: number
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    text: '[呃，什么都没有听到]',
    volume: 1.0
  }
)

const audio = ref<HTMLAudioElement>()
const progressItemsRef = ref<HTMLDivElement>()
const processLinePos = ref(0)
const duration = ref(0)
const formatedDuration = ref('')
const processHeightRefs = ref<number[]>([])
const playEnded = ref(true)
const playPaused = ref(true)

let controller: processController | undefined

function getLineCount(num: number) {
  num = num / 1.2
  return Array.from({ length: num >= 25 ? 25 : num < 5 ? 5 : num }, () => getRndInteger(30, 60))
}

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatDuration(duration: number) {
  const m = Math.floor(duration / 60)
  const s = Math.round(duration % 60)
  return m > 0 ? `${m}'${s}"` : `${s}"`
}

async function loadAudio() {
  if (!audio.value) return
  duration.value = Math.round(audio.value.duration)

  formatedDuration.value = formatDuration(duration.value)
  processHeightRefs.value = getLineCount(duration.value)
}

function play() {
  if (!(audio.value && progressItemsRef.value)) return
  playPaused.value = !playPaused.value

  if (playEnded.value) {
    audio.value.play()
    playEnded.value = false
    playPaused.value = false

    progressItemsRef.value.style.setProperty('--process-item-color', 'var(--qq-text-secondary-01)')
    controller = new processController([...progressItemsRef.value.children] as HTMLDivElement[])
    controller.start()
  } else {
    if (audio.value.paused) {
      audio.value.play()
      controller?.resume()
      playPaused.value = false
    } else {
      audio.value.pause()
      controller?.pause()
      playPaused.value = true
    }
  }
}

class processController {
  private progressItems: HTMLElement[]
  private pauseFn: (() => void) | undefined = undefined
  private resumeFn: (() => void) | undefined = undefined

  constructor(progressItems: HTMLElement[]) {
    this.progressItems = progressItems
  }

  start() {
    let i = 0
    const { pause: pauseBar, resume: resumeBar } = useIntervalFn(
      () => {
        if (playEnded.value) {
          pauseBar()
          i = 0
          this.progressItems.forEach(item => item.style.removeProperty('--process-item-color'))
          progressItemsRef.value?.style.setProperty(
            '--process-item-color',
            'var(--qq-text_primary)'
          )
        }
        this.progressItems[i]?.style.setProperty('--process-item-color', 'var(--qq-text_primary)')
        i++
      },
      (Math.floor(duration.value) / this.progressItems.length) * 1000,
      { immediate: true }
    )

    const { pause: pauseLine, resume: resumeLine } = useIntervalFn(
      () => {
        if (playEnded.value) {
          pauseLine()
          processLinePos.value = 0
        }
        processLinePos.value++
      },
      (Math.floor(duration.value) / 100) * 1000,
      { immediate: true }
    )

    this.pauseFn = () => {
      pauseBar()
      pauseLine()
    }
    this.resumeFn = () => {
      resumeBar()
      resumeLine()
    }
  }

  pause() {
    if (this.pauseFn) {
      this.pauseFn()
    }
  }

  resume() {
    if (this.resumeFn) {
      this.resumeFn()
    }
  }
}

function reset() {
  playEnded.value = true
  playPaused.value = true
}

watch(
  () => props.volume,
  volume => {
    if (audio.value === undefined) return
    audio.value.volume = volume
  }
)
</script>

<template>
  <q-voice-base
    :self="self"
    :name="name"
    :avatar="avatar"
    :tag="tag"
    :tag-color="tagColor"
    :is-bot="isBot"
    :src="src"
    :play="play"
    :play-paused="playPaused"
    :formated-duration="formatedDuration"
    :text="text"
  >
    <audio ref="audio" :src="src" @ended="reset" @loadedmetadata="loadAudio"></audio>
    <div
      ref="progressItemsRef"
      class="ptt-element__progress"
      style="--process-item-color: var(--qq-text_primary)"
    >
      <div
        v-if="!playEnded"
        class="ptt-element__progress-tag"
        :style="{ left: `calc(${processLinePos}% - 1px)` }"
      ></div>
      <div
        v-for="(height, index) in processHeightRefs"
        :key="index"
        class="ptt-element__progress-item"
        :style="{ height: `${height}%` }"
      ></div>
    </div>
  </q-voice-base>
</template>
