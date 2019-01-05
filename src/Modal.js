import Button from './Button'
import Dialog from 'rc-dialog'
import PropTypes from 'prop-types'
import React from 'react'
import 'rc-dialog/assets/index.css'

class Modal extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    beforeClose: PropTypes.func,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
  }

  closeModal = () => {
    this.props.beforeClose && this.props.beforeClose()
    this.props.onClose()
  }

  onConfirm = () => {
    this.props.onConfirm && this.props.onConfirm()
    this.closeModal()
  }

  render() {
    let {title, visible} = this.props

    return (
      <Dialog
        title={title}
        onClose={this.closeModal}
        visible={visible}
        footer={[
          <Button key='close' onClick={this.closeModal}>取消</Button>,
          <Button key='insert' onClick={this.onConfirm}>确认</Button>,
        ]}
        animation='zome'
        maskAnimation='fade'>
        {this.props.component}
      </Dialog>
    )
  }
}

export default Modal
