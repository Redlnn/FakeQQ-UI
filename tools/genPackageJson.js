import fs from 'fs'
import { fileURLToPath, URL } from 'node:url'

// 原始 package.json 路径
const originalPath = fileURLToPath(new URL('../package.json', import.meta.url))
// 目标路径，修改后的文件会保存到这里
const targetPath = fileURLToPath(new URL('../dist/package.json', import.meta.url))

// 读取 package.json 文件
fs.readFile(originalPath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取 package.json 文件失败:', err)
    return
  }

  try {
    // 解析 JSON 数据
    const packageData = JSON.parse(data)

    delete packageData.private
    delete packageData.publishConfig
    delete packageData.scripts
    delete packageData.devDependencies
    delete packageData.packageManager

    packageData.main = './fake-qq-ui.cjs'
    packageData.module = './fake-qq-ui.js'
    packageData.types = './index.d.ts'

    fs.writeFile(targetPath, JSON.stringify(packageData, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('写入修改后的 package.json 失败:', writeErr)
      } else {
        console.log('成功保存修改后的 package.json 到目标位置:', targetPath)
      }
    })
  } catch (parseErr) {
    console.error('解析 package.json 失败:', parseErr)
  }
})
