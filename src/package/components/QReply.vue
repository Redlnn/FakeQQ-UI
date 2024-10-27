<script setup lang="ts">
import QMessageItem from './base/QMessageItem.vue'
import QReplyMessageElement from './base/QReplyMessageElement.vue'
import type qTagColor from '@pkg/lib/QTagColors'

withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: qTagColor | keyof typeof qTagColor
    isBot?: boolean
    replyTargetName: string
    replyTargetContent: string
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined,
    isBot: false
  }
)
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
          :reply-target-name="replyTargetName"
          :reply-target-content="replyTargetContent"
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
