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

class UploadAudioModal extends React.Component {

  constructor() {
    super()
    this.updateAudioSource = this.updateAudioSource.bind(this)
    this.uploadAudio = this.uploadAudio.bind(this)
    this.insertAudio = this.insertAudio.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.changeConfig = this.changeConfig.bind(this)
    this.state = {
      audioSource: '',
      controls: true,
      autoplay: false,
      loop: false
    }
  }

  updateAudioSource(e) {
    this.setState({audioSource: e.target.value})
  }

  uploadAudio(e) {
    let props = this.props
    if (props.uploadAudio) {
      let promise = props.uploadAudio(e)
      if (!!promise && typeof promise.then == "function") {
        promise.then((audioUrl)=>{
          this.setState({audioSource: audioUrl})
        })
      }
    }
  }

  insertAudio() {
    let {audioSource, controls, autoplay, loop} = this.state
    let params = {controls, autoplay, loop}
    if (audioSource !== '' && linkRegx.test(audioSource)) {
      this.props.insertAudio(this.state.audioSource, params)
      this.closeModal()
    }
  }

  closeModal() {
    this.props.closeModal()
  }

  changeConfig(e, type) {
    let value = !!e.target.value
    this.setState({[type]: value})
  }

  render() {
    let {audioSource, controls, autoplay, loop} = this.state
    let {visible} = this.props
    return (
      <Modal
        title="上传音频"
        onClose={this.closeModal}
        visible={visible}
        footer={[
          <Button key="close" onClick={this.closeModal}>取消</Button>,
          <Button key="insert" onClick={this.insertAudio}>插入</Button>
        ]}
        maskAnimation="fade">
        <div>
          <div>
            <span style={{fontSize: '14px', paddingRight: '10px', color: 'rgba(0, 0, 0, 0.65)'}}>插入链接</span>
            <Input style={{width: '350px'}} type="text" value={audioSource} onChange={this.updateAudioSource} />
            <Upload onChange={this.uploadAudio} />
          </div>
          <h3 style={{fontSize: '14px', paddingRight: '10px', color: 'rgba(0, 0, 0, 0.65)'}}>参数配置</h3>
          <form style={style.paramsConfig}>
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
            <Label>loop
              <Select defaultValue={loop} onChange={(e) => { this.changeConfig(e, 'loop') }}>
                <option value="true">true</option>
                <option value="false">false</option>
              </Select>
            </Label>
          </form>
          <div style={{textAlign: 'center', padding: '20px 10px 0 10px'}}>
            <audio src={audioSource} controls="controls" style={{width: '400px'}}>
              你的浏览器不支持 audio 标签
            </audio>
          </div>
        </div>
      </Modal>
    )
  }
}

export default UploadAudioModal