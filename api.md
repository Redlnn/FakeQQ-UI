# API 参考

> 下文中属性默认值为 undefined 或其他内容代表该属性可选

## QTagColor

QTagColor 是一个 enum，用于消息中名字后面的`管理员`、`群头像`等 tag
中，原型位于 `lib/QTagColors.d.ts` 中，你可以使用
`import { QTagColors } from 'fake-qq-ui' 来导入，其包含以下几种颜色：

- `sage_green`：鼠尾草绿
- `red`：红色
- `orange`：橙色，用于群主
- `purple`：紫色，用于自定义头衔
- `blue`：蓝色，用于管理员
- `grey`：灰色，用于群等级

## QHeader

一个仿 macOS 的标题栏。

### QHeader 插槽

| 插槽名  | 说明 |
| ------- | ---- |
| default | 标题 |

## QMain

一个带有基础样式的容器，用于容纳消息组件（非必须）。

### QMain 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 内部包裹消息组件 |

## QText

纯文本消息、图文消息。

### QText 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 图文内容 |

- 换行请使用 `<br />`
- 图片请使用 `<img />`
- 链接请使用 `<a>link<a/>`
- @ 请使用 `<a at>@user</a>`

### QText 属性

| 属性         | 说明                                         | 类型      | 默认值          |
| ------------ | -------------------------------------------- | --------- | --------------- |
| self         | 是否是浏览者视角发送（即消息是否在右边）     | `boolean` | false           |
| isBot        | 是否为机器人消息                             | `boolean` | false           |
| userName     | 用户名                                       | `string`  | -               |
| avatarUrl    | 头像来源地址                                 | `string`  | ''              |
| tagContent   | 群头衔内容，留空则表示没有头衔               | `string`  | undefined       |
| tagColor     | 群头像颜色，留空即为灰色                     | `enum`    | QTagColors.grey |
| maxImgWidth  | 图文消息中图片的最大宽度（防止过大影响观感） | `string`  | 230px           |
| maxImgHeight | 图文消息中图片的最大高度（防止过大影响观感） | `string`  | 250px           |

## QImage

图片消息、图片文件。

### QImage 属性

| 属性        | 说明                                                           | 类型      | 默认值          |
| ----------- | -------------------------------------------------------------- | --------- | --------------- |
| self        | 是否是浏览者视角发送（即消息是否在右边）                       | `boolean` | false           |
| isBot       | 是否为机器人消息                                               | `boolean` | false           |
| userName    | 用户名                                                         | `string`  | -               |
| avatarUrl   | 头像来源地址                                                   | `string`  | ''              |
| tagContent  | 群头衔内容，留空则表示没有头衔                                 | `string`  | undefined       |
| tagColor    | 群头像颜色，留空即为灰色                                       | `enum`    | QTagColors.grey |
| imageUrl    | 图片来源地址                                                   | `string`  | -               |
| isFile      | 是否是文件形式的图片                                           | `boolean` | false           |
| fileName    | 图片文件名（当且仅当 `isFile` 为 true 时起作用）               | string    | undefined       |
| fileSize    | 图片文件大小（当且仅当 `isFile` 为 true 时起作用）             | string    | undefined       |
| canDownload | 用户点击时是否下载该图片（当且仅当 `isFile` 为 true 时起作用） | `boolean` | true            |
| maxWidth    | 图文图片的最大宽度（防止过大影响观感）                         | `string`  | 230px           |
| maxHeight   | 图文图片的最大高度（防止过大影响观感）                         | `string`  | 250px           |

## QFile

文件消息。

### QFile 属性

| 属性        | 说明                                     | 类型      | 默认值          |
| ----------- | ---------------------------------------- | --------- | --------------- |
| self        | 是否是浏览者视角发送（即消息是否在右边） | `boolean` | false           |
| isBot       | 是否为机器人消息                         | `boolean` | false           |
| userName    | 用户名                                   | `string`  | -               |
| avatarUrl   | 头像来源地址                             | `string`  | ''              |
| tagContent  | 群头衔内容，留空则表示没有头衔           | `string`  | undefined       |
| tagColor    | 群头像颜色，留空即为灰色                 | `enum`    | QTagColors.grey |
| fileName    | 文件名                                   | string    | undefined       |
| fileSize    | 文件大小                                 | string    | undefined       |
| fileUrl     | 文件链接                                 | `string`  | -               |
| fileIconUrl | 文件图标来源地址                         | `string`  | -               |
| canDownload | 用户点击时是否下载该文件                 | `boolean` | true            |

## QTip

提示文本。  
（如戳一戳、撤回提示、时间等）

### QTip 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 文字内容 |

- 链接、@ 请使用 `<a>content</a>`

### QTip 属性

| 属性   | 说明                                                | 类型      | 默认值 |
| ------ | --------------------------------------------------- | --------- | ------ |
| isTime | 暂时内容是否是时间（当设为 true 时 CSS 有略微区别） | `boolean` | false  |

## QReply

引用（回复）消息。

### QReply 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 图文内容 |

> 与 QText 组件用法一致

### QReply 属性

| 属性          | 说明                                       | 类型      | 默认值          |
| ------------- | ------------------------------------------ | --------- | --------------- | --- |
| self          | 是否是浏览者视角发送（即消息是否在右边）   | `boolean` | false           |
| isBot         | 是否为机器人消息                           | `boolean` | false           |
| userName      | 用户名                                     | `string`  | -               |
| avatarUrl     | 头像来源地址                               | `string`  | ''              |
| tagContent    | 群头衔内容，留空则表示没有头衔             | `string`  | undefined       |
| tagColor      | 群头像颜色，留空即为灰色                   | `enum`    | QTagColors.grey |
| targetName    | 被回复用户的昵称                           | `string`  | -               |
| replyText     | 被回复的文字                               | `string`  | ''              |
| replyImageUrl | 被回复的图片来源地址（有图片时不显示文字） | `string`  | undefined       |     |
| replyImageAlt | 被回复的图片描述                           | `string`  | undefined       |
| maxImgWidth   | 被回复的图片的最大宽度                     | `string`  | '200px'         |
| maxImgHeight  | 被回复的图片的最大高度                     | `string`  | '220px'         |

## QVoice

语音消息。

### QVoice 属性

| 属性       | 说明                                     | 类型      | 默认值                 |
| ---------- | ---------------------------------------- | --------- | ---------------------- |
| self       | 是否是浏览者视角发送（即消息是否在右边） | `boolean` | false                  |
| isBot      | 是否为机器人消息                         | `boolean` | false                  |
| userName   | 用户名                                   | `string`  | -                      |
| avatarUrl  | 头像来源地址                             | `string`  | ''                     |
| tagContent | 群头衔内容，留空则表示没有头衔           | `string`  | undefined              |
| tagColor   | 群头像颜色，留空即为灰色                 | `enum`    | QTagColors.grey        |
| audioSrc   | 语音文件 URL                             | `string`  | -                      |
| text       | 语音转文字结果                           | `string`  | `[呃，什么都没有听到]` |

## QForward

合并转发消息。

### QForward 属性

| 属性       | 说明                                     | 类型       | 默认值           |
| ---------- | ---------------------------------------- | ---------- | ---------------- |
| self       | 是否是浏览者视角发送（即消息是否在右边） | `boolean`  | false            |
| isBot      | 是否为机器人消息                         | `boolean`  | false            |
| userName   | 用户名                                   | `string`   | -                |
| avatarUrl  | 头像来源地址                             | `string`   | ''               |
| tagContent | 群头衔内容，留空则表示没有头衔           | `string`   | undefined        |
| tagColor   | 群头像颜色，留空即为灰色                 | `enum`     | QTagColors.grey  |
| title      | 合并转发标题                             | `string`   | `群聊的聊天记录` |
| contents   | 合并转发内容                             | `string[]` | -                |
