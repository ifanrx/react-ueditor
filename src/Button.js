import React from 'react'

let buttonStyle = {
  height: '24px',
  fontWeight: '500',
  cursor: 'pointer',
  padding: '0 15px',
  fontSize: '12px',
  color: 'rgba(0,0,0,.65)',
  border: '1px solid #d9d9d9',
  marginLeft: '10px'
}

class Button extends React.Component {
  render() {
    let {style, children, key, onClick} = this.props
    let mergedStyle = {...buttonStyle, ...style}
    return <button style={mergedStyle} key={key} onClick={onClick}>{children}</button>
  }
}

export default Button