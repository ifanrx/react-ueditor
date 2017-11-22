'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UploadModal = require('./UploadModal');

var _UploadModal2 = _interopRequireDefault(_UploadModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy' + '23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNi' + 'TAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxU' + 'QKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/Uewdg' + 'Ku4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6a' + 'wOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hO' + 'ojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj' + '3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg==';
var uploadAudio = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBUlEQVRYR+1VwXHbMBC8' + 'qyBxBXI6cCqwUkEOFUSuIHYFliuwUoGVCrAdWOlA6UCuIOpgPashNRQIOtJkHH2ID2eIA25vD7vndublZ85vI4CRgZGBkxmIiI9mdm9mMzNb' + 'AHgYknJEzM3sA4C7oZiTAEREmNmTuwvEi5lNSH4GsK4liIiFu38nuQRwU4s5CkBTtRILwAvJWzPbuvszyS8AVhFxZWbXAH50E0XE0t2/kbwB' + 'sCxBVAFExKW7TxRMUhfPVTVJXT4HsI2IaQHg1t0fFQNAAPcrpbQhqVZc/BWAaHb3XASq6pkqbf+XAPQ/pQQz+9qy0omdufsTyQRAMfvVYyCl' + 'pCSXLc1N5FpVF9QeMKA9tcrd/5D8CUCPdLc6/3vsDAGwnPP0rUFVY6BhYUVyAuBT0QYVsC7vfQ8AuzbknA/ubpjtFfYeANTCq5yzpNp9iJLq' + '9n8wIKpXOWdJtguA5dvQZpUB9dDdd1pXEMnfRz5CyfW+1HyrrJoX9ADUZEhyY2YykkEZds79KmnuyPOiLGTIiNQ/GZCWTGkhTyep78OAEck/' + 'Zo1f7CXbUUtPgtUW1KTX6Fg2KpPR5fL1AyseONfODhnZtKz+aAAdQ1GVYkFDaOPuMqzBYdRITxZeTX4ygNbVmtkgujWONXKrqxliVqu8PXDU' + 'NHzLEf91bwQwMjAycHYGXgGLbI8w70amwwAAAABJRU5ErkJggg==';

var ReactUeditor = function (_React$Component) {
  _inherits(ReactUeditor, _React$Component);

  function ReactUeditor() {
    _classCallCheck(this, ReactUeditor);

    var _this2 = _possibleConstructorReturn(this, (ReactUeditor.__proto__ || Object.getPrototypeOf(ReactUeditor)).call(this));

    _this2.state = {
      videoModalVisible: false,
      audioModalVisible: false,
      videoSource: '',
      audioSource: ''
    };

    _this2.createScript = function (url) {
      var scriptTags = window.document.querySelectorAll('script');
      var len = scriptTags.length;
      var i = 0;
      var _url = location.origin + url;
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

    _this2.registerImageUpload = function () {
      window.UE.registerUI('imageUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '文件上传',
          cssRules: 'background-position: -726px -77px;',
          onclick: function onclick() {
            _this2.tempfileInput.click();
          }
        });

        return btn;
      });
    };

    _this2.registerSimpleInsertCode = function () {
      window.UE.registerUI('simpleInsertCode', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '插入代码',
          cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
          onclick: function onclick() {
            if (_this2.ueditor) {
              _this2.ueditor.focus();
              _this2.ueditor.execCommand('insertcode');
            }
          }
        });

        return btn;
      });
    };

    _this2.registerUploadVideo = function () {
      var _this = _this2;
      window.UE.registerUI('videoUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '上传视频',
          cssRules: 'background-position: -320px -20px;',
          onclick: function onclick() {
            _this.setState({ videoModalVisible: true });
          }
        });

        return btn;
      });
    };

    _this2.registerUploadAudio = function () {
      var _this = _this2;
      window.UE.registerUI('audioUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '上传音频',
          cssRules: 'background: url(' + uploadAudio + ') !important; background-size: 20px 20px !important;',
          onclick: function onclick() {
            _this.setState({ audioModalVisible: true });
          }
        });

        return btn;
      });
    };

    _this2.uploadImage = function (e) {
      var uploadImage = _this2.props.uploadImage;

      if (uploadImage) {
        var promise = uploadImage(e);
        if (!!promise && typeof promise.then == 'function') {
          promise.then(function (imageUrl) {
            _this2.insertImage2(imageUrl);
          });
        }
      }
      _this2.tempfileInput.value = '';
    };

    _this2.insertImage2 = function (imageUrl) {
      if (_this2.ueditor) {
        _this2.ueditor.focus();
        _this2.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />');
      }
    };

    _this2.insert = function (html) {
      if (_this2.ueditor) {
        _this2.ueditor.execCommand('insertparagraph');
        _this2.ueditor.execCommand('inserthtml', html, true);
        _this2.ueditor.execCommand('insertparagraph');
        _this2.ueditor.execCommand('insertparagraph');
      }
    };

    _this2.closeModal = function (type) {
      switch (type) {
        case 'video':
          _this2.setState({ videoModalVisible: false });
          break;
        case 'audio':
          _this2.setState({ audioModalVisible: false });
          break;
      }
    };

    _this2.initEditor = function () {
      var _this2$props = _this2.props,
          config = _this2$props.config,
          plugins = _this2$props.plugins,
          onChange = _this2$props.onChange,
          value = _this2$props.value;

      _this2.ueditor = config ? window.UE.getEditor(_this2.containerID, config) : window.UE.getEditor(_this2.containerID);

      if (plugins && plugins instanceof Array && plugins.length > 0) {
        if (plugins.indexOf('uploadImage') !== -1) _this2.registerImageUpload();
        if (plugins.indexOf('insertCode') !== -1) _this2.registerSimpleInsertCode();
        if (plugins.indexOf('uploadVideo') !== -1) _this2.registerUploadVideo();
        if (plugins.indexOf('uploadAudio') !== -1) _this2.registerUploadAudio();
      }

      _this2.ueditor.ready(function () {
        _this2.ueditor.addListener('contentChange', function () {
          // 由 componentWillReceiveProps 导致的 contentChange 不需要通知父组件
          if (_this2.isContentChangedByWillReceiveProps) {
            _this2.isContentChangedByWillReceiveProps = false;
          } else {
            _this2.content = _this2.ueditor.getContent();

            if (onChange) {
              onChange(_this2.ueditor.getContent());
            }
          }
        });

        if (_this2.isContentChangedByWillReceiveProps) {
          _this2.isContentChangedByWillReceiveProps = false;
          _this2.ueditor.setContent(_this2.content);
        } else {
          _this2.ueditor.setContent(value);
        }
      });
    };

    _this2.content = ''; // 存储编辑器的实时数据，用于传递给父组件
    _this2.ueditor = null;
    _this2.isContentChangedByWillReceiveProps = false;
    _this2.tempfileInput = null;
    _this2.containerID = 'reactueditor' + new Date().getTime();
    _this2.fileInputID = 'fileinput' + new Date().getTime();
    return _this2;
  }

  _createClass(ReactUeditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var ueditorPath = this.props.ueditorPath;


      this.createScript(ueditorPath + '/ueditor.config.js').then(function () {
        _this3.createScript(ueditorPath + '/ueditor.all.min.js').then(function () {
          _this3.tempfileInput = document.getElementById(_this3.fileInputID);
          _this3.initEditor();
        });
      });
    }

    /**
     * 这里存在两种情况会改变编辑器的内容：
     * 1. 父组件初始化传递的 value。父组件 value 的获取是异步的，因此会触发一次 componentWillReceiveProps，这种情况不需要将更新再通知父组件
     * 2. 用户对编辑器进行编辑
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this4 = this;

      if ('value' in nextProps && this.props.value !== nextProps.value) {
        this.isContentChangedByWillReceiveProps = true;
        this.content = nextProps.value;

        if (this.ueditor) {
          this.ueditor.ready(function () {
            _this4.ueditor.setContent(nextProps.value);
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.ueditor) {
        this.ueditor.destroy();
      }
    }

    // uditor 自定义按钮的方式

  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          videoModalVisible = _state.videoModalVisible,
          audioModalVisible = _state.audioModalVisible;
      var _props = this.props,
          uploadVideo = _props.uploadVideo,
          uploadAudio = _props.uploadAudio,
          progress = _props.progress;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('script', { id: this.containerID, name: this.containerID, type: 'text/plain' }),
        _react2.default.createElement('input', { type: 'file', id: this.fileInputID, onChange: this.uploadImage, style: { visibility: 'hidden' } }),
        _react2.default.createElement(_UploadModal2.default, {
          type: 'video',
          title: '\u4E0A\u4F20\u89C6\u9891',
          visible: videoModalVisible,
          closeModal: function closeModal() {
            _this5.closeModal('video');
          },
          insert: this.insert,
          upload: uploadVideo,
          progress: progress }),
        _react2.default.createElement(_UploadModal2.default, {
          type: 'audio',
          title: '\u4E0A\u4F20\u97F3\u9891',
          visible: audioModalVisible,
          closeModal: function closeModal() {
            _this5.closeModal('audio');
          },
          insert: this.insert,
          upload: uploadAudio,
          progress: progress })
      );
    }
  }], [{
    key: 'insertImage',
    value: function insertImage(imageUrl) {
      if (this.ueditor) {
        this.ueditor.focus();
        this.ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />');
      }
      console.warn('该接口即将废弃，请使用返回 promise 方式');
    }
  }]);

  return ReactUeditor;
}(_react2.default.Component);

ReactUeditor.propTypes = {
  value: _propTypes2.default.string,
  ueditorPath: _propTypes2.default.string.isRequired,
  plugins: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  uploadImage: _propTypes2.default.func
};
exports.default = ReactUeditor;