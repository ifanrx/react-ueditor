import PropTypes from 'prop-types'
import React from 'react'
import UploadModal from './UploadModal'

const simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy' +
  '23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNi' +
  'TAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxU' +
  'QKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/Uewdg' +
  'Ku4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6a' +
  'wOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hO' +
  'ojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj' +
  '3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg=='
const uploadAudio = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBUlEQVRYR+1VwXHbMBC8' +
  'qyBxBXI6cCqwUkEOFUSuIHYFliuwUoGVCrAdWOlA6UCuIOpgPashNRQIOtJkHH2ID2eIA25vD7vndublZ85vI4CRgZGBkxmIiI9mdm9mMzNb' +
  'AHgYknJEzM3sA4C7oZiTAEREmNmTuwvEi5lNSH4GsK4liIiFu38nuQRwU4s5CkBTtRILwAvJWzPbuvszyS8AVhFxZWbXAH50E0XE0t2/kbwB' +
  'sCxBVAFExKW7TxRMUhfPVTVJXT4HsI2IaQHg1t0fFQNAAPcrpbQhqVZc/BWAaHb3XASq6pkqbf+XAPQ/pQQz+9qy0omdufsTyQRAMfvVYyCl' +
  'pCSXLc1N5FpVF9QeMKA9tcrd/5D8CUCPdLc6/3vsDAGwnPP0rUFVY6BhYUVyAuBT0QYVsC7vfQ8AuzbknA/ubpjtFfYeANTCq5yzpNp9iJLq' +
  '9n8wIKpXOWdJtguA5dvQZpUB9dDdd1pXEMnfRz5CyfW+1HyrrJoX9ADUZEhyY2YykkEZds79KmnuyPOiLGTIiNQ/GZCWTGkhTyep78OAEck/' +
  'Zo1f7CXbUUtPgtUW1KTX6Fg2KpPR5fL1AyseONfODhnZtKz+aAAdQ1GVYkFDaOPuMqzBYdRITxZeTX4ygNbVmtkgujWONXKrqxliVqu8PXDU' +
  'NHzLEf91bwQwMjAycHYGXgGLbI8w70amwwAAAABJRU5ErkJggg=='

class ReactUeditor extends React.Component {
  constructor() {
    super()
    this.content = ''  // 存储编辑器的实时数据，用于传递给父组件
    this.ueditor = null
    this.isContentChangedByWillReceiveProps = false
    this.tempfileInput = null
    this.containerID = 'reactueditor' + (new Date()).getTime()
    this.fileInputID = 'fileinput' + (new Date()).getTime()
  }

  state = {
    videoModalVisible: false,
    audioModalVisible: false,
    videoSource: '',
    audioSource: '',
  }

  static propTypes = {
    value: PropTypes.string,
    ueditorPath: PropTypes.string.isRequired,
    plugins: PropTypes.array,
    onChange: PropTypes.func,
    uploadImage: PropTypes.func,
  }

  componentDidMount() {
    let {ueditorPath} = this.props

    this.createScript(ueditorPath + '/ueditor.config.js').then(() => {
      this.createScript(ueditorPath + '/ueditor.all.min.js').then(() => {
        this.tempfileInput = document.getElementById(this.fileInputID)
        this.initEditor()
      })
    })
  }

  /**
   * 这里存在两种情况会改变编辑器的内容：
   * 1. 父组件初始化传递的 value。父组件 value 的获取是异步的，因此会触发一次 componentWillReceiveProps，这种情况不需要将更新再通知父组件
   * 2. 用户对编辑器进行编辑
   */
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && this.props.value !== nextProps.value) {
      this.isContentChangedByWillReceiveProps = true
      this.content = nextProps.value

      if (this.ueditor) {
        this.ueditor.ready(() => {
          this.ueditor.setContent(nextProps.value)
        })
      }
    }
  }

  componentWillUnmount() {
    if (this.ueditor) {
      this.ueditor.destroy()
    }
  }

  createScript = url => {
    let scriptTags = window.document.querySelectorAll('script')
    let len = scriptTags.length
    let i = 0
    let _url = location.origin + url
    return new Promise((resolve, reject) => {
      for (i = 0; i < len; i++) {
        var src = scriptTags[i].src
        if (src && src === _url) {
          scriptTags[i].parentElement.removeChild(scriptTags[i])
        }
      }

      let node = document.createElement('script')
      node.src = url
      node.onload = resolve
      document.body.appendChild(node)
    })
  }

  // uditor 自定义按钮的方式
  registerImageUpload = () => {
    window.UE.registerUI('imageUpload', (editor, uiName) => {
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: '文件上传',
        cssRules: 'background-position: -726px -77px;',
        onclick: () => {
          this.tempfileInput.click()
        },
      })

      return btn
    })
  }

  registerSimpleInsertCode = () => {
    window.UE.registerUI('simpleInsertCode', (editor, uiName) => {
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: '插入代码',
        cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
        onclick: () => {
          if (this.ueditor) {
            this.ueditor.focus()
            this.ueditor.execCommand('insertcode')
          }
        },
      })

      return btn
    })
  }

  registerUploadVideo = () => {
    let _this = this
    window.UE.registerUI('videoUpload', (editor, uiName) => {
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: '上传视频',
        cssRules: 'background-position: -320px -20px;',
        onclick: () => {
          _this.setState({videoModalVisible: true})
        },
      })

      return btn
    })
  }

  registerUploadAudio = () => {
    let _this = this
    window.UE.registerUI('audioUpload', (editor, uiName) => {
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: '上传音频',
        cssRules: 'background: url(' + uploadAudio + ') !important; background-size: 20px 20px !important;',
        onclick: () => {
          _this.setState({audioModalVisible: true})
        },
      })

      return btn
    })
  }

  uploadImage = e => {
    let {uploadImage} = this.props
    if (uploadImage) {
      let promise = uploadImage(e)
      if (!!promise && typeof promise.then == 'function') {
        promise.then(imageUrl => {
          this.insertImage2(imageUrl)
        })
      }
    }
    this.tempfileInput.value = ''
  }

  static insertImage(imageUrl) {
    if (this.ueditor) {
      this.ueditor.focus()
      this.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />')
    }
    console.warn('该接口即将废弃，请使用返回 promise 方式')
  }

  insertImage2 = imageUrl => {
    if (this.ueditor) {
      this.ueditor.focus()
      this.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />')
    }
  }

  insert = html => {
    if (this.ueditor) {
      this.ueditor.execCommand('insertparagraph')
      this.ueditor.execCommand('inserthtml', html, true)
      this.ueditor.execCommand('insertparagraph')
      this.ueditor.execCommand('insertparagraph')
    }
  }

  closeModal = type => {
    switch (type) {
    case 'video':
      this.setState({videoModalVisible: false})
      break
    case 'audio':
      this.setState({audioModalVisible: false})
      break
    }
  }

  initEditor = () => {
    const {config, plugins, onChange, value} = this.props
    this.ueditor = config ? window.UE.getEditor(this.containerID, config) : window.UE.getEditor(this.containerID)

    if (plugins && plugins instanceof Array && plugins.length > 0) {
      if (plugins.indexOf('uploadImage') !== -1) this.registerImageUpload()
      if (plugins.indexOf('insertCode') !== -1) this.registerSimpleInsertCode()
      if (plugins.indexOf('uploadVideo') !== -1) this.registerUploadVideo()
      if (plugins.indexOf('uploadAudio') !== -1) this.registerUploadAudio()
    }

    this.ueditor.ready(() => {
      this.ueditor.addListener('contentChange', () => {
        // 由 componentWillReceiveProps 导致的 contentChange 不需要通知父组件
        if (this.isContentChangedByWillReceiveProps) {
          this.isContentChangedByWillReceiveProps = false
        } else {
          this.content = this.ueditor.getContent()

          if (onChange) {
            onChange(this.ueditor.getContent())
          }
        }
      })

      if (this.isContentChangedByWillReceiveProps) {
        this.isContentChangedByWillReceiveProps = false
        this.ueditor.setContent(this.content)
      } else {
        this.ueditor.setContent(value)
      }
    })
  }

  render() {
    let {videoModalVisible, audioModalVisible} = this.state
    let {uploadVideo, uploadAudio, progress} = this.props
    return (
      <div>
        <script id={this.containerID} name={this.containerID} type='text/plain' />
        <input type='file' id={this.fileInputID} onChange={this.uploadImage} style={{visibility: 'hidden'}} />
        <UploadModal
          type='video'
          title='上传视频'
          visible={videoModalVisible}
          closeModal={() => { this.closeModal('video') }}
          insert={this.insert}
          upload={uploadVideo}
          progress={progress} />
        <UploadModal
          type='audio'
          title='上传音频'
          visible={audioModalVisible}
          closeModal={() => { this.closeModal('audio') }}
          insert={this.insert}
          upload={uploadAudio}
          progress={progress} />
      </div>
    )
  }
}

export default ReactUeditor
