import React from 'react'
import ReactUeditor from '../src'

class AsyncExample extends React.Component {
  constructor(props) {
    super(props)
    this.editorResult = ''
    this.state = {
      content: '',
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        content: '我是异步加载回来的数据',
      })
    }, 2000)
  }

  updateEditorContent = content => {
    // 通过 editroResult 获取编辑器最新内容，而不是对 content 进行 setState（因为 ueditor 不是一个受控组件）
    this.editorResult = content
  }

  render() {
    let {content} = this.state
    return (
      <div>
        <ReactUeditor
          getRef={this.getUeditor}
          ueditorPath='../vendor/ueditor'
          value={content}
          onChange={this.updateEditorContent}
        />
      </div>
    )
  }
}

export default AsyncExample
