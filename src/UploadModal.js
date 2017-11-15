import Button from './Button'
import Input from './Input'
import Label from './Label'
import Modal from 'rc-dialog'
import React from 'react'
import Select from './Select'
import Tag from './Tag'
import Upload from './Upload'
import 'rc-dialog/assets/index.css'

const style = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap'
  },
  insertTitle: {
    fontSize: '14px',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  sourceList: {
    margin: '10px 10px 10px 0',
    border: '1px dashed rgb(217, 217, 217)'
  },
  configTitle: {
    display: 'block',
    fontSize: '14px',
    margin: '10px 0',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  warnInfo: {
    display: 'inline-block',
    width: '100%',
    margin: '5px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#f04134'
  }
}

const linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i

class UploadModal extends React.Component {

  constructor() {
    super()
    this.updateCurrentSource = this.updateCurrentSource.bind(this)
    this.addSource = this.addSource.bind(this)
    this.removeSource = this.removeSource.bind(this)
    this.upload = this.upload.bind(this)
    this.insert = this.insert.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.changeConfig = this.changeConfig.bind(this)
    this.renderSourceList = this.renderSourceList.bind(this)
    this.renderVideoConfig = this.renderVideoConfig.bind(this)
    this.renderAudioConfig = this.renderAudioConfig.bind(this)
    this.state = {
      sources: [],
      currentSource: '',
      width: 400,
      height: 400,
      controls: 'true',
      autoplay: 'false',
      muted: 'false',
      loop: 'false',
      poster: '',
      name: '',
      author: '',
      errorMsg: '',
      errorMsgVisible: false
    }
  }

  updateCurrentSource(e) {
    this.setState({currentSource: e.target.value})
  }

  addSource() {
    let {sources, currentSource} = this.state
    let newsources = sources.concat([currentSource])
    if(linkRegx.test(currentSource) && sources.indexOf(currentSource) === -1) {
      this.setState({
        sources: newsources,
        currentSource: ''
      })
    }
  }

  removeSource(index) {
    let sourcesCopy = this.state.sources.concat([])
    sourcesCopy.splice(index, 1)
    this.setState({sources: sourcesCopy})
  }

  upload(e) {
    let props = this.props
    if (props.upload) {
      let promise = props.upload(e)
      if (!!promise && typeof promise.then == "function") {
        promise.then((url)=>{
          this.setState({currentSource: url})
        }).catch((msg) => {
          this.setState({errorMsg: msg, errorMsgVisible: true})
          setTimeout(() => {
            this.setState({errorMsg: '', errorMsgVisible: false})
          }, 4000)
        })
      }
    }
  }

  getFileType(fileUrl, mediaType) {
    let type = fileUrl.match(/\.(\w+)$/, 'i')
    return type ? type[1].toLowerCase() : mediaType === 'audio' ? 'mp3' : 'mp4'
  }

  insert() {
    let {sources, currentSource, width, height, controls, autoplay, muted, loop, poster, name, author} = this.state
    let {type} = this.props
    let dataExtra = JSON.stringify({"poster": poster, "name": name, "author": author})
    let len = sources.length
    let html = ''
    let attr = ''

    if (len > 0 ) {
      attr += controls === 'false' ? '' : ' controls="true" '
      attr += autoplay === 'false' ? '' : ' autoplay="true" '
      attr += loop === 'false' ? '' : ' loop="true" '
      if (type === 'audio') {
        if (len === 1) {
          html = `<audio src="${sources[0]}" ${attr} data-extra='${dataExtra}'></audio>`
        } else {
          html = `<audio ${attr} data-extra='${dataExtra}'>`
          sources.forEach(source => {
            html += `<source src=${source} type="audio/${this.getFileType(source, 'audio')}">`
          })
          html += `</audio>`
        }
      } else {
        attr += muted === 'false' ? '' : ' muted '
        if (len === 1) {
          html = `<video src="${sources[0]}" width="${width}" height="${height}" ${attr}></video>`
        } else {
          html = `<video width="${width}" height="${height}" ${attr}>`
          sources.forEach(source => {
            html += `<source src=${source} type="video/${this.getFileType(source, 'video')}"}>`
          })
          html += `</video>`
        }
      }

      this.props.insert(html)
      this.closeModal()
    }
  }

  closeModal() {
    this.props.closeModal()
  }

  changeConfig(e, type) {
    let value = e.target.value
    let boolType = ['controls', 'autoplay', 'muted', 'loop']
    if (type === 'width' || type === 'height') {
      if (isNaN(parseInt(value))) {
        value = parseInt(value)
      }
    } else if (boolType.indexOf(type) !== -1) {
      value = !!value
    }
    this.setState({[type]: value})
  }

  renderSourceList() {
    let {sources} = this.state
    if (sources.length > 0) {
      let list = sources.map((source, index) => {
        return <Tag value={source} key={source} index={index} onRemove={this.removeSource} />
      })
      return list
    } else {
      return <span style={style.warnInfo}>至少添加一个链接</span>
    }
  }

  renderVideoConfig() {
    let {width, height, controls, autoplay, muted, loop} = this.state
    return (
      <form style={style.paramsConfig}>
        <Label name="width">
          <Input type="number" defaultValue={width} onChange={(e) => { this.changeConfig(e, 'width') }} />
        </Label>
        <Label name="height">
          <Input type="number" defaultValue={height} onChange={(e) => { this.changeConfig(e, 'height') }} />
        </Label>
        <Label name="controls">
          <Select defaultValue={controls} onChange={(e) => { this.changeConfig(e, 'controls') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
        <Label name="autoplay">
          <Select defaultValue={autoplay} onChange={(e) => { this.changeConfig(e, 'autoplay') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
        <Label name="muted">
          <Select defaultValue={muted} onChange={(e) => { this.changeConfig(e, 'muted') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
        <Label name="loop">
          <Select defaultValue={loop} onChange={(e) => { this.changeConfig(e, 'loop') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
      </form>
    )
  }

  renderAudioConfig() {
    let {controls, autoplay, loop, poster, name, author} = this.state
    return (
      <form style={style.paramsConfig}>
        <Label name="controls">
          <Select defaultValue={controls} onChange={(e) => { this.changeConfig(e, 'controls') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
        <Label name="autoplay">
          <Select defaultValue={autoplay} onChange={(e) => { this.changeConfig(e, 'autoplay') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
        <Label name="loop">
          <Select defaultValue={loop} onChange={(e) => { this.changeConfig(e, 'loop') }}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
        </Label>
        <Label name="poster">
          <Input type="text" defaultValue={poster} onChange={(e) => { this.changeConfig(e, 'poster') }} />
        </Label>
        <Label name="name">
          <Input type="text" defaultValue={name} onChange={(e) => { this.changeConfig(e, 'name') }} />
        </Label>
        <Label name="author">
          <Input type="text" defaultValue={author} onChange={(e) => { this.changeConfig(e, 'author') }} />
        </Label>
      </form>
    )
  }

  render() {
    let {currentSource, sources, width, height, controls, autoplay, muted, loop, errorMsg, errorMsgVisible} = this.state
    let {type, title, visible, progress} = this.props

    return (
      <Modal
        title={title}
        onClose={this.closeModal}
        visible={visible}
        footer={[
          <Button key="close" onClick={this.closeModal}>取消</Button>,
          <Button key="insert" onClick={this.insert}>插入</Button>
        ]}
        animation="zome"
        maskAnimation="fade">
        <div>
          <div>
            <span style={style.insertTitle}>插入链接</span>
            <Input style={{width: '300px'}} type="text" value={currentSource} onChange={this.updateCurrentSource} />
            <Button onClick={this.addSource}>添加</Button>
            <Upload onChange={this.upload} />
          </div>
          <div>
            <span style={{...style.warnInfo, display: progress && progress !== -1 ? 'block' : 'none'}}>{progress}%</span>
            <span style={{...style.warnInfo, display: errorMsgVisible ? 'block' : 'none'}}>{errorMsg}</span>
          </div>
          <div style={style.sourceList}>
            {this.renderSourceList()}
          </div>
          <span style={style.configTitle}>参数配置</span>
          {type === 'audio' ? this.renderAudioConfig() : this.renderVideoConfig()}
          <div style={{textAlign: 'center', padding: '20px 10px 0 10px'}}>
            {
              type === 'audio' ?
              <audio src={currentSource} controls="controls" style={{width: '400px'}}>
                你的浏览器不支持 audio 标签
              </audio> :
              <video src={currentSource} controls="controls" style={{width: '400px', height: '250px', backgroundColor: '#000'}}>
                你的浏览器不支持 video 标签
              </video>
            }
          </div>
        </div>
      </Modal>
    )
  }
}

export default UploadModal