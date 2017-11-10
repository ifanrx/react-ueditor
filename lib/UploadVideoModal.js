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
  },
  insertTitle: {
    fontSize: '14px',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  configTitle: {
    display: 'block',
    fontSize: '14px',
    margin: '10px 0',
    paddingRight: '10px',
    color: 'rgba(0, 0, 0, 0.65)'
  }
};

var linkRegx = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;

var UploadVideoModal = function (_React$Component) {
  _inherits(UploadVideoModal, _React$Component);

  function UploadVideoModal() {
    _classCallCheck(this, UploadVideoModal);

    var _this = _possibleConstructorReturn(this, (UploadVideoModal.__proto__ || Object.getPrototypeOf(UploadVideoModal)).call(this));

    _this.updateVideoSource = _this.updateVideoSource.bind(_this);
    _this.uploadVideo = _this.uploadVideo.bind(_this);
    _this.insertVideo = _this.insertVideo.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.changeConfig = _this.changeConfig.bind(_this);
    _this.state = {
      videoSource: '',
      width: 400,
      height: 400,
      controls: true,
      autoplay: false,
      muted: false,
      loop: false
    };
    return _this;
  }

  _createClass(UploadVideoModal, [{
    key: 'updateVideoSource',
    value: function updateVideoSource(e) {
      this.setState({ videoSource: e.target.value });
    }
  }, {
    key: 'uploadVideo',
    value: function uploadVideo(e) {
      var _this2 = this;

      var props = this.props;
      if (props.uploadVideo) {
        var promise = props.uploadVideo(e);
        if (!!promise && typeof promise.then == "function") {
          promise.then(function (videoUrl) {
            _this2.setState({ videoSource: videoUrl });
          });
        }
      }
    }
  }, {
    key: 'insertVideo',
    value: function insertVideo() {
      var _state = this.state,
          videoSource = _state.videoSource,
          width = _state.width,
          height = _state.height,
          controls = _state.controls,
          autoplay = _state.autoplay,
          muted = _state.muted,
          loop = _state.loop;

      var params = { width: parseInt(width), height: parseInt(height), controls: controls, autoplay: autoplay, muted: muted, loop: loop };
      if (videoSource !== '' && linkRegx.test(videoSource)) {
        this.props.insertVideo(this.state.videoSource, params);
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
      var value = e.target.value;
      if (type === 'width' || type === 'height') {
        if (isNaN(parseInt(value))) {
          value = parseInt(value);
        }
      } else {
        value = !!value;
      }
      this.setState(_defineProperty({}, type, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state2 = this.state,
          videoSource = _state2.videoSource,
          width = _state2.width,
          height = _state2.height,
          controls = _state2.controls,
          autoplay = _state2.autoplay,
          muted = _state2.muted,
          loop = _state2.loop;
      var visible = this.props.visible;

      return _react2.default.createElement(
        _rcDialog2.default,
        {
          title: '\u4E0A\u4F20\u89C6\u9891',
          onClose: this.closeModal,
          visible: visible,
          footer: [_react2.default.createElement(
            _Button2.default,
            { key: 'close', onClick: this.closeModal },
            '\u53D6\u6D88'
          ), _react2.default.createElement(
            _Button2.default,
            { key: 'insert', onClick: this.insertVideo },
            '\u63D2\u5165'
          )],
          animation: 'zome',
          maskAnimation: 'fade' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { style: style.insertTitle },
              '\u63D2\u5165\u94FE\u63A5'
            ),
            _react2.default.createElement(_Input2.default, { style: { width: '350px' }, type: 'text', value: videoSource, onChange: this.updateVideoSource }),
            _react2.default.createElement(_Upload2.default, { onChange: this.uploadVideo })
          ),
          _react2.default.createElement(
            'span',
            { style: style.configTitle },
            '\u53C2\u6570\u914D\u7F6E'
          ),
          _react2.default.createElement(
            'form',
            { style: style.paramsConfig },
            _react2.default.createElement(
              _Label2.default,
              null,
              'width ',
              _react2.default.createElement(_Input2.default, { type: 'number', defaultValue: width, onChange: function onChange(e) {
                  _this3.changeConfig(e, 'width');
                } })
            ),
            _react2.default.createElement(
              _Label2.default,
              null,
              'height ',
              _react2.default.createElement(_Input2.default, { type: 'number', defaultValue: height, onChange: function onChange(e) {
                  _this3.changeConfig(e, 'height');
                } })
            ),
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
              'muted',
              _react2.default.createElement(
                _select2.default,
                { defaultValue: muted, onChange: function onChange(e) {
                    _this3.changeConfig(e, 'muted');
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
              'video',
              { src: videoSource, controls: 'controls', style: { width: '400px', height: '250px', backgroundColor: '#000' } },
              '\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E'
            )
          )
        )
      );
    }
  }]);

  return UploadVideoModal;
}(_react2.default.Component);

exports.default = UploadVideoModal;