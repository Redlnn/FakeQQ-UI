<script setup lang="ts">
import QMessageBase from './base/QMessageBase.vue'
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
    maxImgWidth?: string
    maxImgHeight?: string
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    maxImgWidth: '230px',
    maxImgHeight: '250px'
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
      class="msg-content-container mix-message__container"
      :class="self ? 'container--self' : 'container--others'"
    >
      <div
        class="message-content mix-message__inner"
        :style="{ '--max-image-width': maxImgWidth, '--max-image-height': maxImgHeight }"
      >
        <span><slot></slot></span>
      </div>
    </div>
  </q-message-base>
</template>

<style lang="scss" scoped>
.mix-message__inner {
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  min-height: 18px;
  overflow: hidden;

  &:deep() img {
    display: block;
    border-radius: 4px;
    margin: 4px 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    line-height: 0;
    image-rendering: -webkit-optimize-contrast;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: top center;
    object-position: top center;
    max-width: var(--max-image-width);
    max-height: var(--max-image-height);
  }

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
</style>
