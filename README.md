# react-ueditor
![react-ueditor](https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eGmM9tnLMPCRifj.png)

使用 react 框架对 ueditor 进行封装和扩展

![](https://img.shields.io/npm/v/ifanrx-react-ueditor.svg) ![](https://img.shields.io/npm/dw/ifanrx-react-ueditor.svg)


### ✨ 特性

- 支持更灵活的图片和音视频资源上传
- 支持同个页面存在多个编辑器实例
- 支持对复制进来的图片进行操作
- 允许扩展工具栏，支持在扩展中使用已有的 react 组件



### 📦 下载

```
# 使用 npm 安装
npm install ifanrx-react-ueditor --save

# 使用 yarn 安装
yarn add ifanrx-react-ueditor
```


### 🔨 使用

```js
import ReactUeditor from 'ifanrx-react-ueditor'

<ReactUeditor
  ueditorPath={`${window.YOUR_PATH}/ueditor`}"
/>
```

更多功能请移步到 react-ueditor 的 [wiki 页面](https://github.com/ifanrx/react-ueditor/wiki)

## 🤝 贡献

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" >
        <a href="https://github.com/yaokailun">
          <img src="https://avatars2.githubusercontent.com/u/11460856" width="75px" height="75px"><br/>
          <sub>kailunyao</sub>
        </a>
      </td>
      <td align="center" valign="top" >
        <a href="https://github.com/larry011">
          <img src="https://avatars1.githubusercontent.com/u/10259971" width="75px" height="75px"><br/>
          <sub>larry011</sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

如果你希望为这个项目贡献代码，需要了解以下情况：

- 在根目录下执行 `yarn start` 会启动开发服务器，此时会在浏览器中展示 ReactUeditor 的真实效果，在 ReactUeditor/ 下的修改都会进行热更新

- example.js, index.html, dist/ 都只是为了展示 ReactUeditor 的真实效果，主要代码在 ReactUeditor/ 中

- 需要修改 ueditor 源码时，直接修改 ueditor 目录下的文件，修改完执行：`cd ueditor` 和 `yarn grunt` 命令，此时会重新生成 ueditor 构建成功的文件到 vendor/ueditor
