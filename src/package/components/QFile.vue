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
    fileName: string
    fileSize?: string
    fileSrc?: string
    iconSrc?: string
    canDownload?: boolean
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    fileSize: undefined,
    fileSrc: undefined,
    iconSrc: undefined,
    canDownload: true
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
    <div class="file-message--content nocopy">
      <a v-if="fileSrc && canDownload" class="file-link" :href="fileSrc" :download="fileName"></a>
      <div class="normal-file file-element">
        <div class="file-header">
          <p class="file-name">
            <span class="qq-text-ellipsis">{{ fileName }}</span>
          </p>
          <div
            v-if="iconSrc"
            class="file-icon"
            :style="{ backgroundImage: `url(${iconSrc})` }"
          ></div>
        </div>
        <div v-if="fileSize" class="file-info">
          <span>{{ fileSize }}</span>
        </div>
      </div>
    </div>
  </q-message-base>
</template>

<style lang="scss" scoped>
.file-message--content {
  overflow: hidden;
  position: relative;
}

.file-link {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  z-index: 1;
}

.normal-file {
  background-color: var(--qq-fill_light_primary);
  border-radius: 8px;
  max-width: 100%;
  overflow: hidden;
  padding: 10px;
  position: relative;
  width: 226px;
  z-index: 0;
  transition: background-color 0.2s;

  .file-header {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .file-header .file-name {
    align-self: flex-start;
    color: var(--qq-bubble_guest_text);
    flex: 1;
    font-size: var(--qq-font_size_main_2);
    line-height: 16px;
    line-height: var(--qq-line_height_main_2);
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
  }
  .file-header .file-icon {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 4px;
    flex-shrink: 0;
    height: 40px;
    margin-left: 12px;
    overflow: hidden;
    position: relative;
    width: 40px;
  }
  .file-info {
    color: var(--qq-text-secondary-01);
    display: flex;
    font-size: var(--qq-font_size_2) !important;
    justify-content: space-between;
    line-height: 16px;
    line-height: var(--qq-line_height_2) !important;
    white-space: pre-wrap;
    transition: color 0.2s;
  }
}
</style>
