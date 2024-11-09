<script setup lang="ts">
import QTagColors from '@pkg/lib/QTagColors'
import type QTagCustomize from '@pkg/lib/QTagCustomize'

withDefaults(
  defineProps<{
    self?: boolean
    name: string
    avatar?: string
    tag?: string
    tagColor?: QTagColors | keyof typeof QTagColors | QTagCustomize
    isBot?: boolean
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: QTagColors.grey,
    isBot: false
  }
)
</script>

<template>
  <section
    class="message-container"
    :class="self ? ['message-container--self', 'message-container--align-right'] : ''"
  >
    <div class="qq-message__avatar-span">
      <div
        v-if="avatar"
        :style="{ backgroundImage: `url(${avatar})` }"
        class="qq-message__avatar"
      ></div>
      <div v-else class="qq-message__text-avatar">
        <span>{{ name[0] }}</span>
      </div>
    </div>
    <div class="qq-message__user-name nocopy qq-text-ellipsis">
      <span class="qq-text-ellipsis">{{ name }}</span>
      <div
        v-if="tag && typeof tagColor === 'string'"
        class="q-tag qq-message__user-label"
        :class="[`q-tag--${tagColor}`]"
      >
        {{ tag }}
      </div>
      <div
        v-else-if="tag && typeof tagColor === 'object'"
        class="q-tag qq-message__user-label"
        :style="{ backgroundColor: tagColor.backgroundColor, color: tagColor.color }"
      >
        {{ tag }}
      </div>
      <label v-if="isBot" class="qq-bot-label qq-bot-label--middle qq-bot-label--mini">
        <i class="q-svg-icon q-icon" style="width: 1em; height: 1em">
          <svg
            id="channle_robot_small_16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.5 3.29119C8.91311 3.10159 9.2 2.6843 9.2 2.2C9.2 1.53726 8.66274 1 8 1C7.33726 1 6.8 1.53726 6.8 2.2C6.8 2.6843 7.08689 3.10159 7.5 3.29119V4.00015V4.02059C4.42023 4.27466 2 6.85472 2 10V10.5715C2 12.465 3.53502 14 5.42857 14H10.5714C12.465 14 14 12.465 14 10.5715V10C14 6.85472 11.5798 4.27466 8.5 4.02059V4.00015V3.29119ZM13 10.5715V10C13 7.23863 10.7614 5.00005 8 5.00005C5.23858 5.00005 3 7.23863 3 10V10.5715C3 11.9127 4.08731 13 5.42857 13H10.5714C11.9127 13 13 11.9127 13 10.5715ZM5.7002 9.5V7.5H6.7002V9.5H5.7002ZM9.2998 7.5V9.5H10.2998V7.5H9.2998Z"
              fill="currentColor"
            ></path>
          </svg>
        </i>
      </label>
    </div>
    <div class="message-content__wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.message-container {
  display: grid;
  grid-auto-rows: min-content;
  grid-template-areas:
    'avatar . nickname'
    'avatar . content';
  grid-template-columns: var(--qq-avatar_size_2) 8px auto;
  justify-content: start;
  padding-top: 15px;

  &.message-container--align-right {
    grid-template-areas:
      'nickname . avatar'
      'content . avatar';
    grid-template-columns: auto 8px var(--qq-avatar_size_2);
    justify-content: end;
    justify-items: end;
  }

  .qq-message__avatar-span {
    align-self: start;
    display: inline-block;
    grid-area: avatar;
    min-width: var(--qq-avatar_size_2);

    .qq-message__avatar {
      width: var(--qq-avatar_size_2);
      height: var(--qq-avatar_size_2);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50%;
    }

    .qq-message__text-avatar {
      width: var(--qq-avatar_size_2);
      height: var(--qq-avatar_size_2);
      background-color: var(--qq-fill_light_primary);
      line-height: var(--qq-avatar_size_2);
      text-align: center;
      font-weight: bold;
      color: var(--qq-bubble_guest_text);
      border-radius: 50%;
      transition:
        color 0.2s,
        background-color 0.2s;
    }
  }

  .qq-message__user-name {
    align-items: center;
    color: var(--qq-on_bg_text);
    display: flex;
    grid-area: nickname;
    min-height: 18px;
    position: relative;
    top: -2px;
    user-select: none;
    font-size: var(--qq-font_size_2);
    line-height: var(--qq-line_height_2);
    padding: 0 calc(var(--qq-avatar_size_2) + 8px) 0 0;
    transition: color 0.2s;
  }

  &.message-container--align-right .qq-message__user-name {
    padding: 0 0 0 calc(var(--qq-avatar_size_2) + 8px);
    flex-direction: row-reverse;

    .group-member-label {
      margin-right: 4px;
    }
  }

  .qq-message__user-label {
    margin-left: 4px;
    font-size: min(var(--qq-font_size_1), 14px);
    line-height: min(var(--qq-line_height_1), 20px);
  }

  &.message-container--align-right .qq-message__user-label {
    margin-right: 4px;
  }
}

.message-content__wrapper {
  color: var(--qq-bubble_guest_text);
  display: flex;
  grid-area: content;
  max-width: -webkit-fill-available;
  min-height: 38px;
  overflow: hidden;
  transition: color 0.2s;

  &:deep() p {
    margin: 0;
  }

  &:deep() .mix-message__container {
    padding: 8px 10px;
  }

  &:deep() .msg-content-container {
    position: relative;
    border-radius: 8px;
    // box-sizing: content-box;
    // display: flex;
    // justify-content: center;
    min-width: 20px;
    overflow: hidden;
    word-break: break-word;

    transition: background-color 0.2s;

    &.container--others {
      background-color: var(--qq-bubble_guest);
      transition: background-color 0.2s;
    }
    &.container--self {
      background: var(--qq-host_bubble_bg_css_value);
      background-size: 100vw 100vh;
      color: var(--on_bubble_host_text);
      transition:
        color 0.2s,
        background-color 0.2s;

      a {
        color: var(--qq-host_bubble_text_link);
        transition: color 0.2s;
      }
    }

    &.container--others .message-content ::-moz-selection {
      background-color: rgba(0, 153, 255, 0.5);
    }
    &.container--others .message-content ::selection {
      background-color: rgba(0, 153, 255, 0.5);
    }

    &.container--self .message-content ::-moz-selection {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
    &.container--self .message-content ::selection {
      background-color: hsla(0, 0%, 100%, 0.3);
    }
  }
}

.qq-bot-label {
  align-items: center;
  align-self: center;
  background-color: #0a64ff;
  color: var(--qq-text_white);
  display: inline-flex;
  justify-content: center;
  white-space: nowrap;

  &.qq-bot-label--large {
    border-radius: 4px;
    font-size: min(var(--qq-font_size_2), 16px);
    line-height: min(var(--qq-line_height_2), 22px);
    margin: 0 4px;
    padding: 1px 6px;
  }

  &.qq-bot-label--middle {
    border-radius: 4px;
    font-size: min(var(--qq-font_size_1), 14px);
    line-height: min(var(--qq-line_height_1), 20px);
    margin: 0 4px;
    padding: 1px 4px;
  }

  &.qq-bot-label--small {
    border-radius: 2px;
    font-size: 9px;
    line-height: 11px;
    margin: 0 2px;
    padding: 1px 3px;
  }

  &.qq-bot-label--mini {
    border-radius: 4px;
    padding: 3px;
  }

  & > span {
    padding-left: 2px;
  }
}
</style>
