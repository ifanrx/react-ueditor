import React from 'react'
import ReactUeditor from '../src'

class MediaExample extends React.Component {
  constructor() {
    super()
    this.state = {
      progress: -1,
    }
  }

  updateEditorContent = content => {
    this.editorResult = content
  }

  uploadImage = e => {
    return new Promise(function(resolve, reject) {
      resolve(window.URL.createObjectURL(e.target.files[0]))
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
      resolve('https://cloud-minapp-1131.cloud.ifanrusercontent.com/1eEUtZNsjiOiHbWW.mp3')
    })
  }

  render() {
    let {progress} = this.state

    return (
      <ReactUeditor
        debug
        ueditorPath='../vendor/ueditor'
        plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio', 'insertLink']}
        uploadImage={this.uploadImage}
        uploadVideo={this.uploadVideo}
        uploadAudio={this.uploadAudio}
        onChange={this.updateEditorContent}
        progress={progress}
        multipleImagesUpload={false}
      />
    )
  }
}

export default MediaExample
