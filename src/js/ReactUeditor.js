import React from 'react'
import '../css/style.less'
import * as utils from './utils'
import Icon from './Icon'
import Link from './Link'
import Save from './Save'
import Modal from './Modal'
import PropTypes from 'prop-types'
import VideoUploader from './VideoUploader'
import AudioUploader from './AudioUploader'

const MODE = {
  INTERNAL_MODAL: 'internal-modal',
  MODAL: 'modal',
  NORMAL: 'normal',
}

function isModalMode(mode) {
  return mode === MODE.INTERNAL_MODAL || mode === MODE.MODAL
}

class ReactUeditor extends React.Component {
  constructor(props) {
    super(props)
    this.content = props.value || '' // 存储编辑器的实时数据，用于传递给父组件
    this.ueditor = null
    this.isContentChangedByWillReceiveProps = false
    this.tempfileInput = null
    this.containerID =
      'reactueditor' +
      Math.random()
        .toString(36)
        .substr(2)
    this.fileInputID =
      'fileinput' +
      Math.random()
        .toString(36)
        .substr(2)
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
    console.log('ReactUeditor URL')
    let {ueditorPath} = this.props
    if (!window.UE && !window.UE_LOADING_PROMISE) {
      window.UE_LOADING_PROMISE = this.createScript(ueditorPath + '/ueditor.config.js').then(() => {
        return this.props.debug ? this.createScript(ueditorPath + '/ueditor.all.js') : this.createScript(ueditorPath + '/ueditor.all.min.js')
      })
    }
    window.UE_LOADING_PROMISE.then(() => {
      this.createScript(ueditorPath + '/formdesign/leipi.formdesign.v4.js')
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
    switch (pluginName) {
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
    case 'saveJson':
      return this.registerJson()
    case 'insertInput':
      return this.registerInput()
    case 'insertTextarea':
      return this.registerTextarea()
    case 'insertSelect':
      return this.registerSelect()
    case 'insertRadios':
      return this.registerRadios()
    case 'insertCheckboxs':
      return this.registerCheckboxs()
    case 'insertListctrl':
      return this.registerListctrl()
    default:
    }
  }

  registerPlugin(plugin) {
    let name = Math.random()
      .toString(36)
      .slice(2)
    window.UE.registerUI(
      name,
      (ueditor, uiName) => {
        let config = plugin(ueditor)
        if (!config.mode) {
          config.mode = MODE.MODAL
        }
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: config.menuText,
          cssRules: config.cssRules || '',
          onclick: isModalMode(config.mode)
            ? () => {
              this.setState({[this.getVisibleName(name)]: true})
              config.onIconClick && config.onIconClick()
            }
            : config.onIconClick,
        })
        if (config.render) {
          this.setState(prevState => ({
            pluginsWithCustomRender: [...prevState.pluginsWithCustomRender, {name, ...config}],
          }))
        }
        return btn
      },
      undefined,
      this.containerID
    )
  }

  registerImageUpload = () =>
    this.registerPlugin(() => ({
      menuText: '图片上传',
      cssRules: 'background-position: -726px -77px;',
      mode: MODE.NORMAL,
      onIconClick: () => {
        this.tempfileInput.click()
      },
    }))

  registerSimpleInsertCode = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入代码',
      cssRules: 'background: url(' + Icon.simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('insertcode')
      },
    }))

  registerUploadVideo = () => {
    let {uploadVideo, progress} = this.props
    return this.registerPlugin(ueditor => ({
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
    return this.registerPlugin(ueditor => ({
      menuText: '上传音频',
      cssRules: 'background: url(' + Icon.uploadAudioIcon + ') !important; background-size: 20px 20px !important;',
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

  registerLink = () =>
    this.registerPlugin(ueditor => ({
      menuText: '超链接',
      cssRules: 'background-position: -504px 0px;',
      mode: MODE.INTERNAL_MODAL,
      render: () => <Link onChange={this.linkChange} />,
      onConfirm: () => {
        ueditor && ueditor.execCommand('inserthtml', this.state.linkHtml, true)
      },
    }))

  registerJson = () => {
    let {outSave} = this.props
    return this.registerPlugin(ueditor => ({
      menuText: '保存',
      cssRules: `background-image: url(${Icon.saveIcon}) !important;background-size:83%;background-repeat: no-repeat;   background-position: 1px 2px;`,
      mode: MODE.INTERNAL_MODAL,
      render: () => <Save ue={ueditor} onChange={this.saveChange} outSave={outSave} />,
      onConfirm: () => {
        const self = this
        const jsons = self.state.saveJson
        const saveCallBack = self.props.outSave
        saveCallBack(jsons)
        console.log('registerJson save', jsons)

        // return false
        // $.ajax({
        //   type: 'POST',
        //   url: 'urls',
        //   //dataType : 'json',
        //   data: { type: type_value, formid: formid, parse_form: parse_form },
        //   success: function(data) {
        //     if (confirm('查看js解析后，提交到服务器的数据，请临时允许弹窗')) {
        //       win_parse = window.open('', '', 'width=800,height=600')
        //       //这里临时查看，所以替换一下，实际情况下不需要替换
        //       data = data.replace(/<\/+textarea/, '&lt;textarea')
        //       win_parse.document.write('<textarea style="width:100%;height:100%">' + data + '</textarea>')
        //       win_parse.focus()
        //     }
        //     if (data.success == 1) {
        //       alert('保存成功')
        //       $('#submitbtn').button('reset')
        //     } else {
        //       alert('保存失败！')
        //     }
        //   }
        // })
      },
    }))
  }

  registerInput = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入Input',
      cssRules: `background-image: url(${Icon.inputIcon}) !important;background-size: 103%`,
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('text')
      },
    }))

  registerTextarea = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入多行文本',
      cssRules: `background-image: url(${Icon.textareaIcon}) !important;background-size: 100%;`,
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('textarea')
      },
    }))

  registerSelect = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入下拉菜单',
      cssRules: `background-image: url(${Icon.selectIcon}) !important;background-size: 86%;background-repeat: no-repeat;   background-position: 1px 2px;`,
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('select')
      },
    }))

  registerRadios = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入单选框',
      cssRules: `background-image: url(${Icon.radioIcon}) !important;background-size: 87%;background-repeat: no-repeat;   background-position: 1px 1px;`,
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('radios')
      },
    }))

  registerCheckboxs = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入复选框',
      cssRules: `background-image: url(${Icon.checkboxIcon}) !important;background-size: 75%;background-repeat: no-repeat;   background-position: 1px 3px;`,
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('checkboxs')
      },
    }))

  registerListctrl = () =>
    this.registerPlugin(ueditor => ({
      menuText: '插入列表控件',
      cssRules: `background-image: url(${Icon.listIcon}) !important;background-size: 80%;background-repeat: no-repeat;   background-position: 1px 2px;`,
      mode: MODE.NORMAL,
      onIconClick: () => {
        ueditor.focus()
        ueditor.execCommand('listctrl')
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
  saveChange = saveJson => {
    const self = this
    console.log('saveChange++++++++++++', saveJson)
    self.setState({saveJson})
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
      window.UE.registerUI(
        this.getRegisterUIName(control.name),
        (editor, uiName) => {
          var btn = new window.UE.ui.Button({
            name: uiName,
            title: control.menuText,
            cssRules: control.cssRules ? control.cssRules : '',
            onclick: () => {
              this.setState({[this.getVisibleName(control.name)]: true})
            },
          })
          return btn
        },
        undefined,
        this.containerID
      )
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
        <input
          type='file'
          id={this.fileInputID}
          onChange={this.uploadImage}
          style={{visibility: 'hidden', width: 0, height: 0, margin: 0, padding: 0, fontSize: 0}}
          multiple={multipleImagesUpload}
        />
        {this.state.pluginsWithCustomRender.map(plugin => {
          const visible = !!this.state[this.getVisibleName(plugin.name)]
          const onClose = () => {
            console.log('onClose-------------------')
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
            return <div key={plugin.name}>{plugin.render(visible, onClose)}</div>
          } else if (plugin.mode === MODE.NORMAL) {
            return <div key={plugin.name}>{plugin.render()}</div>
          }
        })}
      </div>
    )
  }
}

export default ReactUeditor
