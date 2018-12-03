"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Button = _interopRequireDefault(require("./Button"));

var _Input = _interopRequireDefault(require("./Input"));

var _Label = _interopRequireDefault(require("./Label"));

var _rcDialog = _interopRequireDefault(require("rc-dialog"));

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("./Select"));

var _Tag = _interopRequireDefault(require("./Tag"));

var _Upload = _interopRequireDefault(require("./Upload"));

require("rc-dialog/assets/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var style = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap'
  },
  insertTitle: {
    fontSize: '14px',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  sourceList: {
    margin: '10px 10px 10px 0',
    border: '1px dashed rgb(217, 217, 217)',
    borderRadius: '4px'
  },
  configTitle: {
    display: 'block',
    fontSize: '14px',
    margin: '10px 0',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  warnInfo: {
    display: 'inline-block',
    width: '100%',
    margin: '5px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#f04134'
  }
};
var linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
var timeoutInstance = null;

var UploadModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(UploadModal, _React$Component);

  function UploadModal() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, UploadModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UploadModal)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      sources: [],
      currentSource: '',
      width: 400,
      height: 400,
      controls: 'true',
      autoplay: 'false',
      muted: 'false',
      loop: 'false',
      poster: '',
      name: '',
      author: '',
      errorMsg: '',
      errorMsgVisible: false
    }, _this.updateCurrentSource = function (e) {
      _this.setState({
        currentSource: e.target.value
      });
    }, _this.addSource = function () {
      var _this$state = _this.state,
          sources = _this$state.sources,
          currentSource = _this$state.currentSource;
      var newsources = sources.concat([currentSource]);

      if (currentSource === '') {
        _this.showErrorMsg('链接不能为空');
      } else if (!linkRegx.test(currentSource)) {
        _this.showErrorMsg('非法的链接');
      } else if (sources.indexOf(currentSource) !== -1) {
        _this.showErrorMsg('链接已存在');
      } else {
        _this.setState({
          sources: newsources,
          currentSource: ''
        });
      }
    }, _this.removeSource = function (index) {
      var sourcesCopy = _this.state.sources.concat([]);

      sourcesCopy.splice(index, 1);

      _this.setState({
        sources: sourcesCopy
      });
    }, _this.upload = function (e) {
      var upload = _this.props.upload;
      if (!upload) return;
      upload(e).then(function (url) {
        _this.setState({
          currentSource: url
        });
      }).catch(function (e) {
        e.constructor === Error ? _this.showErrorMsg(e.message) : _this.showErrorMsg(e);
      });
    }, _this.showErrorMsg = function (msg) {
      _this.setState({
        errorMsg: msg,
        errorMsgVisible: true
      });

      clearTimeout(timeoutInstance);
      timeoutInstance = setTimeout(function () {
        _this.setState({
          errorMsg: '',
          errorMsgVisible: false
        });
      }, 4000);
    }, _this.getFileType = function (fileUrl, mediaType) {
      var type = fileUrl.match(/\.(\w+)$/, 'i');
      return type ? type[1].toLowerCase() : mediaType === 'audio' ? 'mp3' : 'mp4';
    }, _this.insert = function () {
      var _this$state2 = _this.state,
          sources = _this$state2.sources,
          width = _this$state2.width,
          height = _this$state2.height,
          controls = _this$state2.controls,
          autoplay = _this$state2.autoplay,
          muted = _this$state2.muted,
          loop = _this$state2.loop,
          poster = _this$state2.poster,
          name = _this$state2.name,
          author = _this$state2.author;
      var type = _this.props.type;
      var dataExtra = JSON.stringify({
        'poster': poster,
        'name': name,
        'author': author
      });
      var len = sources.length;

      if (len > 0) {
        var html = '';
        var attr = '';
        attr += controls === 'false' ? '' : ' controls="true" ';
        attr += autoplay === 'false' ? '' : ' autoplay="true" ';
        attr += loop === 'false' ? '' : ' loop="true" ';

        if (type === 'audio') {
          if (len === 1) {
            html = "<audio src=\"".concat(sources[0], "\" ").concat(attr, " data-extra='").concat(dataExtra, "'>\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 audio \u6807\u7B7E</audio>");
          } else {
            html = "<audio ".concat(attr, " data-extra='").concat(dataExtra, "'>");
            sources.forEach(function (source) {
              html += "<source src=".concat(source, " type=\"audio/").concat(_this.getFileType(source, 'audio'), "\">");
            });
            html += '你的浏览器不支持 audio 标签</audio>';
          }
        } else {
          attr += muted === 'false' ? '' : ' muted ';

          if (len === 1) {
            html = "<video src=\"".concat(sources[0], "\" width=\"").concat(width, "\" height=\"").concat(height, "\" ").concat(attr, ">\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E</video>");
          } else {
            html = "<video width=\"".concat(width, "\" height=\"").concat(height, "\" ").concat(attr, ">");
            sources.forEach(function (source) {
              html += "<source src=".concat(source, " type=\"video/").concat(_this.getFileType(source, 'video'), "\"}>");
            });
            html += '你的浏览器不支持 video 标签</video>';
          }
        } // 修复在 Safari 浏览器中，插入视频后，由于没有在视频后面添加一个 p 标签，
        // 导致视频无法删除，无法将光标移动到视频后面的 bug


        _this.props.insert(html + '<p></p>');

        _this.closeModal();
      }
    }, _this.closeModal = function () {
      _this.props.closeModal();
    }, _this.changeConfig = function (e, type) {
      var value = e.target.value;
      var boolType = ['controls', 'autoplay', 'muted', 'loop'];

      if (type === 'width' || type === 'height') {
        if (isNaN(parseInt(value))) {
          value = parseInt(value);
        }
      } else if (boolType.indexOf(type) !== -1) {
        value = !!value;
      }

      _this.setState(_defineProperty({}, type, value));
    }, _this.renderSourceList = function () {
      var sources = _this.state.sources;

      if (sources.length > 0) {
        var list = sources.map(function (source, index) {
          return _react.default.createElement(_Tag.default, {
            value: source,
            key: source,
            index: index,
            onRemove: _this.removeSource
          });
        });
        return list;
      } else {
        return _react.default.createElement("span", {
          style: style.warnInfo
        }, "\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u94FE\u63A5");
      }
    }, _this.renderVideoConfig = function () {
      var _this$state3 = _this.state,
          width = _this$state3.width,
          height = _this$state3.height,
          controls = _this$state3.controls,
          autoplay = _this$state3.autoplay,
          muted = _this$state3.muted,
          loop = _this$state3.loop;
      return _react.default.createElement("form", {
        style: style.paramsConfig
      }, _react.default.createElement(_Label.default, {
        name: "width"
      }, _react.default.createElement(_Input.default, {
        type: "number",
        defaultValue: width,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'width');
        }
      })), _react.default.createElement(_Label.default, {
        name: "height"
      }, _react.default.createElement(_Input.default, {
        type: "number",
        defaultValue: height,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'height');
        }
      })), _react.default.createElement(_Label.default, {
        name: "controls"
      }, _react.default.createElement(_Select.default, {
        defaultValue: controls,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'controls');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))), _react.default.createElement(_Label.default, {
        name: "autoplay"
      }, _react.default.createElement(_Select.default, {
        defaultValue: autoplay,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'autoplay');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))), _react.default.createElement(_Label.default, {
        name: "muted"
      }, _react.default.createElement(_Select.default, {
        defaultValue: muted,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'muted');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))), _react.default.createElement(_Label.default, {
        name: "loop"
      }, _react.default.createElement(_Select.default, {
        defaultValue: loop,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'loop');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))));
    }, _this.renderAudioConfig = function () {
      var _this$state4 = _this.state,
          controls = _this$state4.controls,
          autoplay = _this$state4.autoplay,
          loop = _this$state4.loop,
          poster = _this$state4.poster,
          name = _this$state4.name,
          author = _this$state4.author;
      return _react.default.createElement("form", {
        style: style.paramsConfig
      }, _react.default.createElement(_Label.default, {
        name: "controls"
      }, _react.default.createElement(_Select.default, {
        defaultValue: controls,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'controls');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))), _react.default.createElement(_Label.default, {
        name: "autoplay"
      }, _react.default.createElement(_Select.default, {
        defaultValue: autoplay,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'autoplay');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))), _react.default.createElement(_Label.default, {
        name: "loop"
      }, _react.default.createElement(_Select.default, {
        defaultValue: loop,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'loop');
        }
      }, _react.default.createElement("option", {
        value: "true"
      }, "true"), _react.default.createElement("option", {
        value: "false"
      }, "false"))), _react.default.createElement(_Label.default, {
        name: "poster"
      }, _react.default.createElement(_Input.default, {
        type: "text",
        defaultValue: poster,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'poster');
        }
      })), _react.default.createElement(_Label.default, {
        name: "name"
      }, _react.default.createElement(_Input.default, {
        type: "text",
        defaultValue: name,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'name');
        }
      })), _react.default.createElement(_Label.default, {
        name: "author"
      }, _react.default.createElement(_Input.default, {
        type: "text",
        defaultValue: author,
        onChange: function onChange(e) {
          _this.changeConfig(e, 'author');
        }
      })));
    }, _temp));
  }

  _createClass(UploadModal, [{
    key: "render",
    value: function render() {
      var _this$state5 = this.state,
          currentSource = _this$state5.currentSource,
          errorMsg = _this$state5.errorMsg,
          errorMsgVisible = _this$state5.errorMsgVisible;
      var _this$props = this.props,
          type = _this$props.type,
          title = _this$props.title,
          visible = _this$props.visible,
          progress = _this$props.progress;
      return _react.default.createElement(_rcDialog.default, {
        title: title,
        onClose: this.closeModal,
        visible: visible,
        footer: [_react.default.createElement(_Button.default, {
          key: "close",
          onClick: this.closeModal
        }, "\u53D6\u6D88"), _react.default.createElement(_Button.default, {
          key: "insert",
          onClick: this.insert
        }, "\u63D2\u5165")],
        animation: "zome",
        maskAnimation: "fade"
      }, _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("span", {
        style: style.insertTitle
      }, "\u63D2\u5165\u94FE\u63A5"), _react.default.createElement(_Input.default, {
        style: {
          width: '300px'
        },
        type: "text",
        value: currentSource,
        onChange: this.updateCurrentSource
      }), _react.default.createElement(_Button.default, {
        onClick: this.addSource
      }, "\u6DFB\u52A0"), _react.default.createElement(_Upload.default, {
        onChange: this.upload
      })), _react.default.createElement("div", null, _react.default.createElement("span", {
        style: _objectSpread({}, style.warnInfo, {
          display: progress && progress !== -1 ? 'block' : 'none'
        })
      }, progress, "%"), _react.default.createElement("span", {
        style: _objectSpread({}, style.warnInfo, {
          display: errorMsgVisible ? 'block' : 'none'
        })
      }, errorMsg)), _react.default.createElement("div", {
        style: style.sourceList
      }, this.renderSourceList()), _react.default.createElement("span", {
        style: style.configTitle
      }, "\u53C2\u6570\u914D\u7F6E"), type === 'audio' ? this.renderAudioConfig() : this.renderVideoConfig(), _react.default.createElement("div", {
        style: {
          textAlign: 'center',
          padding: '20px 10px 0 10px'
        }
      }, type === 'audio' ? _react.default.createElement("audio", {
        src: currentSource,
        controls: "controls",
        style: {
          width: '400px'
        }
      }, "\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 audio \u6807\u7B7E") : _react.default.createElement("video", {
        src: currentSource,
        controls: "controls",
        style: {
          width: '400px',
          height: '250px',
          backgroundColor: '#000'
        }
      }, "\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E"))));
    }
  }]);

  return UploadModal;
}(_react.default.Component);

var _default = UploadModal;
exports.default = _default;