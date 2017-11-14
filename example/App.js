import React from 'react'
import ReactUeditor from '../src'

let result = ""

class App extends React.Component {
  uploadImage(e) {
    return new Promise(function(resolve, reject) {
      resolve('https://avatars2.githubusercontent.com/u/3232724?v=8&s=120')
    })
  }

  uploadVideo(e) {
    return new Promise(function(resolve, reject) {
      resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eBb1SeNlayvGEKT.mp4')
    })
  }

  uploadAudio(e) {
    return new Promise(function(resolve, reject) {
      resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eEUtZNsjiOiHbWW.mp3')
    })
  }

  updateEditorContent(content) {
    result = content
  }

  render() {
    return (
      <div>
        <ReactUeditor
          ueditorPath="../vendor/ueditor"
          value="hello world"
          plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio']}
          uploadImage={this.uploadImage.bind(this)}
          uploadVideo={this.uploadVideo.bind(this)}
          uploadAudio={this.uploadAudio.bind(this)}
          onChange={this.updateEditorContent.bind(this)}
        />
        <input type="button" value="控制台打印内容"  onClick={() => { console.log(result) }}/>
      </div>
    )
  }
}

export default App