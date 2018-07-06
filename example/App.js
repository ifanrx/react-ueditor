import React from 'react'
import ReactUeditor from '../src'

class App extends React.Component {
  constructor() {
    super()
    this.editorResult = ''
    this.ueditor1 = null
    this.ueditor2 = null
    this.ueditor3 = null
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

  getUeditor1 = ref => {
    this.ueditor1 = ref
    console.log('ueditor1', ref)
  }

  getUeditor2 = ref => {
    this.ueditor2 = ref
    console.log('ueditor2', ref)
  }

  getUeditor3 = ref => {
    this.ueditor3 = ref
    console.log('ueditor3', ref)
  }

  printUeditor1Content = ref => {
    console.log(this.ueditor1.getContent())
  }

  printUeditor2Content = ref => {
    console.log(this.ueditor2.getContent())
  }

  printUeditor3Content = ref => {
    console.log(this.ueditor3.getContent())
  }

  render() {
    let {progress} = this.state

    return (
      <div>
        <ReactUeditor
          getRef={this.getUeditor1}
          ueditorPath='../vendor/ueditor'
          config={{zIndex: 1001}}
          value={Math.random().toString(36)}
          plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio']}
          uploadImage={this.uploadImage}
          uploadVideo={this.uploadVideo}
          uploadAudio={this.uploadAudio}
          onChange={this.updateEditorContent}
          progress={progress}
        />
        <button onClick={this.printUeditor1Content}>ueditor1 getContent</button>
        <ReactUeditor
          getRef={this.getUeditor2}
          ueditorPath='../vendor/ueditor'
          config={{zIndex: 1001}}
          value='multi instance'
          plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio']}
          uploadImage={this.uploadImage}
          uploadVideo={this.uploadVideo}
          uploadAudio={this.uploadAudio}
          onChange={this.updateEditorContent}
          progress={progress}
        />
        <button onClick={this.printUeditor2Content}>ueditor2 getContent</button>
        <ReactUeditor
          getRef={this.getUeditor3}
          ueditorPath='../vendor/ueditor'
          config={{zIndex: 1001}}
          value='multi instance 3'
          plugins={['uploadImage', 'insertCode', 'uploadVideo', 'uploadAudio']}
          uploadImage={this.uploadImage}
          uploadVideo={this.uploadVideo}
          uploadAudio={this.uploadAudio}
          onChange={this.updateEditorContent}
          progress={progress}
        />
        <button onClick={this.printUeditor3Content}>ueditor3 getContent</button>
      </div>
    )
  }
}

export default App
