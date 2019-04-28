import Link from './Link'
import Modal from './Modal'
import PropTypes from 'prop-types'
import React from 'react'
import VideoUploader from './VideoUploader'
import AudioUploader from './AudioUploader'
import * as utils from './utils'

const MODE = {
  INTERNAL_MODAL: 'internal-modal',
  MODAL: 'modal',
  NORMAL: 'normal',
}

function isModalMode(mode) {
  return mode === MODE.INTERNAL_MODAL || mode === MODE.MODAL
}

const simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy' +
  '23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNi' +
  'TAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxU' +
  'QKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/Uewdg' +
  'Ku4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6a' +
  'wOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hO' +
  'ojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj' +
  '3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg=='
const uploadAudioIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBUlEQVRYR+1VwXHbMBC8' +
  'qyBxBXI6cCqwUkEOFUSuIHYFliuwUoGVCrAdWOlA6UCuIOpgPashNRQIOtJkHH2ID2eIA25vD7vndublZ85vI4CRgZGBkxmIiI9mdm9mMzNb' +
  'AHgYknJEzM3sA4C7oZiTAEREmNmTuwvEi5lNSH4GsK4liIiFu38nuQRwU4s5CkBTtRILwAvJWzPbuvszyS8AVhFxZWbXAH50E0XE0t2/kbwB' +
  'sCxBVAFExKW7TxRMUhfPVTVJXT4HsI2IaQHg1t0fFQNAAPcrpbQhqVZc/BWAaHb3XASq6pkqbf+XAPQ/pQQz+9qy0omdufsTyQRAMfvVYyCl' +
  'pCSXLc1N5FpVF9QeMKA9tcrd/5D8CUCPdLc6/3vsDAGwnPP0rUFVY6BhYUVyAuBT0QYVsC7vfQ8AuzbknA/ubpjtFfYeANTCq5yzpNp9iJLq' +
  '9n8wIKpXOWdJtguA5dvQZpUB9dDdd1pXEMnfRz5CyfW+1HyrrJoX9ADUZEhyY2YykkEZds79KmnuyPOiLGTIiNQ/GZCWTGkhTyep78OAEck/' +
  'Zo1f7CXbUUtPgtUW1KTX6Fg2KpPR5fL1AyseONfODhnZtKz+aAAdQ1GVYkFDaOPuMqzBYdRITxZeTX4ygNbVmtkgujWONXKrqxliVqu8PXDU' +
  'NHzLEf91bwQwMjAycHYGXgGLbI8w70amwwAAAABJRU5ErkJggg=='

class ReactUeditor extends React.Component {
  constructor(props) {
    super(props)
    this.content = props.value || '' // 存储编辑器的实时数据，用于传递给父组件
    this.ueditor = null
    this.isContentChangedByWillReceiveProps = false
    this.tempfileInput = null
    this.containerID = 'reactueditor' + Math.random().toString(36).substr(2)
    this.fileInputID = 'fileinput' + Math.random().toString(36).substr(2)
    this.pasteImageAmount = 0
    this.state = {
      videoSource: '',
      audioSource: '',
      extendControls: this.props.extendControls ? this.props.extendControls : [],
      videoHtml: '',
      audioHtml: '',
      pluginsWithCustomRender: [],
    }
  }

  static propTypes = {
    value: PropTypes.string,
    ueditorPath: PropTypes.string.isRequired,
    plugins: PropTypes.array,
    onChange: PropTypes.func,
    uploadImage: PropTypes.func,
    getRef: PropTypes.func,
    multipleImagesUpload: PropTypes.bool,
    onReady: PropTypes.func,
    pasteImageStart: PropTypes.func,
    handlePasteImage: PropTypes.func,
    pasteImageDone: PropTypes.func,
    extendControls: PropTypes.array,
    debug: PropTypes.bool,
  }

  static defaultProps = {
    value: '',
    multipleImagesUpload: false,
    extendControls: [],
    debug: false,
  }

  componentDidMount() {
    let {ueditorPath} = this.props
    if (!window.UE && !window.UE_LOADING_PROMISE) {
      window.UE_LOADING_PROMISE = this.createScript(ueditorPath + '/ueditor.config.js').then(() => {
        return this.props.debug
          ? this.createScript(ueditorPath + '/ueditor.all.js')
          : this.createScript(ueditorPath + '/ueditor.all.min.js')
      })
    }
    window.UE_LOADING_PROMISE.then(() => {
      this.tempfileInput = document.getElementById(this.fileInputID)
      this.initEditor()
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
    let _url = window.location.origin + url
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

  registerInternalPlugin(pluginName) {
    switch(pluginName) {
      case 'uploadImage':
        return this.registerImageUpload()
      case 'insertCode':
        return this.registerSimpleInsertCode()
      case 'uploadVideo':
        return this.registerUploadVideo()
      case 'uploadAudio':
        return this.registerUploadAudio()
      case 'insertLink':
        return this.registerLink()
      default:
        return
    }
  }

  registerPlugin(plugin) {
    let name = Math.random().toString(36).slice(2)
    window.UE.registerUI(name, (ueditor, uiName) => {
      let config = plugin(ueditor)
      if (!config.mode) {
        config.mode = MODE.MODAL
      }
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: config.menuText,
        cssRules: config.cssRules || '',
        onclick: isModalMode(config.mode) ? () => {
          this.setState({[this.getVisibleName(name)]: true})
          config.onIconClick && config.onIconClick()
        } : config.onIconClick,
      })
      if (config.render) {
        this.setState(prevState => ({
          pluginsWithCustomRender: [
            ...prevState.pluginsWithCustomRender,
            {name, ...config},
          ],
        }))
      }
      return btn
    }, undefined, this.containerID)
  }

  registerImageUpload = () => this.registerPlugin(() => ({
    menuText: '图片上传',
    cssRules: 'background-position: -726px -77px;',
    mode: MODE.NORMAL,
    onIconClick: () => {
      this.tempfileInput.click()
    }
  }))

  registerSimpleInsertCode = () => this.registerPlugin((ueditor) => ({
    menuText: '插入代码',
    cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
    mode: MODE.NORMAL,
    onIconClick: () => {
      ueditor.focus()
      ueditor.execCommand('insertcode')
    }
  }))

  registerUploadVideo = () => {
    let {uploadVideo, progress} = this.props
    return this.registerPlugin((ueditor) => ({
      menuText: '上传视频',
      cssRules: 'background-position: -320px -20px;',
      mode: MODE.INTERNAL_MODAL,
      render: () => <VideoUploader upload={uploadVideo} progress={progress} onChange={this.videoChange} />,
      onConfirm: () => {
        ueditor.execCommand('insertparagraph')
        ueditor.execCommand('inserthtml', this.state.videoHtml, true)
        ueditor.execCommand('insertparagraph')
        ueditor.execCommand('insertparagraph')
      },
    }))
  }

  registerUploadAudio = () => {
    let {uploadAudio, progress} = this.props
    return this.registerPlugin((ueditor) => ({
      menuText: '上传音频',
      cssRules: 'background: url(' + uploadAudioIcon + ') !important; background-size: 20px 20px !important;',
      mode: MODE.INTERNAL_MODAL,
      render: () => <AudioUploader upload={uploadAudio} progress={progress} onChange={this.audioChange} />,
      onConfirm: () => {
        ueditor.execCommand('insertparagraph')
        ueditor.execCommand('inserthtml', this.state.audioHtml, true)
        ueditor.execCommand('insertparagraph')
        ueditor.execCommand('insertparagraph')
      },
    }))
  }

  registerLink = () => this.registerPlugin(ueditor => ({
    menuText: '超链接',
    cssRules: 'background-position: -504px 0px;',
    mode: MODE.INTERNAL_MODAL,
    render: () => <Link onChange={this.linkChange} />,
    onConfirm: () => {
      ueditor && ueditor.execCommand('inserthtml', this.state.linkHtml, true)
    },
  }))

  videoChange = videoHtml => {
    this.setState({videoHtml})
  }

  audioChange = audioHtml => {
    this.setState({audioHtml})
  }

  linkChange = linkHtml => {
    this.setState({linkHtml})
  }

  uploadImage = e => {
    let {uploadImage} = this.props
    if (uploadImage) {
      let promise = uploadImage(e)
      if (!!promise && typeof promise.then == 'function') {
        promise.then(imageUrl => {
          if (imageUrl instanceof Array) {
            imageUrl.forEach(url => {
              this.insertImage(url)
            })
          } else {
            this.insertImage(imageUrl)
          }
        })
      }
    }
    this.tempfileInput.value = ''
  }

  insertImage = imageUrl => {
    if (this.ueditor) {
      this.ueditor.focus()
      this.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />')
    }
  }

  handlePasteImage = () => {
    let {pasteImageStart, handlePasteImage, pasteImageDone} = this.props
    if (!handlePasteImage) return

    let html = this.ueditor.getContent()
    let images = utils.extractImageSource(html)

    if (Object.prototype.toString.call(images) !== '[object Array]') return

    this.pasteImageAmount += images.length
    pasteImageStart && pasteImageStart(this.pasteImageAmount)
    images.forEach(src => {
      let promise = handlePasteImage(src)
      if (!!promise && typeof promise.then == 'function') {
        promise.then(newSrc => {
          --this.pasteImageAmount
          if (this.pasteImageAmount === 0) {
            pasteImageDone && pasteImageDone()
          }
          let newHtml = utils.replaceImageSource(this.ueditor.getContent(), src, newSrc)
          this.ueditor.setContent(newHtml)
        })
      }
    })
  }

  getVisibleName = name => {
    return name + 'VisibleModal'
  }

  getRegisterUIName = name => {
    return `${name}-${this.containerID}`
  }

  initEditor = () => {
    const {config, plugins, onChange, value, getRef, onReady} = this.props

    if (plugins && Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        if (typeof plugin === 'string') {
          return this.registerInternalPlugin(plugin)
        } else {
          return this.registerPlugin(plugin)
        }
      })
    }

    // 即将废弃
    this.state.extendControls.forEach(control => {
      window.UE.registerUI(this.getRegisterUIName(control.name), (editor, uiName) => {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: control.menuText,
          cssRules: control.cssRules ? control.cssRules : '',
          onclick: () => {
            this.setState({[this.getVisibleName(control.name)]: true})
          },
        })
        return btn
      }, undefined, this.containerID)
    })

    this.ueditor = config ? window.UE.getEditor(this.containerID, config) : window.UE.getEditor(this.containerID)
    this.ueditor._react_ref = this

    getRef && getRef(this.ueditor)
    this.ueditor.ready(() => {
      this.ueditor.addListener('contentChange', () => {
        // 由 componentWillReceiveProps 导致的 contentChange 不需要通知父组件
        if (this.isContentChangedByWillReceiveProps) {
          this.isContentChangedByWillReceiveProps = false
        } else {
          this.content = this.ueditor.getContent()
          onChange && onChange(this.content)
        }
      })

      this.ueditor.addListener('afterpaste', () => {
        this.handlePasteImage()
      })

      if (this.isContentChangedByWillReceiveProps) {
        this.isContentChangedByWillReceiveProps = false
        this.ueditor.setContent(this.content)
      } else {
        this.ueditor.setContent(value)
      }

      onReady && onReady()
    })
  }

  render() {
    let {extendControls} = this.state
    let {multipleImagesUpload} = this.props

    return (
      <div>
        <script id={this.containerID} name={this.containerID} type='text/plain' />
        <input type='file'
          id={this.fileInputID}
          onChange={this.uploadImage}
          style={{visibility: 'hidden', width: 0, height: 0, margin: 0, padding: 0, fontSize: 0}}
          multiple={multipleImagesUpload} />
        {
          this.state.pluginsWithCustomRender.map(plugin => {
            const visible = !!this.state[this.getVisibleName(plugin.name)]
            const onClose= () => {
              if (isModalMode(plugin.mode)) {
                this.setState({[this.getVisibleName(plugin.name)]: false})
              }
              plugin.onClose && typeof plugin.onClose === 'function' && plugin.onClose()
            }
            if (plugin.mode === MODE.INTERNAL_MODAL) {
              return (
                <Modal
                  key={plugin.name}
                  title={plugin.title || plugin.menuText}
                  zIndex={plugin.zIndex}
                  alignStyle={plugin.alignStyle}
                  visible={visible}
                  beforeClose={plugin.beforeClose}
                  onClose={onClose}
                  onConfirm={plugin.onConfirm}
                  component={plugin.render()}
                />
              )
            } else if (plugin.mode === MODE.MODAL) {
              return (
                <div key={plugin.name}>
                  {plugin.render(visible, onClose)}
                </div>
              )
            } else if (plugin.mode === MODE.NORMAL) {
              return (
                <div key={plugin.name}>
                  {plugin.render()}
                </div>
              )
            }
          })
        }
        {  // 即将废弃
          extendControls.map(control => (
            <Modal
              key={control.name + this.containerID}
              name={control.name}
              menuText={control.menuText}
              title={control.title}
              zIndex={control.zIndex}
              alignStyle={control.alignStyle}
              visible={this.state[this.getVisibleName(control.name)]
                ? this.state[this.getVisibleName(control.name)] : false}
              beforeClose={control.beforeClose}
              onClose={() => { this.setState({[this.getVisibleName(control.name)]: false}) }}
              onConfirm={control.onConfirm}
              component={control.component}
            />
          ))
        }
      </div>
    )
  }
}

export default ReactUeditor
