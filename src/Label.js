import React from 'react'

const labelStyle = {
  display: 'block',
  width: '165px',
  color: 'rgba(0, 0, 0, 0.65)',
  marginRight: '20px',
  marginBottom: '10px',
}

const labelName = {
  display: 'inline-block',
  width: '50px',
}

class Label extends React.PureComponent {
  render() {
    let {style, children, name} = this.props
    let mergedStyle = {...labelStyle, ...style}
    return <label style={mergedStyle}><span style={labelName}>{name}</span>{children}</label>
  }
}

export default Label
