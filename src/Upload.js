import React from 'react'

const uploadStyle = {
  height: '26px',
  width: '80px',
  display: 'inline-block',
  boxSizing: 'border-box',
  lineHeight: '25px',
  textAlign: 'center',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '12px',
  fontWeight: '500',
  color: '#fff',
  backgroundColor: '#108ee9',
  cursor: 'pointer',
  marginLeft: '10px',
}

class Upload extends React.PureComponent {
  onInputChange = e => {
    let props = this.props
    if (props.onChange) {
      props.onChange(e)
    }
    e.target.value = ''
  }

  render() {
    return (
      <label style={uploadStyle}>直接上传
        <input type='file' onChange={this.onInputChange} style={{display: 'none'}} />
      </label>
    )
  }
}

export default Upload
