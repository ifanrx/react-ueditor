# react-ueditor
an ueditor component for react

### 下载
```
  npm i git://git@github.com:ifanrx/react-ueditor.git -S
```

### 使用
#### 下载 Ueditor 编辑器
到 ueditor [官网地址](http://ueditor.baidu.com/website/download.html) 下载最新版本的 ueditor, 我们选用的是`1.4.3.3 PHP 版本`，将下载解压后的文件夹放入项目中。

这里推荐直接使用该项目 `vendor` 目录下的 ueditor，ueditor 并未对单页面应用的提供很好的支持，`vendor` 目录下的 ueditor 是经过我们修改过的版本。

#### 使用组件
```
import ReactUeditor from 'react-ueditor'

<ReactUeditor
  value="Hello World!"
  ueditorPath="/static/uf8-php"
  plugins={['uploadImage', 'insertCode']}
  onChange={this.updateEditorContent.bind(this)}
  uploadImage={this.uploadImage.bind(this)}
/>
```

Property | Description | Type | Default
-------- | ----------- | ---- | -------
value | 初始化值 | string | no
ueditorPath | ueditor 构建后的文件路径 | string | yes
plugins | 需要使用的插件 | array | no
onChange | 编辑器内容改变的回调 | func | no
uploadImage | 图片上传回调 | func | no
uploadVideo | 视频上传回调 | func | no
uploadAudio | 音频上传回调 | func | no

plugins 现支持：
- 图片上传 uploadImage
- 视频上传 uploadVideo
- 音频上传 uploadAudio
- 插入代码 insertCode

#### 获取实时更新数据
通过 onChange 可获取实时更新的数据，其返回 string 类型

```
updateEditorContent = (content) => {
  // 此处勿通过 setState 更新 value，若用于提交表单场景，可将 content 赋值于一常量，在提交时从常量中获取最后结果即可，如：
  // result = content
}
```

#### 图片上传
ueditor 的图片上传功能与后端耦合性很大，在前后端分离大行其道的今天，并不是很适合，因此我们新增了图片上传的回调的接口。

```
<ReactUeditor
  ...
  uploadImage={this.uploadImage.bind(this)}
/>

// uploadImage 必须返回一个 promise
uploadImage(e) {
  return new Promise(function(resolve, reject) {
    let file = e.target.files[0]

    // 在这里将你的图片上传到服务器，在上传成功的回调中执行
    resolve(imgUrl)
  })
}
```
视频上传和音频上传与图片上传的方法一致

### 贡献
如果你希望为这个项目贡献代码，需要了解以下情况：

- 执行 `npm run start` 会启动开发服务器，此时会在浏览器中展示 ReactUeditor 的真实效果

- example.js, index.html, dist/ 都只是为了展示 ReactUeditor 的真实效果，主要代码在 ReactUeditor/ 中

- 需要修改 ueditor 源码时，直接修改 ueditor 目录下的文件，修改完执行：`cd ueditor` 和 `grunt` 命令，此时会重新生成 ueditor 构建成功的文件到 vendor/ueditor