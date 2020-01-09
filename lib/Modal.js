"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcDialog = _interopRequireDefault(require("rc-dialog"));

var _reactRnd = require("react-rnd");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

require("rc-dialog/assets/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Modal =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Modal, _React$PureComponent);

  function Modal(props) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "closeModal", function () {
      console.log('closeModal------------------');
      _this.props.beforeClose && _this.props.beforeClose();

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function (e) {
      _this.props.onConfirm && _this.props.onConfirm();

      _this.closeModal();
    });

    _defineProperty(_assertThisInitialized(_this), "getRnd", function () {
      // const ref = self.rndRef.current
      var ref = document.getElementById('posView');
      console.log('ref------', ref);
      return ref;
    });

    _this.state = {
      rndWidth: '0',
      rndHeight: '0',
      rndXin: 400,
      rndYin: 100
    };
    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {// this.rndRef = React.createRef()
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          title = _this$props.title,
          visible = _this$props.visible,
          zIndex = _this$props.zIndex,
          alignStyle = _this$props.alignStyle;
      console.log('ref+++++', this.rndRef);
      var rndoptions = {
        position: {
          x: this.state.rndXin,
          y: this.state.rndYin
        },
        cancel: '.rc-dialog-body',
        onDragStop: function onDragStop(e, d) {
          // e.stopPropagation()
          _this2.setState({
            rndXin: d.x,
            rndYin: d.y
          });
        },
        onResizeStop: function onResizeStop(e, direction, ref, delta, position) {
          // console.log(ref);
          _this2.setState({
            rndWidth: ref.style.width,
            rndHeight: ref.style.height,
            rndXin: position.x,
            rndYin: position.y
          });
        }
      };
      return visible ? _react["default"].createElement(_reactRnd.Rnd, _extends({}, rndoptions, {
        className: "rndPos"
      }), _react["default"].createElement("div", {
        id: "posView",
        ref: this.rndRef
      }, _react["default"].createElement(_rcDialog["default"], {
        title: title,
        mask: false,
        forceRender: true,
        visible: visible,
        zIndex: zIndex,
        destroyOnClose: true,
        animation: "zome",
        maskAnimation: "fade",
        maskClosable: false,
        onClose: this.closeModal,
        getContainer: this.getRnd,
        footer: [_react["default"].createElement(_Button["default"], {
          key: "close",
          onClick: this.closeModal
        }, "\u53D6\u6D88"), _react["default"].createElement(_Button["default"], {
          key: "insert",
          onClick: this.onConfirm
        }, "\u786E\u8BA4")],
        style: alignStyle === 'middle' ? {
          top: '50%',
          transform: 'translateY(-50%)'
        } : {}
      }, this.props.component))) : false;
    }
  }]);

  return Modal;
}(_react["default"].PureComponent);

_defineProperty(Modal, "propTypes", {
  title: _propTypes["default"].string,
  visible: _propTypes["default"].bool,
  beforeClose: _propTypes["default"].func,
  onClose: _propTypes["default"].func,
  onConfirm: _propTypes["default"].func
});

_defineProperty(Modal, "defaultProps", {
  title: '',
  visible: false,
  zIndex: 1050,
  alignStyle: 'top',
  extendControls: [],
  debug: false
});

var _default = Modal;
exports["default"] = _default;