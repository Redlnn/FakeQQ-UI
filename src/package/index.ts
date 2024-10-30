import type { App, Plugin } from 'vue'

import QHeader from './components/QHeader.vue'
import QMain from './components/QMain.vue'
import QReply from './components/QReply.vue'
import QText from './components/QText.vue'
import QImage from './components/QImage.vue'
import QFile from './components/QFile.vue'
import QTip from './components/QTip.vue'
import QVoice from './components/QVoice.vue'
import QVoiceLegacy from './components/QVoiceLegacy.vue'
import QForward from './components/QForward.vue'
import QMessageBase from './components/base/QMessageBase.vue'

import QTagColors from './lib/QTagColors'

import './styles/base.scss'

const messageComponents = [
  QReply,
  QText,
  QImage,
  QFile,
  QTip,
  QVoice,
  QVoiceLegacy,
  QForward,
  QMessageBase
]
const extraComponents = [QHeader, QMain]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const installComponent = (app: App, component: any) => {
  if (component.__name) {
    app.component(component.__name, component)
    return
  }
  if (component.name) {
    app.component(component.name, component)
    return
  }
  if (component.__name === undefined && component.name === undefined) {
    console.error(`[Fake QQ UI] The follow component has no name.`, component)
  }
}

const FakeQQUI: Plugin<[]> = {
  install(app: App) {
    messageComponents.forEach(component => installComponent(app, component))
    extraComponents.forEach(component => installComponent(app, component))
  }
}

export { FakeQQUI }
export { QReply, QText, QImage, QFile, QTip, QVoice, QHeader, QMain, QTagColors }
