import PropTypes from 'prop-types'
import React from 'react'

let content = ''  // 存储编辑器的实时数据，用于传递给父组件
let ueditor, isContentChangedByWillReceiveProps = false, tempfileInput = null

class ReactUeditor extends React.Component {

  constructor() {
    super()
    this.uploadImage = this.uploadImage.bind(this)
  }

  componentDidMount() {
    let props = this.props
    this.createScript(props.ueditorPath + '/ueditor.config.js').then(() => {
      this.createScript(props.ueditorPath + '/ueditor.all.min.js').then(() => {
        tempfileInput = document.getElementById('tempfileInput')
        this.initEditor()
      })
    })
  }

  createScript(url) {
    let scriptTags = window.document.querySelectorAll('script'), len = scriptTags.length, i = 0
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

  /**
   * 这里存在两种情况会改变编辑器的内容：
   * 1. 父组件初始化传递的 value。父组件 value 的获取是异步的，因此会触发一次 componentWillReceiveProps，这种情况不需要将更新再通知父组件
   * 2. 用户对编辑器进行编辑
   */
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps && this.props.value !== nextProps.value) {
      isContentChangedByWillReceiveProps = true
      content = nextProps.value

      if (ueditor) {
        ueditor.ready(() => {
          ueditor.setContent(nextProps.value)
        })
      }
    }
  }

  componentWillUnmount() {
    if (ueditor) {
      ueditor.destroy()
    }
  }

  // uditor 自定义按钮的方式
  registerImageUpload() {
    window.UE.registerUI('imageUpload', (editor, uiName) => {
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: '文件上传',
        cssRules: 'background-position: -380px 0',
        onclick: () => {
          tempfileInput.click()
        }
      })

      // 当点到编辑内容上时，按钮要做的状态反射
      editor.addListener('selectionchange', () => {
        var state = editor.queryCommandState(uiName)
        if (state == -1) {
          btn.setDisabled(true)
          btn.setChecked(false)
        } else {
          btn.setDisabled(false)
          btn.setChecked(state)
        }
      })

      return btn
    })
  }

  uploadImage(e) {
    let props = this.props
    if (props.uploadImage) {
      props.uploadImage(e)
    }
    tempfileInput.value = ''
  }

  static insertImage(imageUrl) {
    if (ueditor) {
      ueditor.focus()
      ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />')
    }
  }

  initEditor() {
    const props  = this.props

    ueditor = window.UE.getEditor('container')
    this.registerImageUpload()

    ueditor.ready(() => {
      ueditor.addListener('contentChange', () => {
        // 由 componentWillReceiveProps 导致的 contentChange 不需要通知父组件
        if (isContentChangedByWillReceiveProps) {
          isContentChangedByWillReceiveProps = false
        } else {
          content = ueditor.getContent()

          if (props.onChange) {
            props.onChange(ueditor.getContent())
          }
        }
      })

      if (isContentChangedByWillReceiveProps) {
        isContentChangedByWillReceiveProps = false
        ueditor.setContent(content)
      } else {
        ueditor.setContent(props.value)
      }
    })
  }

  render() {
    return (
      <div>
        <script id="container" type="text/plain"></script>
        <input type="file" id="tempfileInput" onChange={this.uploadImage} style={{visibility: 'hidden'}} />
      </div>
    )
  }
}

ReactUeditor.propTypes = {
  value: PropTypes.string,
  ueditorPath: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  uploadImage: PropTypes.func
}

export default ReactUeditor