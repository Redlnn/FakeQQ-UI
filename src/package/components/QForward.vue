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
    title?: string
    contents: string[]
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    title: '群聊的聊天记录'
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
    <div class="forward-msg nocopy">
      <div class="fwd-title text-ellipsis">{{ title }}</div>
      <div v-for="(item, index) in contents" :key="index" class="fwd-content text-ellipsis">
        {{ item }}
      </div>
      <div class="count">查看{{ contents.length }}条转发消息</div>
    </div>
  </q-message-base>
</template>

<style lang="scss" scoped>
.forward-msg {
  background-color: var(--qq-bg_bottom_light);
  border-radius: 8px;
  max-width: 100%;
  padding: 10px 10px 6px;
  width: 226px;

  .fwd-title {
    color: var(--qq-text-primary);
    font-size: var(--qq-font_size_main_2);
    line-height: var(--qq-line_height_main_2);
    padding-bottom: 4px;
  }

  .fwd-content {
    margin-bottom: 3px;
  }

  .count,
  .fwd-content {
    color: var(--qq-text_secondary);
    font-size: var(--qq-font_size_2) !important;
    line-height: var(--qq-line_height_2) !important;
  }

  .count {
    border-top: 1px solid var(--qq-border_standard);
    margin-top: 10px;
    padding: 6px 0 0;
  }

  .forward-msg:hover {
    background-color: var(--nt_bg_white_2_overlay_hover_2_mix);
  }
}
</style>
