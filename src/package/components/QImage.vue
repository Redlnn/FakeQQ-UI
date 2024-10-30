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
    src: string
    alt?: string
    isFile?: boolean
    fileName?: string
    fileSize?: string
    maxWidth?: string
    maxHeight?: string
    canDownload?: boolean
  }>(),
  {
    self: false,
    avatar: undefined,
    tag: undefined,
    tagColor: undefined,
    isBot: false,
    alt: undefined,
    isFile: false,
    fileName: undefined,
    fileSize: undefined,
    maxWidth: '230px',
    maxHeight: '250px',
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
    <div
      class="msg-content-container mix-message__container mix-message__container--pic"
      :class="self ? 'container--self' : 'container--others'"
    >
      <a v-if="isFile && canDownload" class="file-link" :href="src" :download="fileName"></a>
      <div class="message-content mix-message__inner">
        <div
          class="image pic-element"
          :style="{ '--max-image-width': maxWidth, '--max-image-height': maxHeight }"
        >
          <img :src="src" :alt="alt" class="image-content" />
        </div>
        <div v-if="isFile" class="file-info-mask">
          <p v-if="fileName" class="qq-text-ellipsis" style="display: flex">
            <span class="qq-text-ellipsis">{{ fileName }}</span>
          </p>
          <p v-if="fileSize">{{ fileSize }}</p>
        </div>
      </div>
    </div>
  </q-message-base>
</template>

<style lang="scss" scoped>
.mix-message__container.mix-message__container--pic {
  align-items: center;
  background: transparent !important;
  max-width: var(--img-max-width);
  min-width: 0;
  overflow: hidden;
  padding: 0;
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

.mix-message__inner {
  width: 100%;
  font-size: 14px;
  line-height: 21px;
  min-height: 18px;
  overflow: hidden;
}
.pic-element {
  border-radius: 4px;
  max-width: 100%;
  overflow: hidden;
}
.image {
  height: 100%;
  width: 100%;
  line-height: 0;
  position: relative;
}
.image-content {
  height: 100%;
  image-rendering: -webkit-optimize-contrast;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: top center;
  object-position: top center;
  text-indent: 100%;
  width: 100%;
  max-width: var(--max-image-width);
  max-height: var(--max-image-height);
}
.file-info-mask {
  bottom: 0px;
  color: var(--qq-text_white);
  left: 0px;
  pointer-events: none;
  position: absolute;
  right: 0px;
  user-select: none;
  font-size: var(--qq-font_size_2);
  line-height: var(--qq-line_height_2);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  padding: 10px 10px 6px;

  p {
    margin: 0;
  }

  p:last-child {
    position: relative;
  }
}
</style>
