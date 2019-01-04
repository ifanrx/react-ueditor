import React from 'react'
import ReactUeditor from '../src'

class SimpleExample extends React.Component {
  updateEditorContent = content => {
    this.content = content
  }

  render() {
    return (
      <ReactUeditor
        debug
        ueditorPath='../vendor/ueditor'
        onChange={this.updateEditorContent}
        extendControls={[]}
      />
    )
  }
}

export default SimpleExample
