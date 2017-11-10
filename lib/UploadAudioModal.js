'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcDialog = require('rc-Dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _select = require('./select');

var _select2 = _interopRequireDefault(_select);

var _Upload = require('./Upload');

var _Upload2 = _interopRequireDefault(_Upload);

require('rc-dialog/assets/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  paramsConfig: {
    paddingBottom: '10px',
    borderBottom: '1px solid rgb(217, 217, 217)',
    display: 'flex',
    flexWrap: 'wrap'
  }
};

var linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;

var UploadAudioModal = function (_React$Component) {
  _inherits(UploadAudioModal, _React$Component);

  function UploadAudioModal() {
    _classCallCheck(this, UploadAudioModal);

    var _this = _possibleConstructorReturn(this, (UploadAudioModal.__proto__ || Object.getPrototypeOf(UploadAudioModal)).call(this));

    _this.updateAudioSource = _this.updateAudioSource.bind(_this);
    _this.uploadAudio = _this.uploadAudio.bind(_this);
    _this.insertAudio = _this.insertAudio.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.changeConfig = _this.changeConfig.bind(_this);
    _this.state = {
      audioSource: '',
      controls: true,
      autoplay: false,
      loop: false
    };
    return _this;
  }

  _createClass(UploadAudioModal, [{
    key: 'updateAudioSource',
    value: function updateAudioSource(e) {
      this.setState({ audioSource: e.target.value });
    }
  }, {
    key: 'uploadAudio',
    value: function uploadAudio(e) {
      var _this2 = this;

      var props = this.props;
      if (props.uploadAudio) {
        var promise = props.uploadAudio(e);
        if (!!promise && typeof promise.then == "function") {
          promise.then(function (audioUrl) {
            _this2.setState({ audioSource: audioUrl });
          });
        }
      }
    }
  }, {
    key: 'insertAudio',
    value: function insertAudio() {
      var _state = this.state,
          audioSource = _state.audioSource,
          controls = _state.controls,
          autoplay = _state.autoplay,
          loop = _state.loop;

      var params = { controls: controls, autoplay: autoplay, loop: loop };
      if (audioSource !== '' && linkRegx.test(audioSource)) {
        this.props.insertAudio(this.state.audioSource, params);
        this.closeModal();
      }
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.props.closeModal();
    }
  }, {
    key: 'changeConfig',
    value: function changeConfig(e, type) {
      var value = !!e.target.value;
      this.setState(_defineProperty({}, type, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          audioSource = _state2.audioSource,
          controls = _state2.controls,
          autoplay = _state2.autoplay,
          loop = _state2.loop;
      var visible = this.props.visible;

      return _react2.default.createElement(
        _rcDialog2.default,
        {
          title: '\u4E0A\u4F20\u97F3\u9891',
          onClose: this.closeModal,
          visible: visible,
          footer: [_react2.default.createElement(
            _Button2.default,
            { key: 'close', onClick: this.closeModal },
            '\u53D6\u6D88'
          ), _react2.default.createElement(
            _Button2.default,
            { key: 'insert', onClick: this.insertAudio },
            '\u63D2\u5165'
          )],
          maskAnimation: 'fade' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { style: { fontSize: '14px', paddingRight: '10px', color: 'rgba(0, 0, 0, 0.65)' } },
              '\u63D2\u5165\u94FE\u63A5'
            ),
            _react2.default.createElement(_Input2.default, { style: { width: '350px' }, type: 'text', value: audioSource, onChange: this.updateAudioSource }),
            _react2.default.createElement(_Upload2.default, { onChange: this.uploadAudio })
          ),
          _react2.default.createElement(
            'h3',
            { style: { fontSize: '14px', paddingRight: '10px', color: 'rgba(0, 0, 0, 0.65)' } },
            '\u53C2\u6570\u914D\u7F6E'
          ),
          _react2.default.createElement(
            'form',
            { style: style.paramsConfig },
            _react2.default.createElement(
              _Label2.default,
              null,
              'controls',
              _react2.default.createElement(
                _select2.default,
                { defaultValue: controls, onChange: function onChange(e) {
                    _this3.changeConfig(e, 'controls');
                  } },
                _react2.default.createElement(
                  'option',
                  { value: 'true' },
                  'true'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'false' },
                  'false'
                )
              )
            ),
            _react2.default.createElement(
              _Label2.default,
              null,
              'autoplay',
              _react2.default.createElement(
                _select2.default,
                { defaultValue: autoplay, onChange: function onChange(e) {
                    _this3.changeConfig(e, 'autoplay');
                  } },
                _react2.default.createElement(
                  'option',
                  { value: 'true' },
                  'true'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'false' },
                  'false'
                )
              )
            ),
            _react2.default.createElement(
              _Label2.default,
              null,
              'loop',
              _react2.default.createElement(
                _select2.default,
                { defaultValue: loop, onChange: function onChange(e) {
                    _this3.changeConfig(e, 'loop');
                  } },
                _react2.default.createElement(
                  'option',
                  { value: 'true' },
                  'true'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'false' },
                  'false'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', padding: '20px 10px 0 10px' } },
            _react2.default.createElement(
              'audio',
              { src: audioSource, controls: 'controls', style: { width: '400px' } },
              '\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 audio \u6807\u7B7E'
            )
          )
        )
      );
    }
  }]);

  return UploadAudioModal;
}(_react2.default.Component);

exports.default = UploadAudioModal;