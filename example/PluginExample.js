import React from 'react'
import ReactUeditor from '../src/js'

const simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy' +
  '23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNi' +
  'TAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxU' +
  'QKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/Uewdg' +
  'Ku4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6a' +
  'wOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hO' +
  'ojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj' +
  '3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg=='

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

// 新插件写法
let uploadImagePlugin = function(ueditor) {
  return {
    menuText: '图片上传',
    cssRules: 'background-position: -726px -77px;',
    onIconClick: function() { console.log('imageUpload icon click') },
    render: (visible, closeModal) => {
      const handleSelectImage = url => {
        ueditor.focus()
        ueditor.execCommand('inserthtml', '<img src="' + url + '" />')
        closeModal()
      }
      return <Modal style={{display: visible ? 'flex' : 'none'}} onSelectImage={handleSelectImage} />
    },
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

  getRef = ueditor => {
    this.ueditor = ueditor
  }

  render() {
    let {progress} = this.state

    // 旧插件写法
    let extendControls = [{
      name: 'insertOthers',
      menuText: '超链接-外部',
      title: '超链接-外部',
      cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
      component: <div>test</div>,
      onConfirm: () => {
        this.ueditor && this.ueditor.execCommand('inserthtml', '<a>test</a>', true)
      },
    }]

    return (
      <ReactUeditor
        debug
        getRef={this.getRef}
        extendControls={extendControls}
        ueditorPath='../vendor/ueditor'
        plugins={[
          'insertCode',
          'uploadImage',
          'uploadVideo',
          'uploadAudio',
          'insertLink',
          uploadImagePlugin,
        ]}
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
