'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _rcDialog = require('rc-dialog');

var _rcDialog2 = _interopRequireDefault(_rcDialog);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

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

var UploadModal = function (_React$Component) {
  _inherits(UploadModal, _React$Component);

  function UploadModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UploadModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadModal.__proto__ || Object.getPrototypeOf(UploadModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
      _this.setState({ currentSource: e.target.value });
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
      _this.setState({ sources: sourcesCopy });
    }, _this.upload = function (e) {
      var upload = _this.props.upload;


      if (!upload) return;

      upload(e).then(function (url) {
        _this.setState({ currentSource: url });
      }).catch(function (e) {
        e.constructor === Error ? _this.showErrorMsg(e.message) : _this.showErrorMsg(e);
      });
    }, _this.showErrorMsg = function (msg) {
      _this.setState({ errorMsg: msg, errorMsgVisible: true });
      clearTimeout(timeoutInstance);
      timeoutInstance = setTimeout(function () {
        _this.setState({ errorMsg: '', errorMsgVisible: false });
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

      var dataExtra = JSON.stringify({ 'poster': poster, 'name': name, 'author': author });
      var len = sources.length;

      if (len > 0) {
        var html = '';
        var attr = '';

        attr += controls === 'false' ? '' : ' controls="true" ';
        attr += autoplay === 'false' ? '' : ' autoplay="true" ';
        attr += loop === 'false' ? '' : ' loop="true" ';
        if (type === 'audio') {
          if (len === 1) {
            html = '<audio src="' + sources[0] + '" ' + attr + ' data-extra=\'' + dataExtra + '\'>\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 audio \u6807\u7B7E</audio>';
          } else {
            html = '<audio ' + attr + ' data-extra=\'' + dataExtra + '\'>';
            sources.forEach(function (source) {
              html += '<source src=' + source + ' type="audio/' + _this.getFileType(source, 'audio') + '">';
            });
            html += '你的浏览器不支持 audio 标签</audio>';
          }
        } else {
          attr += muted === 'false' ? '' : ' muted ';
          if (len === 1) {
            html = '<video src="' + sources[0] + '" width="' + width + '" height="' + height + '" ' + attr + '>\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E</video>';
          } else {
            html = '<video width="' + width + '" height="' + height + '" ' + attr + '>';
            sources.forEach(function (source) {
              html += '<source src=' + source + ' type="video/' + _this.getFileType(source, 'video') + '"}>';
            });
            html += '你的浏览器不支持 video 标签</video>';
          }
        }

        _this.props.insert(html);
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
          return _react2.default.createElement(_Tag2.default, { value: source, key: source, index: index, onRemove: _this.removeSource });
        });
        return list;
      } else {
        return _react2.default.createElement(
          'span',
          { style: style.warnInfo },
          '\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u94FE\u63A5'
        );
      }
    }, _this.renderVideoConfig = function () {
      var _this$state3 = _this.state,
          width = _this$state3.width,
          height = _this$state3.height,
          controls = _this$state3.controls,
          autoplay = _this$state3.autoplay,
          muted = _this$state3.muted,
          loop = _this$state3.loop;

      return _react2.default.createElement(
        'form',
        { style: style.paramsConfig },
        _react2.default.createElement(
          _Label2.default,
          { name: 'width' },
          _react2.default.createElement(_Input2.default, { type: 'number', defaultValue: width, onChange: function onChange(e) {
              _this.changeConfig(e, 'width');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'height' },
          _react2.default.createElement(_Input2.default, { type: 'number', defaultValue: height, onChange: function onChange(e) {
              _this.changeConfig(e, 'height');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'controls' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: controls, onChange: function onChange(e) {
                _this.changeConfig(e, 'controls');
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
          { name: 'autoplay' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: autoplay, onChange: function onChange(e) {
                _this.changeConfig(e, 'autoplay');
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
          { name: 'muted' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: muted, onChange: function onChange(e) {
                _this.changeConfig(e, 'muted');
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
          { name: 'loop' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: loop, onChange: function onChange(e) {
                _this.changeConfig(e, 'loop');
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
      );
    }, _this.renderAudioConfig = function () {
      var _this$state4 = _this.state,
          controls = _this$state4.controls,
          autoplay = _this$state4.autoplay,
          loop = _this$state4.loop,
          poster = _this$state4.poster,
          name = _this$state4.name,
          author = _this$state4.author;

      return _react2.default.createElement(
        'form',
        { style: style.paramsConfig },
        _react2.default.createElement(
          _Label2.default,
          { name: 'controls' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: controls, onChange: function onChange(e) {
                _this.changeConfig(e, 'controls');
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
          { name: 'autoplay' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: autoplay, onChange: function onChange(e) {
                _this.changeConfig(e, 'autoplay');
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
          { name: 'loop' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: loop, onChange: function onChange(e) {
                _this.changeConfig(e, 'loop');
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
          { name: 'poster' },
          _react2.default.createElement(_Input2.default, { type: 'text', defaultValue: poster, onChange: function onChange(e) {
              _this.changeConfig(e, 'poster');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'name' },
          _react2.default.createElement(_Input2.default, { type: 'text', defaultValue: name, onChange: function onChange(e) {
              _this.changeConfig(e, 'name');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'author' },
          _react2.default.createElement(_Input2.default, { type: 'text', defaultValue: author, onChange: function onChange(e) {
              _this.changeConfig(e, 'author');
            } })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UploadModal, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          currentSource = _state.currentSource,
          errorMsg = _state.errorMsg,
          errorMsgVisible = _state.errorMsgVisible;
      var _props = this.props,
          type = _props.type,
          title = _props.title,
          visible = _props.visible,
          progress = _props.progress;


      return _react2.default.createElement(
        _rcDialog2.default,
        {
          title: title,
          onClose: this.closeModal,
          visible: visible,
          footer: [_react2.default.createElement(
            _Button2.default,
            { key: 'close', onClick: this.closeModal },
            '\u53D6\u6D88'
          ), _react2.default.createElement(
            _Button2.default,
            { key: 'insert', onClick: this.insert },
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
            _react2.default.createElement(_Input2.default, { style: { width: '300px' }, type: 'text', value: currentSource, onChange: this.updateCurrentSource }),
            _react2.default.createElement(
              _Button2.default,
              { onClick: this.addSource },
              '\u6DFB\u52A0'
            ),
            _react2.default.createElement(_Upload2.default, { onChange: this.upload })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { style: _extends({}, style.warnInfo, { display: progress && progress !== -1 ? 'block' : 'none' }) },
              progress,
              '%'
            ),
            _react2.default.createElement(
              'span',
              { style: _extends({}, style.warnInfo, { display: errorMsgVisible ? 'block' : 'none' }) },
              errorMsg
            )
          ),
          _react2.default.createElement(
            'div',
            { style: style.sourceList },
            this.renderSourceList()
          ),
          _react2.default.createElement(
            'span',
            { style: style.configTitle },
            '\u53C2\u6570\u914D\u7F6E'
          ),
          type === 'audio' ? this.renderAudioConfig() : this.renderVideoConfig(),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', padding: '20px 10px 0 10px' } },
            type === 'audio' ? _react2.default.createElement(
              'audio',
              { src: currentSource, controls: 'controls', style: { width: '400px' } },
              '\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 audio \u6807\u7B7E'
            ) : _react2.default.createElement(
              'video',
              { src: currentSource, controls: 'controls',
                style: { width: '400px', height: '250px', backgroundColor: '#000' } },
              '\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 video \u6807\u7B7E'
            )
          )
        )
      );
    }
  }]);

  return UploadModal;
}(_react2.default.Component);

exports.default = UploadModal;