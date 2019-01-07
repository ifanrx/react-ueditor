### v2.1.0 (2019-01-07)
- [A] extendControls 模态框支持配置 zIndex 和垂直居中方式（top 和 middle）

### v2.0.0 (2019-01-04)
- [A] 允许对复制进来的图片进行操作
- [A] 允许通过 extendControls 属性在工具栏添加自定义功能（以弹出模态框的方式）
- [F] 修复存在多实例时，工具栏样式不更新
- [F] 修复少数情况下，ueditor 自身的报错
- [C] 完善文档和补充更多示例

### v1.7.0（2018-12-03）
- [A] 暴露 ueditor 加载完成事件 onReady

### v1.6.0（2018-12-03）
- [C] 更新到 babel 7 和 webpack 4

### v1.5.3（2018-10-30）
- [A] Resolve #16 Fix error that id is not defind when click the link icon

### v1.5.2（2018-10-19）
- [A] Resolve #16 Fix unexpected use of 'location' no-restricted-globals

### v1.5.1（2018-08-17）
- [A] 修复在 Safari 导致视频无法删除，无法将光标移动到视频后面的 bug

### v1.5.0（2018-07-27）
- [A] 支持多图片上传 multipleImagesUpload

### v1.4.2（2018-07-14）
- [C] 更新 package.json 并发布到 npm

### v1.4.1（2018-07-06）
- [F] 修复多个实例时，图片，视频，音频插入错误的问题

### v1.4.0（2018-07-05）
- [A] 添加获取 ueditor 实例接口 gerRef
- [F] 修复插入表情不触发 onChange 事件

### v1.3.0 (2017-11-20)
- [A] 针对多个编辑器实例而配置有所差异的场景，添加 config 属性
- [A] 添加用于视频和音频上传进度展示的 progress 属性
- [A] 代码添加 eslint
- [F] 修复控制台报 get property 'scrollTo' from undefined 错误

### v1.2.0 (2017-11-16)
- [M] 修改图片上传后回调插入图片的方式
- [A] 添加视频和音频的上传和插入接口

### v1.1.0 (2017-10-16)
- [A] 添加 plugins 属性用于配置所需插件
- [A] 添加 insertCode 插件，用于简单地插入代码片段