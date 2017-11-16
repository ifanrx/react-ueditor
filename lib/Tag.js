'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tagStyle = {
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
    margin: '5px'
  },
  text: {
    display: 'inline-block',
    maxWidth: '500px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  icon: {
    display: 'inline-block',
    width: '25px',
    textAlign: 'center',
    float: 'right',
    cursor: 'pointer'
  }
};

var Tag = function (_React$Component) {
  _inherits(Tag, _React$Component);

  function Tag() {
    _classCallCheck(this, Tag);

    return _possibleConstructorReturn(this, (Tag.__proto__ || Object.getPrototypeOf(Tag)).apply(this, arguments));
  }

  _createClass(Tag, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          index = _props.index,
          onRemove = _props.onRemove,
          style = _props.style,
          key = _props.key;

      var mergedStyle = _extends({}, tagStyle.wrapper, style);
      return _react2.default.createElement(
        'span',
        { style: mergedStyle, key: key },
        _react2.default.createElement(
          'span',
          { style: tagStyle.text },
          value
        ),
        _react2.default.createElement(
          'i',
          { style: tagStyle.icon, onClick: function onClick() {
              onRemove(index);
            } },
          '\xD7'
        )
      );
    }
  }]);

  return Tag;
}(_react2.default.Component);

exports.default = Tag;