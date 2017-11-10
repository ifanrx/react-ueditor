'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var labelStyle = {
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
  cursor: 'pointer'
};

var UploadVideoModal = function (_React$Component) {
  _inherits(UploadVideoModal, _React$Component);

  function UploadVideoModal() {
    _classCallCheck(this, UploadVideoModal);

    var _this = _possibleConstructorReturn(this, (UploadVideoModal.__proto__ || Object.getPrototypeOf(UploadVideoModal)).call(this));

    _this.onInputChange = _this.onInputChange.bind(_this);
    return _this;
  }

  _createClass(UploadVideoModal, [{
    key: 'onInputChange',
    value: function onInputChange(e) {
      console.dir(e.target);
      var props = this.props;
      if (props.onChange) {
        props.onChange(e);
      }
      e.target.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'label',
        { style: labelStyle },
        '\u76F4\u63A5\u4E0A\u4F20',
        _react2.default.createElement('input', { type: 'file', onChange: this.onInputChange, style: { display: 'none' } })
      );
    }
  }]);

  return UploadVideoModal;
}(_react2.default.Component);

exports.default = UploadVideoModal;