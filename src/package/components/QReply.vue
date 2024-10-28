<script setup lang="ts">
import QMessageItem from './base/QMessageItem.vue'
import QReplyMessageElement from './base/QReplyMessageElement.vue'
import type QTagColors from '@pkg/lib/QTagColors'

const props = withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: QTagColors | keyof typeof QTagColors
    isBot?: boolean
    targetName: string
    replyText?: string
    replyImageUrl?: string
    replyImageAlt?: string
    maxImgWidth?: string
    maxImgHeight?: string
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined,
    isBot: false,
    replyText: '',
    replyImageUrl: undefined,
    replyImageAlt: undefined,
    maxImgWidth: '200px',
    maxImgHeight: '220px'
  }
)
console.log(props)
</script>

<template>
  <q-message-item
    :self="self"
    :user-name="userName"
    :avatar-url="avatarUrl"
    :tag-content="tagContent"
    :tag-color="tagColor"
    :is-bot="isBot"
  >
    <div
      class="msg-content-container reply-message__container"
      :class="self ? 'container--self' : 'container--others'"
    >
      <div class="message-content reply-message__inner">
        <q-reply-message-element
          :self="self"
          :target-name="targetName"
          :reply-text="replyText"
          :reply-image-url="replyImageUrl"
          :reply-image-alt="replyImageAlt"
          :max-img-width="maxImgWidth"
          :max-img-height="maxImgHeight"
        />
        <span><slot></slot></span>
      </div>
    </div>
  </q-message-item>
</template>

<style lang="scss" scoped>
.reply-message__container {
  padding: 10px;

  .reply-message__inner {
    font-size: 13px;
    line-height: 21px;
    min-height: 20px;
    overflow: hidden;

    &:deep() a {
      color: var(--qq-text_link);
      text-decoration: underline;
      word-break: break-all;
      white-space: pre-wrap;
    }

    &:deep() a[at] {
      text-decoration: none;
      white-space: initial;
    }
  }
}
</style>
