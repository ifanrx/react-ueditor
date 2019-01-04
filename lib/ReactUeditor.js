"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _UploadModal = _interopRequireDefault(require("./UploadModal"));

var _Link = _interopRequireDefault(require("./Link"));

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

var simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy' + '23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNi' + 'TAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxU' + 'QKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/Uewdg' + 'Ku4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6a' + 'wOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hO' + 'ojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj' + '3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg==';
var uploadAudio = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBUlEQVRYR+1VwXHbMBC8' + 'qyBxBXI6cCqwUkEOFUSuIHYFliuwUoGVCrAdWOlA6UCuIOpgPashNRQIOtJkHH2ID2eIA25vD7vndublZ85vI4CRgZGBkxmIiI9mdm9mMzNb' + 'AHgYknJEzM3sA4C7oZiTAEREmNmTuwvEi5lNSH4GsK4liIiFu38nuQRwU4s5CkBTtRILwAvJWzPbuvszyS8AVhFxZWbXAH50E0XE0t2/kbwB' + 'sCxBVAFExKW7TxRMUhfPVTVJXT4HsI2IaQHg1t0fFQNAAPcrpbQhqVZc/BWAaHb3XASq6pkqbf+XAPQ/pQQz+9qy0omdufsTyQRAMfvVYyCl' + 'pCSXLc1N5FpVF9QeMKA9tcrd/5D8CUCPdLc6/3vsDAGwnPP0rUFVY6BhYUVyAuBT0QYVsC7vfQ8AuzbknA/ubpjtFfYeANTCq5yzpNp9iJLq' + '9n8wIKpXOWdJtguA5dvQZpUB9dDdd1pXEMnfRz5CyfW+1HyrrJoX9ADUZEhyY2YykkEZds79KmnuyPOiLGTIiNQ/GZCWTGkhTyep78OAEck/' + 'Zo1f7CXbUUtPgtUW1KTX6Fg2KpPR5fL1AyseONfODhnZtKz+aAAdQ1GVYkFDaOPuMqzBYdRITxZeTX4ygNbVmtkgujWONXKrqxliVqu8PXDU' + 'NHzLEf91bwQwMjAycHYGXgGLbI8w70amwwAAAABJRU5ErkJggg==';

var ReactUeditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactUeditor, _React$Component);

  function ReactUeditor(props) {
    var _this;

    _classCallCheck(this, ReactUeditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactUeditor).call(this));
    _this.state = {
      videoModalVisible: false,
      audioModalVisible: false,
      linkModalVisible: false,
      videoSource: '',
      audioSource: ''
    };

    _this.createScript = function (url) {
      var scriptTags = window.document.querySelectorAll('script');
      var len = scriptTags.length;
      var i = 0;

      var _url = window.location.origin + url;

      return new Promise(function (resolve, reject) {
        for (i = 0; i < len; i++) {
          var src = scriptTags[i].src;

          if (src && src === _url) {
            scriptTags[i].parentElement.removeChild(scriptTags[i]);
          }
        }

        var node = document.createElement('script');
        node.src = url;
        node.onload = resolve;
        document.body.appendChild(node);
      });
    };

    _this.registerImageUpload = function () {
      window.UE.registerUI('imageUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '文件上传',
          cssRules: 'background-position: -726px -77px;',
          onclick: function onclick() {
            editor._react_ref.tempfileInput.click();
          }
        });
        return btn;
      });
    };

    _this.registerUploadVideo = function () {
      window.UE.registerUI('videoUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '上传视频',
          cssRules: 'background-position: -320px -20px;',
          onclick: function onclick() {
            editor._react_ref.setState({
              videoModalVisible: true
            });
          }
        });
        return btn;
      });
    };

    _this.registerUploadAudio = function () {
      window.UE.registerUI('audioUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '上传音频',
          cssRules: 'background: url(' + uploadAudio + ') !important; background-size: 20px 20px !important;',
          onclick: function onclick() {
            editor._react_ref.setState({
              audioModalVisible: true
            });
          }
        });
        return btn;
      });
    };

    _this.registerLink = function () {
      window.UE.registerUI('insertLink', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '超链接',
          cssRules: 'background-position: -504px 0px;',
          onclick: function onclick() {
            editor._react_ref.setState({
              linkModalVisible: true
            });
          }
        });
        return btn;
      });
    };

    _this.uploadImage = function (e) {
      var uploadImage = _this.props.uploadImage;

      if (uploadImage) {
        var promise = uploadImage(e);

        if (!!promise && typeof promise.then == 'function') {
          promise.then(function (imageUrl) {
            if (imageUrl instanceof Array) {
              imageUrl.forEach(function (url) {
                _this.insertImage(url);
              });
            } else {
              _this.insertImage(imageUrl);
            }
          });
        }
      }

      _this.tempfileInput.value = '';
    };

    _this.insertImage = function (imageUrl) {
      if (_this.ueditor) {
        _this.ueditor.focus();

        _this.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />');
      }
    };

    _this.insert = function (html) {
      if (_this.ueditor) {
        _this.ueditor.execCommand('insertparagraph');

        _this.ueditor.execCommand('inserthtml', html, true);

        _this.ueditor.execCommand('insertparagraph');

        _this.ueditor.execCommand('insertparagraph');
      }
    };

    _this.insertLink = function (html) {
      if (_this.ueditor) {
        _this.ueditor.execCommand('inserthtml', html, true);
      }
    };

    _this.closeModal = function (type) {
      switch (type) {
        case 'video':
          _this.setState({
            videoModalVisible: false
          });

          break;

        case 'audio':
          _this.setState({
            audioModalVisible: false
          });

          break;

        case 'link':
          _this.setState({
            linkModalVisible: false
          });

          break;
      }
    };

    _this.initEditor = function () {
      var _this$props = _this.props,
          config = _this$props.config,
          plugins = _this$props.plugins,
          onChange = _this$props.onChange,
          value = _this$props.value,
          getRef = _this$props.getRef,
          onReady = _this$props.onReady;
      _this.ueditor = config ? window.UE.getEditor(_this.containerID, config) : window.UE.getEditor(_this.containerID);
      _this.ueditor._react_ref = _assertThisInitialized(_assertThisInitialized(_this));

      if (plugins && plugins instanceof Array && plugins.length > 0) {
        if (plugins.indexOf('uploadImage') !== -1) _this.registerImageUpload();
        if (plugins.indexOf('insertCode') !== -1) _this.registerSimpleInsertCode();
        if (plugins.indexOf('uploadVideo') !== -1) _this.registerUploadVideo();
        if (plugins.indexOf('uploadAudio') !== -1) _this.registerUploadAudio();
        if (plugins.indexOf('insertLink') !== -1) _this.registerLink();
      }

      getRef && getRef(_this.ueditor);

      _this.ueditor.ready(function () {
        _this.ueditor.addListener('contentChange', function () {
          // 由 componentWillReceiveProps 导致的 contentChange 不需要通知父组件
          if (_this.isContentChangedByWillReceiveProps) {
            _this.isContentChangedByWillReceiveProps = false;
          } else {
            _this.content = _this.ueditor.getContent();
            onChange && onChange(_this.ueditor.getContent());
          }
        });

        if (_this.isContentChangedByWillReceiveProps) {
          _this.isContentChangedByWillReceiveProps = false;

          _this.ueditor.setContent(_this.content);
        } else {
          _this.ueditor.setContent(value);
        }

        onReady && onReady();
      });
    };

    _this.content = props.value || ''; // 存储编辑器的实时数据，用于传递给父组件

    _this.ueditor = null;
    _this.isContentChangedByWillReceiveProps = false;
    _this.tempfileInput = null;
    _this.containerID = 'reactueditor' + Math.random().toString(36);
    _this.fileInputID = 'fileinput' + Math.random().toString(36);
    return _this;
  }

  _createClass(ReactUeditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var ueditorPath = this.props.ueditorPath;

      if (!window.UE && !window.UE_LOADING_PROMISE) {
        window.UE_LOADING_PROMISE = this.createScript(ueditorPath + '/ueditor.config.js').then(function () {
          return _this2.createScript(ueditorPath + '/ueditor.all.min.js');
        });
      }

      window.UE_LOADING_PROMISE.then(function () {
        _this2.tempfileInput = document.getElementById(_this2.fileInputID);

        _this2.initEditor();
      });
    }
    /**
     * 这里存在两种情况会改变编辑器的内容：
     * 1. 父组件初始化传递的 value。父组件 value 的获取是异步的，因此会触发一次 componentWillReceiveProps，这种情况不需要将更新再通知父组件
     * 2. 用户对编辑器进行编辑
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      if ('value' in nextProps && this.props.value !== nextProps.value) {
        this.isContentChangedByWillReceiveProps = true;
        this.content = nextProps.value;

        if (this.ueditor) {
          this.ueditor.ready(function () {
            _this3.ueditor.setContent(nextProps.value);
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.ueditor) {
        this.ueditor.destroy();
      }
    }
  }, {
    key: "registerSimpleInsertCode",
    value: function registerSimpleInsertCode() {
      window.UE.registerUI('simpleInsertCode', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '插入代码',
          cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
          onclick: function onclick() {
            if (editor) {
              editor.focus();
              editor.execCommand('insertcode');
            }
          }
        });
        return btn;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          videoModalVisible = _this$state.videoModalVisible,
          audioModalVisible = _this$state.audioModalVisible,
          linkModalVisible = _this$state.linkModalVisible;
      var _this$props2 = this.props,
          uploadVideo = _this$props2.uploadVideo,
          uploadAudio = _this$props2.uploadAudio,
          multipleImagesUpload = _this$props2.multipleImagesUpload,
          progress = _this$props2.progress;
      return _react.default.createElement("div", null, _react.default.createElement("script", {
        id: this.containerID,
        name: this.containerID,
        type: "text/plain"
      }), _react.default.createElement("input", {
        type: "file",
        id: this.fileInputID,
        onChange: this.uploadImage,
        style: {
          visibility: 'hidden'
        },
        multiple: multipleImagesUpload
      }), _react.default.createElement(_UploadModal.default, {
        type: "video",
        title: "\u4E0A\u4F20\u89C6\u9891",
        visible: videoModalVisible,
        closeModal: function closeModal() {
          _this4.closeModal('video');
        },
        insert: this.insert,
        upload: uploadVideo,
        progress: progress
      }), _react.default.createElement(_UploadModal.default, {
        type: "audio",
        title: "\u4E0A\u4F20\u97F3\u9891",
        visible: audioModalVisible,
        closeModal: function closeModal() {
          _this4.closeModal('audio');
        },
        insert: this.insert,
        upload: uploadAudio,
        progress: progress
      }), _react.default.createElement(_Link.default, {
        visible: linkModalVisible,
        closeModal: function closeModal() {
          _this4.closeModal('link');
        },
        insert: this.insertLink
      }));
    }
  }]);

  return ReactUeditor;
}(_react.default.Component);

ReactUeditor.propTypes = {
  value: _propTypes.default.string,
  ueditorPath: _propTypes.default.string.isRequired,
  plugins: _propTypes.default.array,
  onChange: _propTypes.default.func,
  uploadImage: _propTypes.default.func,
  getRef: _propTypes.default.func,
  multipleImagesUpload: _propTypes.default.bool,
  onReady: _propTypes.default.func
};
ReactUeditor.defaultProps = {
  multipleImagesUpload: false
};
var _default = ReactUeditor;
exports.default = _default;