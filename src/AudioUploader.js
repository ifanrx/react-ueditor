import Button from './Button'
import Input from './Input'
import Label from './Label'
import React from 'react'
import Select from './Select'
import Tag from './Tag'
import Upload from './Upload'

const style = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap',
  },
  insertTitle: {
    fontSize: '14px',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)',
  },
  sourceList: {
    margin: '10px 10px 10px 0',
    border: '1px dashed rgb(217, 217, 217)',
    borderRadius: '4px',
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
    color: '#f04134',
  },
}

const linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9,_-](\?)?)*)*$/i

let timeoutInstance = null

class UploadModal extends React.PureComponent {
  state = {
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
    errorMsgVisible: false,
  }

  updateCurrentSource = e => {
    this.setState({currentSource: e.target.value})
  }

  addSource = () => {
    let {sources, currentSource} = this.state
    let newsources = sources.concat([currentSource])
    if (currentSource === '') {
      this.showErrorMsg('链接不能为空')
    } else if (!linkRegx.test(currentSource)) {
      this.showErrorMsg('非法的链接')
    } else if (sources.indexOf(currentSource) !== -1) {
      this.showErrorMsg('链接已存在')
    } else {
      this.setState({
        sources: newsources,
        currentSource: '',
      }, () => {
        this.props.onChange && this.props.onChange(this.generateHtml())
      })
    }
  }

  removeSource = index => {
    let sourcesCopy = this.state.sources.concat([])
    sourcesCopy.splice(index, 1)
    this.setState({sources: sourcesCopy})
  }

  upload = e => {
    let {upload} = this.props

    if (!upload) return

    upload(e).then(url => {
      this.setState({currentSource: url})
    }).catch(e => {
      e.constructor === Error ? this.showErrorMsg(e.message) : this.showErrorMsg(e)
    })
  }

  showErrorMsg = msg => {
    this.setState({errorMsg: msg, errorMsgVisible: true})
    clearTimeout(timeoutInstance)
    timeoutInstance = setTimeout(() => {
      this.setState({errorMsg: '', errorMsgVisible: false})
    }, 4000)
  }

  getFileType = (fileUrl, mediaType) => {
    let type = fileUrl.match(/\.(\w+)$/, 'i')
    return type ? type[1].toLowerCase() : 'mp3'
  }

  generateHtml = () => {
    let {sources, controls, autoplay, loop, poster, name, author} = this.state
    let dataExtra = JSON.stringify({'poster': poster, 'name': name, 'author': author})
    let len = sources.length

    if (len > 0) {
      let html = ''
      let attr = ''

      attr += controls === 'false' ? '' : ' controls="true" '
      attr += autoplay === 'false' ? '' : ' autoplay="true" '
      attr += loop === 'false' ? '' : ' loop="true" '

      if (len === 1) {
        html = `<audio src="${sources[0]}" ${attr} data-extra='${dataExtra}'>你的浏览器不支持 audio 标签</audio>`
      } else {
        html = `<audio ${attr} data-extra='${dataExtra}'>`
        sources.forEach(source => {
          html += `<source src=${source} type="audio/${this.getFileType(source, 'audio')}">`
        })
        html += '你的浏览器不支持 audio 标签</audio>'
      }

      return html + '<p></p>'
    }
  }

  closeModal = () => {
    this.props.closeModal()
  }

  changeConfig = (e, type) => {
    let value = e.target.value
    let boolType = ['controls', 'autoplay', 'muted', 'loop']
    if (type === 'width' || type === 'height') {
      if (isNaN(parseInt(value))) {
        value = parseInt(value)
      }
    } else if (boolType.indexOf(type) !== -1) {
      value = !!value
    }
    this.setState({[type]: value}, () => {
      this.props.onChange && this.props.onChange(this.generateHtml())
    })
  }

  renderSourceList = () => {
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

  renderAudioConfig = () => {
    let {controls, autoplay, loop, poster, name, author} = this.state
    return (
      <form style={style.paramsConfig}>
        <Label name='controls'>
          <Select defaultValue={controls} onChange={e => { this.changeConfig(e, 'controls') }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </Select>
        </Label>
        <Label name='autoplay'>
          <Select defaultValue={autoplay} onChange={e => { this.changeConfig(e, 'autoplay') }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </Select>
        </Label>
        <Label name='loop'>
          <Select defaultValue={loop} onChange={e => { this.changeConfig(e, 'loop') }}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </Select>
        </Label>
        <Label name='poster'>
          <Input type='text' defaultValue={poster} onChange={e => { this.changeConfig(e, 'poster') }} />
        </Label>
        <Label name='name'>
          <Input type='text' defaultValue={name} onChange={e => { this.changeConfig(e, 'name') }} />
        </Label>
        <Label name='author'>
          <Input type='text' defaultValue={author} onChange={e => { this.changeConfig(e, 'author') }} />
        </Label>
      </form>
    )
  }

  render() {
    let {currentSource, errorMsg, errorMsgVisible} = this.state
    let {progress} = this.props

    return (
      <div>
        <div>
          <span style={style.insertTitle}>插入链接</span>
          <Input style={{width: '300px'}} type='text' value={currentSource} onChange={this.updateCurrentSource} />
          <Button onClick={this.addSource}>添加</Button>
          <Upload onChange={this.upload} />
        </div>
        <div>
          <span style={{...style.warnInfo, display: progress && progress !== -1 ? 'block' : 'none'}}>
            {progress}%
          </span>
          <span style={{...style.warnInfo, display: errorMsgVisible ? 'block' : 'none'}}>{errorMsg}</span>
        </div>
        <div style={style.sourceList}>
          {this.renderSourceList()}
        </div>
        <span style={style.configTitle}>参数配置</span>
        {this.renderAudioConfig()}
        <div style={{textAlign: 'center', padding: '20px 10px 0 10px'}}>
          {
            <audio src={currentSource} controls='controls' style={{width: '400px'}}>
              你的浏览器不支持 audio 标签
            </audio>
          }
        </div>
      </div>
    )
  }
}

export default UploadModal
