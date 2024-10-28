<script setup lang="ts">
import QMessageItem from './base/QMessageItem.vue'
import type QTagColors from '@pkg/lib/QTagColors'

withDefaults(
  defineProps<{
    self?: boolean
    userName: string
    avatarUrl?: string
    tagContent?: string
    tagColor?: QTagColors | keyof typeof QTagColors
    isBot?: boolean
    title?: string
    content: string[]
  }>(),
  {
    self: false,
    avatarUrl: '',
    tagContent: undefined,
    tagColor: undefined,
    isBot: false,
    title: '群聊的聊天记录'
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
    <div class="forward-msg nocopy">
      <div class="fwd-title text-ellipsis">群聊的聊天记录</div>
      <div class="fwd-content text-ellipsis">洛狼狼の波斯猫: [图片]</div>
      <div class="count">查看{{ content.length }}条转发消息</div>
    </div>
  </q-message-item>
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
