import React from 'react'
import ReactUeditor from '../src'

class SimpleExample extends React.Component {
  updateEditorContent = content => {
    this.content = content
  }

  render() {
    return (
      <ReactUeditor
        ueditorPath='../vendor/ueditor'
        onChange={this.updateEditorContent}
      />
    )
  }
}

export default SimpleExample
