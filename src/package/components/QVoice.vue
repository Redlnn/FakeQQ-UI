<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
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

const progressItemsRef = ref<HTMLDivElement>()
const processLinePos = ref(0)
const formatedDuration = ref('')
const processHeightRefs = ref<number[]>([])
const playEnded = ref(true)
const playPaused = ref(true)

let audioCtx: AudioContext | undefined
let audioBuffer: AudioBuffer | undefined
let controller: processController | undefined
let gainNode: GainNode | undefined

function getLineCount(num: number) {
  num = num / 1.2
  if (num < 4) return 4
  if (num > 30) return 30
  return num
}

function convertDbToPercentage(db: number) {
  const min = -80
  const max = 0

  if (db >= max) return 1 // 0 dB 为 100%
  if (db <= min) return 0.2 // -90 dB 为 5%

  // 线性插值计算
  return ((db - min) / (max - min)) * (1 - 0.2) + 0.2
}

function formatDuration(duration: number) {
  const m = Math.floor(duration / 60)
  const s = Math.round(duration % 60)
  return m > 0 ? `${m}'${s}"` : `${s}"`
}

async function loadAudio(src: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  gainNode = audioCtx.createGain()
  gainNode.connect(audioCtx.destination)

  try {
    const res = await fetch(src)
    const data = await res.arrayBuffer()
    audioBuffer = await audioCtx.decodeAudioData(data)

    const channelData = audioBuffer.getChannelData(0)
    const numSamples = getLineCount(audioBuffer.duration)
    const segmentLength = Math.floor(channelData.length / numSamples)

    const loudnessArray = Array.from({ length: numSamples }, (_, i) => {
      const segment = channelData.slice(i * segmentLength, (i + 1) * segmentLength)
      const rms = Math.sqrt(segment.reduce((sum, value) => sum + value ** 2, 0) / segment.length)
      const safeRms = Math.max(rms, 1e-10)
      return 20 * Math.log10(safeRms)
    })

    formatedDuration.value = formatDuration(audioBuffer.duration)
    processHeightRefs.value = loudnessArray.map(convertDbToPercentage)
  } catch (error) {
    console.error('Error loading audio file:', error)
    formatedDuration.value = 'Error'
    processHeightRefs.value = Array(10).fill(0.05)
  }
}

function play() {
  if (
    audioCtx === undefined ||
    audioBuffer === undefined ||
    progressItemsRef.value === undefined ||
    gainNode === undefined
  )
    return

  if (playEnded.value) {
    const source = audioCtx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(gainNode)
    source.onended = () => {
      playEnded.value = true
      playPaused.value = true
    }
    source.start()
    playEnded.value = false
    playPaused.value = false

    progressItemsRef.value.style.setProperty('--process-item-color', 'var(--qq-text-secondary-01)')
    controller = new processController(
      [...progressItemsRef.value.children] as HTMLDivElement[],
      audioBuffer.duration
    )
    controller.start()
  } else {
    if (audioCtx.state === 'running') {
      audioCtx.suspend()
      controller?.pause()
      playPaused.value = true
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume()
      controller?.resume()
      playPaused.value = false
    }
  }
}

class processController {
  private progressItems: HTMLElement[]
  private duration: number
  private pauseFn: (() => void) | undefined = undefined
  private resumeFn: (() => void) | undefined = undefined

  constructor(progressItems: HTMLElement[], duration: number) {
    this.progressItems = progressItems
    this.duration = duration
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
        this.progressItems[i].style.setProperty('--process-item-color', 'var(--qq-text_primary)')
        i++
      },
      (Math.floor(this.duration) / this.progressItems.length) * 1000,
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
      (Math.floor(this.duration) / 100) * 1000,
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

onMounted(async () => {
  await loadAudio(props.src)
})

onBeforeUnmount(() => {
  if (audioCtx === undefined) return
  audioCtx.close()
})

watch(
  () => props.volume,
  volume => {
    if (gainNode === undefined) return
    gainNode.gain.value = volume
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
        :style="{ height: `${height * 100}%` }"
      ></div>
    </div>
  </q-voice-base>
</template>
