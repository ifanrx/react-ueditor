import React from 'react'
import ReactUeditor from '../src'

class App extends React.Component {
  uploadImage(e) {
    console.log(e)
    ReactUeditor.insertImage('https://avatars2.githubusercontent.com/u/3232724?v=8&s=120')
  }

  render() {
    return (
      <div>
        <ReactUeditor
          ueditorPath="../vendor/ueditor"
          value="hello world"
          uploadImage={this.uploadImage.bind(this)}
        />
      </div>
    )
  }
}

export default App