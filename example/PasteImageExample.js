import React from 'react'
import ReactUeditor from '../src'

class PasteImageExample extends React.Component {
  handlePasteImage = src => {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve('https://s3.ifanr.com/wp-content/uploads/2019/01/WechatIMG974.jpeg!720')
      }, 1000)
    })
  }

  render() {
    return (
      <ReactUeditor
        ueditorPath='../vendor/ueditor'
        handlePasteImage={this.handlePasteImage}
      />
    )
  }
}

export default PasteImageExample