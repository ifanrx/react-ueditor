import React from 'react'
import ReactUeditor from '../src/js'

class AsyncExample extends React.Component {
  constructor() {
    super()
    this.editorResult = ''
    this.state = {
      content: '',
    }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        content: '我是异步加载回来的数据',
      })
    }, 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
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
          ueditorPath='../vendor/ueditor'
          value={content}
          onChange={this.updateEditorContent}
        />
      </div>
    )
  }
}

export default AsyncExample
