import Button from './Button'
import Input from './Input'
import Modal from 'rc-dialog'
import React from 'react'

let inputStyle = {
  width: '300px',
}
let spanStyle = {
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.65)',
  display: 'inline-block',
  width: '80px',
}
let formItmeStyle = {
  marginBottom: '10px',
}

class Link extends React.Component {
  state = {
    text: '',
    link: '',
    title: '',
    newTab: false,
    showTips: false,
  }

  closeModal = () => {
    this.setState({
      text: '',
      link: '',
      title: '',
      newTab: false,
      showTips: false,
    })
    this.props.closeModal()
  }

  hasProtocol = link => {
    if (link.match(/^http:|https:/) || link.match(/^\/\//)) {
      return true
    }
    return false
  }

  insert = () => {
    let {text, link, title, newTab} = this.state

    if (link) {
      let html = ''

      if (!this.hasProtocol(link)) {
        link = 'http://' + link
      }

      html += `<a href="${link}" target=${newTab ? '_blank' : '_self'} title="${title}">${text || link}</a>`

      this.props.insert(html)
    }
    this.closeModal()
  }

  changeConfig = (e, type) => {
    let value = e.target.value
    let boolType = ['newTab']
    if (boolType.indexOf(type) !== -1) {
      value = !!value
    }

    if (type == 'link') {
      if (!this.hasProtocol(value)) {
        this.setState({
          showTips: true,
        })
      } else {
        this.setState({
          showTips: false,
        })
      }
    }
    if (type == 'newTab') {
      return this.setState({newTab: !this.state.newTab})
    }
    this.setState({[type]: value})
  }

  render() {
    let {text, link, title, newTab, showTips} = this.state
    let {visible} = this.props

    return (
      <Modal
        title='超链接'
        onClose={this.closeModal}
        visible={visible}
        footer={[
          <Button key='close' onClick={this.closeModal}>取消</Button>,
          <Button key='insert' onClick={this.insert}>插入</Button>,
        ]}
        animation='zome'
        maskAnimation='fade' >
        <form>
          <div style={formItmeStyle}>
            <span style={spanStyle}>文本内容：</span>
            <Input type='text' style={inputStyle} value={text} onChange={e => this.changeConfig(e, 'text')} />
          </div>
          <div style={formItmeStyle}>
            <span style={spanStyle}>链接地址：</span>
            <Input type='text' style={inputStyle} value={link} onChange={e => this.changeConfig(e, 'link')} />
          </div>
          <div style={formItmeStyle}>
            <span style={spanStyle}>标题：</span>
            <Input type='text' style={inputStyle} value={title} onChange={e => this.changeConfig(e, 'title')} />
          </div>
          <div style={formItmeStyle}>
            <span style={{color: 'rgba(0, 0, 0, 0.65)', fontSize: '14px'}}>是否在新窗口打开：</span>
            <input type='checkbox' checked={newTab} onChange={e => this.changeConfig(e, 'newTab')} />
          </div>
          {showTips && <p style={{fontSize: '14px', color: 'red'}}>您输入的超链接中不包含http等协议名称，默认将为您添加http://前缀</p>}
        </form>
      </Modal>
    )
  }
}

export default Link
