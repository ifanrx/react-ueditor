# react-ueditor
an ueditor component for react

### 贡献
如果你希望为这个项目贡献代码，需要了解以下情况：

- 执行 `npm run start` 会启动开发服务器，此时会在浏览器中展示 ReactUeditor 的真实效果

- example.js, index.html, dist/ 都只是为了展示 ReactUeditor 的真实效果，主要代码在 ReactUeditor/ 中

- 需要修改 ueditor 源码时，直接修改 ueditor 目录下的文件，修改完执行：`cd ueditor` 和 `grunt` 命令，此时会重新生成 ueditor 构建成功的文件到 vendor/ueditor
