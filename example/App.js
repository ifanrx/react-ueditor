import React from 'react'
import ReactUeditor from '../src'

let editorResult = ''

class App extends React.Component {
  state = {
    progress: -1
  }

  uploadImage = e => {
    return new Promise(function(resolve, reject) {
      resolve('https://avatars2.githubusercontent.com/u/3232724?v=8&s=120')
    })
  }

  uploadVideo = e => {
    let _this = this
    return new Promise(function(resolve, reject) {
      let  i = 0
      let instance = setInterval(() => {
        if (i !== 100) {
          _this.setState({progress: ++i})
        }
      }, 50)
      setTimeout(() => {
        resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eBb1SeNlayvGEKT.mp4')
        _this.setState({progress: -1})
        clearInterval(instance)
      }, 5100)
    })
  }

  uploadAudio = e => {
    return new Promise(function(resolve, reject) {
      // resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eEUtZNsjiOiHbWW.mp3')
      reject('error')
    })
  }

  updateEditorContent = content => {
    editorResult = content
  }

  render() {
    let {progress} = this.state

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
          progress={progress}
        />
      </div>
    )
  }
}

export default App