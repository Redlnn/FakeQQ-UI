<script setup lang="ts">
import QMessageBase from './base/QMessageBase.vue'
import QReplyMessageElement from './base/QReplyBase.vue'
import type QTagColors from '@pkg/lib/QTagColors'
import type QTagCustomize from '@pkg/lib/QTagCustomize'

withDefaults(
  defineProps<{
    self?: boolean
    name: string
    avatar?: string
    tag?: string
    tagColor?: QTagColors | keyof typeof QTagColors | QTagCustomize
    isBot?: boolean
    target: string
    replyText?: string
    replyImageUrl?: string
    replyImageAlt?: string
    maxImgWidth?: string
    maxImgHeight?: string
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    replyText: '',
    replyImageUrl: undefined,
    replyImageAlt: undefined,
    maxImgWidth: '200px',
    maxImgHeight: '220px'
  }
)
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
      class="msg-content-container reply-message__container"
      :class="self ? 'container--self' : 'container--others'"
    >
      <div class="message-content reply-message__inner">
        <q-reply-message-element
          :self="self"
          :target="target"
          :reply-text="replyText"
          :reply-image-url="replyImageUrl"
          :reply-image-alt="replyImageAlt"
          :max-img-width="maxImgWidth"
          :max-img-height="maxImgHeight"
        />
        <span><slot></slot></span>
      </div>
    </div>
  </q-message-base>
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
