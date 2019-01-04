import React from 'react'
import ReactUeditor from '../src'

const testIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4T82SMUsDQ' +
  'RCFZ+64IlaxsEgpEQULGxsrLUTQLv4CsZCA3XnJ7AWJnKAkuyuk0CYKFpYimFKwsktlIVYKoo2WpotwYUcuEDkTNUnnFgszb+bj7c4' +
  'gdB2t9SoAzBhjMC5ZlsUAcJfP5y/j+W9FkSClzADAHCKOMvNblEPEFDO/A0BdCFH7ExCJSqk0ACwS0XEUa62zrVbrulAoPHU77nHwP' +
  'wBSyilmnvd9/yRyVC6XNxzHufE872HQJ+w7jnPkum77EyuVSioMw00iKvYFlEqlCdu2M0R0EC+WUnq2bV/kcrmXfmM8TCaTW9lsNow' +
  'XVqtVp9FoKCGE+ytAKbXAzCuWZV11W41iY8wyANSEEPWO/jVGZkat9T0ATP/UHMvdEtFsD0BKuY6Ip32aO/IaEZ21tzS6giAYSSQSz' +
  '4g4NgiAmV+bzWY6CIKPNkAptQsAO4M0x2qKRLTXAUQ7Pj4k4JGIJtsAKeU2Ii4NAQiNMSe+759/AhPYnxETEdJoAAAAAElFTkSuQmCC'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  getUeditor = ref => {
    this.ueditorRef = ref
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render() {
    return (
      <ReactUeditor
        debug
        ueditorPath='../vendor/ueditor'
        getRef={this.getUeditor}
        extendControls={[
          {
            name: 'test',
            menuText: 'test',
            title: '测试模态框',
            // 图标定义，遵循 ueditor 的格式
            cssRules: 'background: url(' + testIcon + ') !important; background-size: 20px 20px !important;',
            component: <input onChange={this.handleInputChange} />,
            onConfirm: () => {
              this.ueditorRef.execCommand('inserthtml', this.state.inputValue, true)
            },
          },
        ]}
      />
    )
  }
}

export default App
