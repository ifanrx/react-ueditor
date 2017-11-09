import React from 'react'

const labelStyle = {
  height: '28px',
  width: '80px',
  display: 'inline-block',
  lineHeight: '28px',
  textAlign: 'center',
  backgroundColor: '#fff',
  borderRadius: '3px',
  border: '1px solid #d9d9d9',
  fontSize: '12px',
  fontWeight: '500',
  color: 'rgba(0,0,0,.65)',
  cursor: 'pointer',
}

class UploadVideoModal extends React.Component {

  constructor() {
    super()
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange (e) {
    console.dir(e.target)
    let props = this.props
    if (props.onChange) {
      props.onChange(e)
    }
    e.target.value = ''
  }

  render() {
    return (
      <label style={labelStyle}>直接上传
        <input type="file" onChange={this.onInputChange} style={{display: 'none'}} />
      </label>
    )
  }
}

export default UploadVideoModal