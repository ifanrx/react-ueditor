import Button from './Button'
import Input from './Input'
import Label from './Label'
import React from 'react'
import Modal from 'rc-Dialog'
import Select from './select'
import Upload from './Upload'
import 'rc-dialog/assets/index.css'

let style = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap'
  }
}

const linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i

class UploadVideoModal extends React.Component {

  constructor() {
    super()
    this.updateVideoSource = this.updateVideoSource.bind(this)
    this.uploadVideo = this.uploadVideo.bind(this)
    this.insertVideo = this.insertVideo.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.changeConfig = this.changeConfig.bind(this)
    this.state = {
      videoSource: '',
      width: 400,
      height: 400,
      controls: true,
      autoplay: false,
      muted: false,
      loop: false
    }
  }

  static updateVideoUrl(url) {
    this.setState({videoSource: url})
  }

  updateVideoSource(e) {
    this.setState({videoSource: e.target.value})
  }

  uploadVideo(e) {
    let props = this.props
    if (props.uploadVideo) {
      props.uploadVideo(e)
    }
  }

  insertVideo() {
    let {videoSource, width, height, controls, autoplay, muted, loop} = this.state
    let params = {width: parseInt(width), height: parseInt(height), controls, autoplay, muted, loop}
    if (videoSource !== '' && linkRegx.test(videoSource)) {
      this.props.insertVideo(this.state.videoSource, params)
      this.closeModal()
    }
  }

  closeModal() {
    this.props.closeModal()
  }

  changeConfig(e, type) {
    let value = e.target.value
    if (type === 'width' || type === 'height') {
      if (isNaN(parseInt(value))) {
        value = parseInt(value)
      }
    } else {
      value = !!value
    }
    this.setState({[type]: value})
  }

  render() {
    let {videoSource, width, height, controls, autoplay, muted, loop} = this.state
    let {visible} = this.props
    return (
      <Modal
        title="上传视频"
        onClose={this.closeModal}
        visible={visible}
        footer={[
          <Button key="close" onClick={this.closeModal}>取消</Button>,
          <Button key="insert" onClick={this.insertVideo}>插入</Button>
        ]}
        animation="zome"
        maskAnimation="fade">
        <div>
          <div>
            <span style={{fontSize: '14px', paddingRight: '10px', color: 'rgba(0, 0, 0, 0.65)'}}>插入链接</span>
            <Input style={{width: '350px'}} type="text" value={videoSource} onChange={this.updateVideoSource} />
            <Upload onChange={this.uploadVideo} />
          </div>
          <h3 style={{fontSize: '14px', paddingRight: '10px', color: 'rgba(0, 0, 0, 0.65)'}}>参数配置</h3>
          <form style={style.paramsConfig}>
            <Label>width <Input type="number" defaultValue={width} onChange={(e) => { this.changeConfig(e, 'width') }} /></Label>
            <Label>height <Input type="number" defaultValue={height} onChange={(e) => { this.changeConfig(e, 'height') }} /></Label>
            <Label>controls
              <Select defaultValue={controls} onChange={(e) => { this.changeConfig(e, 'controls') }}>
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            </Label>
            <Label>autoplay
              <Select defaultValue={autoplay} onChange={(e) => { this.changeConfig(e, 'autoplay') }}>
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            </Label>
            <Label>muted
              <Select defaultValue={muted} onChange={(e) => { this.changeConfig(e, 'muted') }}>
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            </Label>
            <Label>loop
              <Select defaultValue={loop} onChange={(e) => { this.changeConfig(e, 'loop') }}>
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            </Label>
          </form>
          <div style={{textAlign: 'center', padding: '20px 10px 0 10px'}}>
            <video src={videoSource} controls="controls" style={{width: '400px', height: '250px', backgroundColor: '#000'}}>
              你的浏览器不支持 video 标签
            </video>
          </div>
        </div>
      </Modal>
    )
  }
}

export default UploadVideoModal