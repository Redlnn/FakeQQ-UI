<script setup lang="ts">
import './assets/reset.css'
import './package/styles/light.scss'
import './package/styles/dark.scss'

import { useDark, useToggle } from '@vueuse/core'

import { QTagColors } from './package'

import QHeader from './package/components/QHeader.vue'
import QMain from './package/components/QMain.vue'
import QReply from './package/components/QReply.vue'
import QText from './package/components/QText.vue'
import QImage from './package/components/QImage.vue'
import QFile from './package/components/QFile.vue'
import QTip from './package/components/QTip.vue'
import QVoice from './package/components/QVoice.vue'

const isDark = useDark({ disableTransition: false })
const toggleDark = useToggle(isDark)
</script>

<template>
  <section class="qq">
    <q-header @click="toggleDark()">FakeQQ</q-header>
    <q-main>
      <q-tip is-time>20:12</q-tip>
      <q-reply
        self
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        target="方糖"
        tag="123"
        :tag-color="{ backgroundColor: '#000', color: '#fff' }"
        reply-text="怎么这个支持笔但不支持触屏"
      >
        @方糖 yes
        <a>example.com</a>
      </q-reply>
      <q-reply
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        tag-color="sage_green"
        target="方糖"
        reply-image-url="/85467403_p0.jpg"
      >
        <a at>@方糖</a> yes
      </q-reply>
      <q-text name="我是机器人" tag="LV96 ln" tag-color="red" is-bot> 123<br />asddasd </q-text>
      <q-tip>你撤回了一条消息</q-tip>
      <q-image
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        :tag-color="QTagColors.orange"
        src="/85467403_p0.jpg"
      >
      </q-image>
      <q-tip><a>A60</a> 撤回了一条消息</q-tip>
      <q-text
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        tag-color="purple"
      >
        <a at>@A60</a> 123
        <img src="/85467403_p0.jpg" />
        546<br />
        <a>我是一个链接</a>
      </q-text>
      <q-image
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        tag-color="blue"
        src="/85467403_p0.jpg"
        is-file
        file-name="85467403_p0.jpg"
        file-size="1.2MB"
        max-width="150px"
      >
      </q-image>
      <q-file
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        file-name="example.json"
        file-size="1.2MB"
        icon-src="/code.png"
        file-src="/code.png"
      ></q-file>
      <q-voice
        self
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        tag-color="purple"
        src="/太好听了8.m4a"
        text="太好听了8（震声）！！！"
      ></q-voice>
      <q-voice
        name="[AntiFurry] 么叽"
        avatar="http://q1.qlogo.cn/g?b=qq&nk=2595201156&s=640"
        tag="LV96 ln"
        tag-color="purple"
        src="/欧尼酱快起床.m4a"
      ></q-voice>
      <q-forward name="[AntiFurry] 么叽" :contents="['test']"></q-forward>
    </q-main>
  </section>
</template>

<style lang="scss" scoped>
.qq {
  width: 100%;
  background-color: var(--qq-background-03);
  border-radius: 10px;
  transition: background-color 0.2s;
}
</style>
