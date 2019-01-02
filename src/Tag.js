import React from 'react'

const tagStyle = {
  wrapper: {
    display: 'inline-block',
    lineHeight: '22px',
    height: '22px',
    padding: '0 0 0 8px',
    borderRadius: '4px',
    border: '1px solid #e9e9e9',
    backgroundColor: '#f3f3f3',
    fontSize: '13px',
    color: 'rgba(0, 0, 0, 0.65)',
    margin: '5px',
  },
  text: {
    display: 'inline-block',
    maxWidth: '500px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    display: 'inline-block',
    width: '25px',
    textAlign: 'center',
    float: 'right',
    cursor: 'pointer',
  },
}

class Tag extends React.PureComponent {
  render() {
    let {value, index, onRemove, style, key} = this.props
    let mergedStyle = {...tagStyle.wrapper, ...style}
    return (
      <span style={mergedStyle} key={key}>
        <span style={tagStyle.text}>{value}</span>
        <i style={tagStyle.icon} onClick={() => { onRemove(index) }}>×</i>
      </span>
    )
  }
}

export default Tag
