import React from 'react'
import ReactUeditor from '../src'

let result = ""

class App extends React.Component {
  uploadImage(e) {
    console.log(e)
    ReactUeditor.insertImage('https://avatars2.githubusercontent.com/u/3232724?v=8&s=120')
  }

  uploadVideo(e) {
    console.log(e)
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
          onChange={this.updateEditorContent.bind(this)}
        />
        <input type="button" value="控制台打印内容"  onClick={() => { console.log(result) }}/>
      </div>
    )
  }
}

export default App