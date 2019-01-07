import React from 'react'

const inputStyle = {
  height: '18px',
  width: '72px',
  boxSizing: 'content-box',
  fontSize: '12px',
  lineHeight: '18px',
  color: 'rgba(0,0,0,.65)',
  backgroundColor: '#fff',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  padding: '1px 3px',
  margin: '0 10px',
}

class Input extends React.PureComponent {
  render() {
    let {type, value, onChange, style} = this.props
    let mergedStyle = {...inputStyle, ...style}
    return <input style={mergedStyle} type={type} value={value} onChange={onChange} />
  }
}

export default Input
