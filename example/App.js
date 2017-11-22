import React from 'react'
import ReactUeditor from '../src'

class App extends React.Component {
  constructor() {
    super()
    this.editorResult = ''
  }

  state = {
    progress: -1,
  }

  uploadImage = e => {
    return new Promise(function(resolve, reject) {
      resolve('https://avatars2.githubusercontent.com/u/3232724?v=8&s=120')
    })
  }

  uploadVideo = e => {
    let _this = this
    return new Promise(function(resolve, reject) {
      let i = 0
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
      reject(new Error('error'))
    })
  }

  updateEditorContent = content => {
    this.editorResult = content
  }

  render() {
    let {progress} = this.state

    return (
      <div>
        <ReactUeditor
          ueditorPath='../vendor/ueditor'
          config={{zIndex: 1001}}
          value='hello world'
          plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio']}
          uploadImage={this.uploadImage}
          uploadVideo={this.uploadVideo}
          uploadAudio={this.uploadAudio}
          onChange={this.updateEditorContent}
          progress={progress}
        />
      </div>
    )
  }
}

export default App
