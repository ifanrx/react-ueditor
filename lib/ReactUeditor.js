'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var content = ''; // 存储编辑器的实时数据，用于传递给父组件
var ueditor = void 0,
    isContentChangedByWillReceiveProps = false,
    tempfileInput = null;

var ReactUeditor = function (_React$Component) {
  _inherits(ReactUeditor, _React$Component);

  function ReactUeditor() {
    _classCallCheck(this, ReactUeditor);

    var _this = _possibleConstructorReturn(this, (ReactUeditor.__proto__ || Object.getPrototypeOf(ReactUeditor)).call(this));

    _this.uploadImage = _this.uploadImage.bind(_this);
    return _this;
  }

  _createClass(ReactUeditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props;
      this.createScript(props.ueditorPath + '/ueditor.config.js').then(function () {
        _this2.createScript(props.ueditorPath + '/ueditor.all.min.js').then(function () {
          tempfileInput = document.getElementById('tempfileInput');
          _this2.initEditor();
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
          cssRules: 'background-position: -380px 0',
          onclick: function onclick() {
            tempfileInput.click();
          }
        });

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName);
          if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
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
    key: 'initEditor',
    value: function initEditor() {
      var props = this.props;

      ueditor = window.UE.getEditor('container');
      this.registerImageUpload();

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
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('script', { id: 'container', type: 'text/plain' }),
        _react2.default.createElement('input', { type: 'file', id: 'tempfileInput', onChange: this.uploadImage, style: { visibility: 'hidden' } })
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
  onChange: _propTypes2.default.func,
  uploadImage: _propTypes2.default.func
};

exports.default = ReactUeditor;