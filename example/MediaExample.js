import React from 'react'
import ReactUeditor from '../src'

const modalContainerStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, .5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const modalStyle = {
  width: 500,
  height: 400,
  background: '#fff',
  borderRadius: 5,
  padding: 20,
}

const imageContainerStyle = {
  marginTop: 20,
}

const imageStyle = {
  margin: 10,
  width: 100,
  height: 100,
}

const Modal = ({style, onSelectImage}) => {
  let handleClick = e => {
    onSelectImage(e.target.src)
  }
  return (
    <div style={{...modalContainerStyle, ...style}}>
      <div style={modalStyle}>
        <div>请选择图片：</div>
        <div style={imageContainerStyle} onClick={handleClick}>
          <img style={imageStyle} src='https://cloud-minapp-7894.cloud.ifanrusercontent.com/1hGIy5OFK4JMKqxA.png' />
          <img style={imageStyle} src='https://cloud-minapp-7894.cloud.ifanrusercontent.com/1gAVF3QpMa7cvWYz.jpg' />
        </div>
      </div>
    </div>
  )
}

let uploadImagePlugin = {
  name: 'imageUpload',
  menuText: '图片上传',
  cssRules: 'background-position: -726px -77px;',
  modal: {
    componentRender: (visible, editor, closeModal) => {
      const handleSelectImage = (url) => {
        editor.focus()
        editor.execCommand('inserthtml', '<img src="' + url + '" />')
        closeModal()
      }
      return <Modal style={{display: visible ? 'flex' : 'none'}} onSelectImage={handleSelectImage} />
    }
  }
}

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
        plugins={['insertCode', 'uploadVideo', 'uploadAudio', 'insertLink', uploadImagePlugin]}
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
