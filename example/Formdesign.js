import React, {Fragment} from 'react'
import ReactUeditor from '../src/js'

class Formdesign extends React.Component {
  constructor() {
    super()
    this.ueditorRef = null
    this.leipiFormDesign = null
    this.state = {
      content: '',
    }
  }

  updateEditorContent = content => {
    console.log('updateEditorContent', content)
    this.content = content
  }

  getUeditor = ref => {
    this.ueditorRef = ref
  }

  handleReady = () => {
    const leipiEditor = this.ueditorRef
  }

  ueClick = type => {
    console.log('ueClick', type)
    this.leipiFormDesign.exec(type)
  }

  outSave = json => {
    console.log('outSave*****************', json)
  }

  render() {
    return (
      <Fragment>
        <p>
          一栏布局：
          <br />
          <br />
          <button type='button' onClick={() => this.ueClick('text')} className='btn btn-info'>
            文本框
          </button>
          <button type='button' onClick={() => this.ueClick('textarea')} className='btn btn-info'>
            多行文本
          </button>
          <button type='button' onClick={() => this.ueClick('select')} className='btn btn-info'>
            下拉菜单
          </button>
          <button type='button' onClick={() => this.ueClick('radios')} className='btn btn-info'>
            单选框
          </button>
          <button type='button' onClick={() => this.ueClick('checkboxs')} className='btn btn-info'>
            复选框
          </button>
          <button type='button' onClick={() => this.ueClick('macros')} className='btn btn-info'>
            宏控件
          </button>
          <button type='button' onClick={() => this.ueClick('progressbar')} className='btn btn-info'>
            进度条
          </button>
          <button type='button' onClick={() => this.ueClick('qrcode')} className='btn btn-info'>
            二维码
          </button>
          <button type='button' onClick={() => this.ueClick('listctrl')} className='btn btn-info'>
            列表控件
          </button>
          <button type='button' onClick={() => this.ueClick('more')} className='btn btn-primary'>
            一起参与...
          </button>
        </p>
        <ReactUeditor
          debug
          ueditorPath='../vendor/ueditor'
          plugins={['insertInput', 'insertTextarea', 'insertSelect', 'insertRadios', 'insertCheckboxs', 'insertListctrl', 'saveJson']}
          outSave={this.outSave}
          getRef={this.getUeditor}
          onChange={this.updateEditorContent}
          // onReady={this.handleReady}
        />
      </Fragment>
    )
  }
}

export default Formdesign
