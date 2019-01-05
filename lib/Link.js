"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("./Button"));

var _Input = _interopRequireDefault(require("./Input"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputStyle = {
  width: '300px'
};
var spanStyle = {
  fontSize: '14px',
  color: 'rgba(0, 0, 0, 0.65)',
  display: 'inline-block',
  width: '80px'
};
var formItmeStyle = {
  marginBottom: '10px'
};

var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Link)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      text: '',
      link: '',
      title: '',
      newTab: false,
      showTips: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasProtocol", function (link) {
      if (link.match(/^http:|https:/) || link.match(/^\/\//)) {
        return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "generateHtml", function () {
      var _this$state = _this.state,
          text = _this$state.text,
          link = _this$state.link,
          title = _this$state.title,
          newTab = _this$state.newTab;

      if (link) {
        var html = '';

        if (!_this.hasProtocol(link)) {
          link = 'http://' + link;
        }

        html += "<a href=\"".concat(link, "\" target=").concat(newTab ? '_blank' : '_self', " title=\"").concat(title, "\">").concat(text || link, "</a>");
        return html;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeConfig", function (e, type) {
      var value = e.target.value;
      var boolType = ['newTab'];

      if (boolType.indexOf(type) !== -1) {
        value = !!value;
      }

      if (type == 'link') {
        if (!_this.hasProtocol(value)) {
          _this.setState({
            showTips: true
          });
        } else {
          _this.setState({
            showTips: false
          });
        }
      }

      if (type == 'newTab') {
        return _this.setState({
          newTab: !_this.state.newTab
        });
      }

      _this.setState(_defineProperty({}, type, value), function () {
        _this.props.onChange && _this.props.onChange(_this.generateHtml());
      });
    });

    return _this;
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          text = _this$state2.text,
          link = _this$state2.link,
          title = _this$state2.title,
          newTab = _this$state2.newTab,
          showTips = _this$state2.showTips;
      return _react.default.createElement("form", null, _react.default.createElement("div", {
        style: formItmeStyle
      }, _react.default.createElement("span", {
        style: spanStyle
      }, "\u6587\u672C\u5185\u5BB9\uFF1A"), _react.default.createElement(_Input.default, {
        type: "text",
        style: inputStyle,
        value: text,
        onChange: function onChange(e) {
          return _this2.changeConfig(e, 'text');
        }
      })), _react.default.createElement("div", {
        style: formItmeStyle
      }, _react.default.createElement("span", {
        style: spanStyle
      }, "\u94FE\u63A5\u5730\u5740\uFF1A"), _react.default.createElement(_Input.default, {
        type: "text",
        style: inputStyle,
        value: link,
        onChange: function onChange(e) {
          return _this2.changeConfig(e, 'link');
        }
      })), _react.default.createElement("div", {
        style: formItmeStyle
      }, _react.default.createElement("span", {
        style: spanStyle
      }, "\u6807\u9898\uFF1A"), _react.default.createElement(_Input.default, {
        type: "text",
        style: inputStyle,
        value: title,
        onChange: function onChange(e) {
          return _this2.changeConfig(e, 'title');
        }
      })), _react.default.createElement("div", {
        style: formItmeStyle
      }, _react.default.createElement("span", {
        style: {
          color: 'rgba(0, 0, 0, 0.65)',
          fontSize: '14px'
        }
      }, "\u662F\u5426\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF1A"), _react.default.createElement("input", {
        type: "checkbox",
        checked: newTab,
        onChange: function onChange(e) {
          return _this2.changeConfig(e, 'newTab');
        }
      })), showTips && _react.default.createElement("p", {
        style: {
          fontSize: '14px',
          color: 'red'
        }
      }, "\u60A8\u8F93\u5165\u7684\u8D85\u94FE\u63A5\u4E2D\u4E0D\u5305\u542Bhttp\u7B49\u534F\u8BAE\u540D\u79F0\uFF0C\u9ED8\u8BA4\u5C06\u4E3A\u60A8\u6DFB\u52A0http://\u524D\u7F00"));
    }
  }]);

  return Link;
}(_react.default.Component);

var _default = Link;
exports.default = _default;