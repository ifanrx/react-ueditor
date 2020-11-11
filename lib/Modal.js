"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Button = _interopRequireDefault(require("./Button"));

var _rcDialog = _interopRequireDefault(require("rc-dialog"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

require("rc-dialog/assets/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Modal = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Modal, _React$PureComponent);

  var _super = _createSuper(Modal);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "closeModal", function () {
      _this.props.beforeClose && _this.props.beforeClose();

      _this.props.onClose();
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function () {
      // onConfirm 返回 false undefined 则关闭弹窗, 否则不关闭
      _this.props.onConfirm && !_this.props.onConfirm() && _this.closeModal();
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          visible = _this$props.visible,
          zIndex = _this$props.zIndex,
          alignStyle = _this$props.alignStyle;
      return /*#__PURE__*/_react["default"].createElement(_rcDialog["default"], {
        title: title,
        onClose: this.closeModal,
        visible: visible,
        footer: [/*#__PURE__*/_react["default"].createElement(_Button["default"], {
          key: "close",
          onClick: this.closeModal
        }, "\u53D6\u6D88"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
          key: "insert",
          onClick: this.onConfirm
        }, "\u786E\u8BA4")],
        animation: "zome",
        maskAnimation: "fade",
        zIndex: zIndex,
        style: alignStyle === 'middle' ? {
          top: '50%',
          transform: 'translateY(-50%)'
        } : {}
      }, this.props.component);
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