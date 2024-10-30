<script setup lang="ts">
withDefaults(
  defineProps<{
    self?: boolean
    target: string
    replyText?: string
    replyImageUrl?: string
    replyImageAlt?: string
    maxImgWidth?: string
    maxImgHeight?: string
  }>(),
  {
    self: false,
    replyText: '',
    replyImageUrl: undefined,
    replyImageAlt: undefined,
    maxImgWidth: '200px',
    maxImgHeight: '220px'
  }
)
</script>

<template>
  <div class="reply-element nocopy" :class="self ? ['reply-element--self'] : ''">
    <div class="reply-title">
      <div class="reply-info">
        <span class="qq-text-ellipsis">{{ target }}</span>
      </div>
    </div>
    <div class="reply-content">
      <div v-if="replyImageUrl" class="pic">
        <div class="image nocopy">
          <img
            class="image-content"
            :style="{ '--max-image-width': maxImgWidth, '--max-image-height': maxImgHeight }"
            :alt="replyImageAlt"
            :src="replyImageUrl"
          />
        </div>
      </div>
      <span v-else class="mixed-container qq-text-ellipsis">{{ replyText }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reply-element {
  border-left: 2px solid var(--qq-icon_tertiary);
  border-radius: 2px;
  color: var(--qq-text_primary_light);
  margin-bottom: 10px;
  padding: 4px 10px;
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    background-color: var(--qq-overlay_hover);
  }

  .reply-title {
    align-items: center;
    display: flex;
    font-size: var(--qq-font_size_main_1);
    justify-content: space-between;
    line-height: var(--qq-line_height_main_1);
    margin-bottom: 4px;
    overflow: hidden;

    .reply-info {
      display: flex;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .reply-content {
    font-size: var(--qq-font_size_main_1);
    line-height: var(--qq-line_height_main_1);
  }
  .mixed-container {
    display: block;
    min-height: 24px;
  }

  .pic {
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    .image {
      width: 100%;
      height: 100%;
      line-height: 0;
      position: relative;

      .image-content {
        height: 100%;
        image-rendering: -webkit-optimize-contrast;
        object-fit: cover;
        object-position: center top;
        text-indent: 100%;
        width: 100%;
        max-width: var(--max-image-width);
        max-height: var(--max-image-height);
      }
    }
  }
  // .qqface {
  //   height: 24px;
  //   vertical-align: bottom;
  //   width: 24px;
  // }
  // .file {
  //   align-items: center;
  //   display: flex;
  //   overflow: hidden;
  // }
  // .file .file-icon {
  //   background-position: 50%;
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   border-radius: 4px;
  //   display: block;
  //   flex-shrink: 0;
  //   height: 16px;
  //   margin-right: 5px;
  //   width: 16px;
  // }
}
.reply-element--self {
  border-left: 2px solid var(--qq-overlay_hover_brand);
  color: var(--on_brand_primary);
  transition:
    color 0.2s,
    border-color 0.2s;
}
</style>
