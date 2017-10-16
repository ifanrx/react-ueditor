import PropTypes from 'prop-types'
import React from 'react'

let content = ''  // 存储编辑器的实时数据，用于传递给父组件
let ueditor, isContentChangedByWillReceiveProps = false, tempfileInput = null
const simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNiTAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxUQKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/UewdgKu4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6awOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hOojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg=='
const uploadImageIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAByUlEQVRYR+2XsS5EQRSGv30CSiqUKrQiQalCRccjUKrYTodegidAolPgDXgD3oAKFfk2M8nsjV33rp27JCbZ7N17587/n/P/58xsgwGPxoDx+SfwqzLwkdEPi8BNWL8J7EWsNAMS2Abu+0xEYAk4DoGLbgSceNtnAgYW13VtPx0z8GcJLAC7wDOgxqmMtWRA4KEg3SWwkshYC4G0gu4AMxJHLQQ2gRPgBfBap9dKoFvh/CgDw8AGMA4cAY89lGjPBAS3iUwHUMFngtOr8OiJgKDnIfIUTG1Xq6ADlQlYUkZuBr4atmtbatlRicAZsNwFPIIqRXHP0CdjwENBpkoEykZV9EMsQ983g7b0SDALAYGiH1LwGIAkDoJfoomdP/Hdblg2A3Gei6ZtN33/HVgPu59+sjseA1fpO8XzQFUCnea/AaNBDr3hULY54BpYitt+LgJppcS9P/2WlNK1nYr7eSQzMEHsonFj8iBilXlff1hJWQmouwZsRQqchsrwnn2kZc5cEuwDOwG4KIHPRnJL8ApMAk9JO9eEa2Hbno19Itf/AtM9D2yFzqgc/jYbGtTnrZGLgGurvQSmApZHNbVvO3XnJFCqpwycwCfya6AhY6x1TgAAAABJRU5ErkJggg=='

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
        cssRules: 'background: url(' + uploadImageIcon + ') !important; background-size: 20px 20px !important;',
        onclick: () => {
          tempfileInput.click()
        }
      })

      return btn
    })
  }

  registerSimpleInsertCode() {
    window.UE.registerUI('simpleInsertCode', (editor, uiName) => {
      var btn = new window.UE.ui.Button({
        name: uiName,
        title: '插入代码',
        cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
        onclick: () => {
          if (ueditor) {
            ueditor.focus()
            ueditor.execCommand('insertcode')
          }
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
    const props  = this.props, plugins = props.plugins
    ueditor = window.UE.getEditor('container')

    if (plugins && plugins instanceof Array && plugins.length > 0) {
      if (plugins.indexOf('uploadImage') !== -1) this.registerImageUpload()
      if (plugins.indexOf('insertCode') !== -1) this.registerSimpleInsertCode()
    }

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
  plugins: PropTypes.array,
  onChange: PropTypes.func,
  uploadImage: PropTypes.func
}

export default ReactUeditor