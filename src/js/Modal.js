import React, {Fragment} from 'react'
import Dialog from 'rc-dialog'
import {Rnd} from 'react-rnd'
import PropTypes from 'prop-types'
import Button from './Button'
import 'rc-dialog/assets/index.css'

class Modal extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    beforeClose: PropTypes.func,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    visible: false,
    zIndex: 1050,
    alignStyle: 'top',
    extendControls: [],
    debug: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      rndWidth: '0',
      rndHeight: '0',
      rndXin: 400,
      rndYin: 100,
    }
  }

  componentDidMount() {
    // this.rndRef = React.createRef()
  }

  closeModal = () => {
    console.log('closeModal------------------')
    this.props.beforeClose && this.props.beforeClose()
    this.props.onClose()
  }

  onConfirm = () => {
    this.props.onConfirm && this.props.onConfirm()
    this.closeModal()
  }

  getRnd = () => {
    // const ref = self.rndRef.current
    const ref = document.getElementById('posView')
    console.log('ref------', ref)
    return ref
  }

  render() {
    let {title, visible, zIndex, alignStyle} = this.props

    console.log('ref+++++', this.rndRef)

    const rndoptions = {
      position: {
        x: this.state.rndXin,
        y: this.state.rndYin,
      },

      onDragStop: (e, d) => {
        // console.log(d);
        this.setState({rndXin: d.x, rndYin: d.y})
      },
      onResize: (e, direction, ref, delta, position) => {
        // console.log(ref);
        this.setState({
          rndWidth: ref.style.width,
          rndHeight: ref.style.height,
          rndXin: position.x,
          rndYin: position.y,
        })
      },
    }

    return visible ? (
      <Rnd {...rndoptions} className='rndPos'>
        <div id='posView' ref={this.rndRef}>
          <Dialog
            title={title}
            mask={false}
            forceRender
            visible={visible}
            zIndex={zIndex}
            destroyOnClose
            animation='zome'
            maskAnimation='fade'
            maskClosable={false}
            onClose={this.closeModal}
            getContainer={this.getRnd}
            footer={[
              <Button key='close' onClick={this.closeModal}>
                取消
              </Button>,
              <Button key='insert' onClick={this.onConfirm}>
                确认
              </Button>,
            ]}
            style={alignStyle === 'middle' ? {top: '50%', transform: 'translateY(-50%)'} : {}}>
            {this.props.component}
          </Dialog>
        </div>
      </Rnd>
    ) : (
      false
    )
  }
}

export default Modal
