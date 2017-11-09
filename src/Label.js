import React from 'react'

let labelStyle = {
  display: 'block',
  marginRight: '20px',
  color: 'rgba(0, 0, 0, 0.65)',
  marginBottom: '10px'
}

class Label extends React.Component {
  render() {
    let {style, children} = this.props
    let mergedStyle = {...labelStyle, ...style}
    return <label style={mergedStyle}>{children}</label>
  }
}

export default Label