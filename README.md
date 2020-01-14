# react-ueditor
![react-ueditor](https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eGmM9tnLMPCRifj.png)

使用 react 框架对 ueditor 进行封装和扩展

![](https://img.shields.io/npm/v/ifanrx-react-ueditor.svg) ![](https://img.shields.io/npm/dw/ifanrx-react-ueditor.svg)


### formdesign 分支修改

将[雷劈网 WEB表单设计器 - Formdesign](https://github.com/payonesmile/formdesign) 添加到此项目.
因为Formdesign没有npm仓库,所以直接添加所需文件到项目.

### 代办  ---  表单组件

- [x] 两个组件合并
- [ ] 图标集成
- [ ] 测试保存及预览
- [ ] 将react-ue修改成可引用组件
- [ ] 上传组件到gitlab
- [ ] 在项目中使用

<br>

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
