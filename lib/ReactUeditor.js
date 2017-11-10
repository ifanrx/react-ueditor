'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDialog = require('rc-Dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _UploadVideoModal = require('./UploadVideoModal');

var _UploadVideoModal2 = _interopRequireDefault(_UploadVideoModal);

var _UploadAudioModal = require('./UploadAudioModal');

var _UploadAudioModal2 = _interopRequireDefault(_UploadAudioModal);

require('rc-dialog/assets/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var content = ''; // 存储编辑器的实时数据，用于传递给父组件
var ueditor = void 0,
    isContentChangedByWillReceiveProps = false,
    tempfileInput = null;
var simpleInsertCodeIcon = 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB9klEQVRYR+2Wy23CQBCGZxwUASdKgA7IIdIukhF0QCoI6YAS6CB0EDpIOgjCEbs3nApCB+EEKFI80ToYgR/7IEhIEb4hvPN/8/jHi3DmB8+sDxeA/1GBdosNiTAMhHhxnamTVMDnfAEAo0CI0ckBOs1mbRKGy6LArdZtswSl+VdEDSmlAtk9prPqRW0FfMb66OGjt1o3iiB8zgcAMAiEqKfFo0p5QQSDQMpxUQKFAFvxJ4roQRfA52yCgOFUCAVy8NjEyAWwOaiUVImjauWTCO6KBtAUKwNgOrCfos95DxGepzNh08rcah4cdBFXID5nY0CsBTPRM01/UewdgKu4EmxztiTAoa398jRigGPEdfbTVSOthUkfTdOeDrrdfv20/UytSCeMKhAQ3HvrzY1u4WQs1mIhEk7y7GeCiN1TKc8J8R3Vj+9qWXmZvNW6awOR2C+KqPsm5cQkmFlQ1corAeHVatOJZ8AVIu4jwmgqZO0v4irZnQtcIFzslwBuq7bLPKn0wR6whYjtZ9jxurLvtzmzwUwQrvYryjwBzF2hOojYfgC9YCabpv6bxLWf4yII39J+NuLG+8BvkPJgOpND9TJjrH7t4Yet/VS1vNVmpLO205XsWPvpWuUGoD6/AJ1jtp/zjcg0YKf636kCpxLdj3MBOHsFfgBLLaBN8r49lAAAAABJRU5ErkJggg==';
var uploadAudio = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBUlEQVRYR+1VwXHbMBC8qyBxBXI6cCqwUkEOFUSuIHYFliuwUoGVCrAdWOlA6UCuIOpgPashNRQIOtJkHH2ID2eIA25vD7vndublZ85vI4CRgZGBkxmIiI9mdm9mMzNbAHgYknJEzM3sA4C7oZiTAEREmNmTuwvEi5lNSH4GsK4liIiFu38nuQRwU4s5CkBTtRILwAvJWzPbuvszyS8AVhFxZWbXAH50E0XE0t2/kbwBsCxBVAFExKW7TxRMUhfPVTVJXT4HsI2IaQHg1t0fFQNAAPcrpbQhqVZc/BWAaHb3XASq6pkqbf+XAPQ/pQQz+9qy0omdufsTyQRAMfvVYyClpCSXLc1N5FpVF9QeMKA9tcrd/5D8CUCPdLc6/3vsDAGwnPP0rUFVY6BhYUVyAuBT0QYVsC7vfQ8AuzbknA/ubpjtFfYeANTCq5yzpNp9iJLq9n8wIKpXOWdJtguA5dvQZpUB9dDdd1pXEMnfRz5CyfW+1HyrrJoX9ADUZEhyY2YykkEZds79KmnuyPOiLGTIiNQ/GZCWTGkhTyep78OAEck/Zo1f7CXbUUtPgtUW1KTX6Fg2KpPR5fL1AyseONfODhnZtKz+aAAdQ1GVYkFDaOPuMqzBYdRITxZeTX4ygNbVmtkgujWONXKrqxliVqu8PXDUNHzLEf91bwQwMjAycHYGXgGLbI8w70amwwAAAABJRU5ErkJggg==';

var ReactUeditor = function (_React$Component) {
  _inherits(ReactUeditor, _React$Component);

  function ReactUeditor() {
    _classCallCheck(this, ReactUeditor);

    var _this2 = _possibleConstructorReturn(this, (ReactUeditor.__proto__ || Object.getPrototypeOf(ReactUeditor)).call(this));

    _this2.uploadImage = _this2.uploadImage.bind(_this2);
    _this2.selectInputVideoSource = _this2.selectInputVideoSource.bind(_this2);
    _this2.insertVideo = _this2.insertVideo.bind(_this2);
    _this2.state = {
      videoModalVisible: false,
      audioModalVisible: false,
      videoSource: '',
      audioSource: ''
    };
    return _this2;
  }

  _createClass(ReactUeditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var props = this.props;
      this.createScript(props.ueditorPath + '/ueditor.config.js').then(function () {
        _this3.createScript(props.ueditorPath + '/ueditor.all.min.js').then(function () {
          tempfileInput = document.getElementById('tempfileInput');
          _this3.initEditor();
        });
      });
    }
  }, {
    key: 'createScript',
    value: function createScript(url) {
      var scriptTags = window.document.querySelectorAll('script'),
          len = scriptTags.length,
          i = 0;
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
    }

    /**
     * 这里存在两种情况会改变编辑器的内容：
     * 1. 父组件初始化传递的 value。父组件 value 的获取是异步的，因此会触发一次 componentWillReceiveProps，这种情况不需要将更新再通知父组件
     * 2. 用户对编辑器进行编辑
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps && this.props.value !== nextProps.value) {
        isContentChangedByWillReceiveProps = true;
        content = nextProps.value;

        if (ueditor) {
          ueditor.ready(function () {
            ueditor.setContent(nextProps.value);
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (ueditor) {
        ueditor.destroy();
      }
    }

    // uditor 自定义按钮的方式

  }, {
    key: 'registerImageUpload',
    value: function registerImageUpload() {
      window.UE.registerUI('imageUpload', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '文件上传',
          cssRules: 'background-position: -726px -77px;',
          onclick: function onclick() {
            tempfileInput.click();
          }
        });

        return btn;
      });
    }
  }, {
    key: 'registerSimpleInsertCode',
    value: function registerSimpleInsertCode() {
      window.UE.registerUI('simpleInsertCode', function (editor, uiName) {
        var btn = new window.UE.ui.Button({
          name: uiName,
          title: '插入代码',
          cssRules: 'background: url(' + simpleInsertCodeIcon + ') !important; background-size: 20px 20px !important;',
          onclick: function onclick() {
            if (ueditor) {
              ueditor.focus();
              ueditor.execCommand('insertcode');
            }
          }
        });

        return btn;
      });
    }
  }, {
    key: 'registerUploadVideo',
    value: function registerUploadVideo() {
      var _this = this;
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
    }
  }, {
    key: 'registerUploadAudio',
    value: function registerUploadAudio() {
      var _this = this;
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
    }
  }, {
    key: 'uploadImage',
    value: function uploadImage(e) {
      var props = this.props;
      if (props.uploadImage) {
        props.uploadImage(e);
      }
      tempfileInput.value = '';
    }
  }, {
    key: 'insertVideo',
    value: function insertVideo(url, params) {
      if (ueditor) {
        var width = params.width,
            height = params.height,
            controls = params.controls,
            autoplay = params.autoplay,
            muted = params.muted,
            loop = params.loop;

        ueditor.focus();
        ueditor.execCommand('inserthtml', '<video\n        src="' + url + '"\n        width="' + width + '" height="' + height + '"\n        controls="' + controls + '" autoplay="' + autoplay + '" muted="' + muted + '" loop="' + loop + '"\n      ></video>', true);
      }
    }
  }, {
    key: 'insertAudio',
    value: function insertAudio(url, params) {
      if (ueditor) {
        var controls = params.controls,
            autoplay = params.autoplay,
            loop = params.loop;

        ueditor.focus();
        ueditor.execCommand('inserthtml', '<audio\n        src="' + url + '"\n        controls="' + controls + '" autoplay="' + autoplay + '" loop="' + loop + '"\n      ></audio>', true);
      }
    }
  }, {
    key: 'closeModal',
    value: function closeModal(type) {
      switch (type) {
        case 'video':
          this.setState({ videoModalVisible: false });
          break;
        case 'audio':
          this.setState({ audioModalVisible: false });
          break;
      }
    }
  }, {
    key: 'selectInputVideoSource',
    value: function selectInputVideoSource() {
      this.setState({ videoSource: this.videoSourceInput.value });
    }
  }, {
    key: 'initEditor',
    value: function initEditor() {
      var props = this.props,
          plugins = props.plugins;
      ueditor = window.UE.getEditor('container');

      if (plugins && plugins instanceof Array && plugins.length > 0) {
        if (plugins.indexOf('uploadImage') !== -1) this.registerImageUpload();
        if (plugins.indexOf('insertCode') !== -1) this.registerSimpleInsertCode();
        if (plugins.indexOf('uploadVideo') !== -1) this.registerUploadVideo();
        if (plugins.indexOf('uploadAudio') !== -1) this.registerUploadAudio();
      }

      ueditor.ready(function () {
        ueditor.addListener('contentChange', function () {
          // 由 componentWillReceiveProps 导致的 contentChange 不需要通知父组件
          if (isContentChangedByWillReceiveProps) {
            isContentChangedByWillReceiveProps = false;
          } else {
            content = ueditor.getContent();

            if (props.onChange) {
              props.onChange(ueditor.getContent());
            }
          }
        });

        if (isContentChangedByWillReceiveProps) {
          isContentChangedByWillReceiveProps = false;
          ueditor.setContent(content);
        } else {
          ueditor.setContent(props.value);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          videoModalVisible = _state.videoModalVisible,
          audioModalVisible = _state.audioModalVisible;
      var uploadVideo = this.props.uploadVideo;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('script', { id: 'container', type: 'text/plain' }),
        _react2.default.createElement('input', { type: 'file', id: 'tempfileInput', onChange: this.uploadImage, style: { visibility: 'hidden' } }),
        _react2.default.createElement(_UploadVideoModal2.default, {
          visible: videoModalVisible,
          closeModal: function closeModal() {
            _this4.closeModal('video');
          },
          insertVideo: function insertVideo(url, params) {
            _this4.insertVideo(url, params);
          },
          uploadVideo: uploadVideo }),
        _react2.default.createElement(_UploadAudioModal2.default, {
          visible: audioModalVisible,
          closeModal: function closeModal() {
            _this4.closeModal('audio');
          },
          insertAudio: function insertAudio(url, params) {
            _this4.insertAudio(url, params);
          },
          uploadAudio: uploadAudio })
      );
    }
  }], [{
    key: 'insertImage',
    value: function insertImage(imageUrl) {
      if (ueditor) {
        ueditor.focus();
        ueditor.execCommand('inserthtml', '<img src="' + imageUrl + '" />');
      }
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