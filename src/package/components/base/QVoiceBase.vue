<script setup lang="ts">
import { ref } from 'vue'
import QMessageBase from './QMessageBase.vue'
import type QTagColors from '@pkg/lib/QTagColors'
import type QTagCustomize from '@pkg/lib/QTagCustomize'
import QVoicePlayIcon from './QVoicePlayIcon.vue'
import QVoicePauseIcon from './QVoicePauseIcon.vue'

withDefaults(
  defineProps<{
    self?: boolean
    name: string
    avatar?: string
    tag?: string
    tagColor?: QTagColors | keyof typeof QTagColors | QTagCustomize
    isBot?: boolean
    src: string
    text?: string

    play: () => void
    playPaused: boolean
    formatedDuration: string
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    text: '[呃，什么都没有听到]'
  }
)

const showText = ref(false)
</script>

<template>
  <q-message-base
    :self="self"
    :name="name"
    :avatar="avatar"
    :tag="tag"
    :tag-color="tagColor"
    :is-bot="isBot"
  >
    <div
      class="msg-content-container mix-message__container ptt-message nocopy"
      :class="self ? 'container--self' : 'container--others'"
      @contextmenu.prevent.stop="showText = !showText"
    >
      <div class="ptt-message__inner">
        <div class="ptt-element" @click="play">
          <div class="ptt-element__top-area">
            <div class="ptt-element__button">
              <i class="q-svg-icon q-icon" style="width: 10px; height: 10px">
                <component :is="playPaused ? QVoicePlayIcon : QVoicePauseIcon" />
              </i>
            </div>
            <slot></slot>
            <div class="ptt-element__duration">
              <span>{{ formatedDuration }}</span>
            </div>
          </div>
        </div>
        <div v-show="showText" class="ptt-element__bottom-area">
          <div class="ptt-element__bottom-area-text">
            {{ text }}
            <div class="ptt-element__bottom-area-icon" @click="showText = false">
              <i class="q-svg-icon q-icon" style="width: 1em; height: 1em">
                <svg
                  id="arrow_up_24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 16L12 7L21 16"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-message-base>
</template>

<style lang="scss" scoped>
.ptt-message {
  display: flex;
  align-items: center;
  font-size: var(--font_size_main_2);

  .ptt-message__inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
}

.ptt-element__bottom-area {
  font-size: var(--qq-font_size_3);
}

.ptt-element__bottom-area-icon {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 12px;
  justify-content: center;
}

.ptt-element__bottom-area:before {
  background: var(--qq-border_standard);
  content: '';
  display: block;
  height: 1px;
  margin: 11px 0 8px;
  width: 100%;
  transition: background-color 0.2s;
}

.ptt-element {
  cursor: pointer;
  height: 18px;
  padding-left: 26px;

  .ptt-element__top-area {
    display: flex;
    position: relative;
  }

  .ptt-element__button {
    border-radius: 8px;
    height: 16px;
    left: -26px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;

    .q-icon {
      left: 3px;
      position: absolute;
      top: 3px;

      svg {
        height: 100%;
        width: 100%;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: fill 0.2s;
      }
    }
  }

  &:deep() .ptt-element__progress {
    align-items: center;
    display: flex;
    height: 18px;
    line-height: 18px;
    position: relative;

    &.cursorMoveing {
      cursor: ew-resize;
    }

    .ptt-element__progress-item {
      border-radius: 1px;
      display: inline-block;
      margin-right: 2px;
      pointer-events: none;
      width: 2px;
    }

    .ptt-element__progress-item:last-child {
      margin-right: 0;
    }

    .ptt-element__progress-item.notplayed {
      opacity: 0.5;
    }

    .ptt-element__progress-tag {
      background: linear-gradient(
        180deg,
        hsla(0, 0%, 100%, 0) 0,
        var(--on_brand_primary) 54.06%,
        hsla(0, 0%, 100%, 0) 100%
      );
      height: 38px;
      pointer-events: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 2px;
    }
  }

  .ptt-element__duration {
    color: var(--qq-text_white);
    display: flex;
    justify-items: center;
    line-height: 18px;
    margin-left: 8px;
    transition: color 0.2s;
  }

  .ptt-element__duration span {
    font-size: var(--qq-font_size_2);
  }
}
.container--self {
  .ptt-element__button {
    background-color: var(--on_brand_primary);
    transition: background-color 0.2s;
  }
  .ptt-element__button .q-icon {
    color: var(--qq-host_bubble_bg_css_value);
    transition: color 0.2s;
  }
  &:deep() .ptt-element__progress-item {
    background-color: var(--on_brand_primary);
    transition: background-color 0.2s;
  }
  .ptt-element__duration {
    color: var(--on_brand_primary);
    transition: color 0.2s;
  }
}

.container--others {
  .ptt-element__button {
    background-color: var(--qq-icon_primary);
    transition: background-color 0.2s;
  }
  .ptt-element__button .q-icon {
    color: var(--qq-bubble_guest);
    transition: color 0.2s;
  }
  &:deep() .ptt-element__progress-item {
    background-color: var(--process-item-color);
    transition: background-color 0.2s;
  }
  .ptt-element__duration {
    color: var(--qq-text_primary);
    transition: color 0.2s;
  }
  &:deep() .ptt-element__progress-tag {
    background: linear-gradient(
      180deg,
      rgba(51, 51, 51, 0) 0,
      var(--qq-text_primary) 54.06%,
      rgba(51, 51, 51, 0) 100%
    ) !important;
  }
}
</style>
