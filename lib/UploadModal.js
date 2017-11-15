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
    border: '1px dashed rgb(217, 217, 217)'
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

var UploadModal = function (_React$Component) {
  _inherits(UploadModal, _React$Component);

  function UploadModal() {
    _classCallCheck(this, UploadModal);

    var _this = _possibleConstructorReturn(this, (UploadModal.__proto__ || Object.getPrototypeOf(UploadModal)).call(this));

    _this.updateCurrentSource = _this.updateCurrentSource.bind(_this);
    _this.addSource = _this.addSource.bind(_this);
    _this.removeSource = _this.removeSource.bind(_this);
    _this.upload = _this.upload.bind(_this);
    _this.insert = _this.insert.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.changeConfig = _this.changeConfig.bind(_this);
    _this.renderSourceList = _this.renderSourceList.bind(_this);
    _this.renderVideoConfig = _this.renderVideoConfig.bind(_this);
    _this.renderAudioConfig = _this.renderAudioConfig.bind(_this);
    _this.state = {
      sources: [],
      currentSource: '',
      width: 400,
      height: 400,
      controls: true,
      autoplay: false,
      muted: false,
      loop: false,
      poster: '',
      name: '',
      author: '',
      errorMsg: '',
      errorMsgVisible: false
    };
    return _this;
  }

  _createClass(UploadModal, [{
    key: 'updateCurrentSource',
    value: function updateCurrentSource(e) {
      this.setState({ currentSource: e.target.value });
    }
  }, {
    key: 'addSource',
    value: function addSource() {
      var _state = this.state,
          sources = _state.sources,
          currentSource = _state.currentSource;

      var newsources = sources.concat([currentSource]);
      if (linkRegx.test(currentSource) && sources.indexOf(currentSource) === -1) {
        this.setState({
          sources: newsources,
          currentSource: ''
        });
      }
    }
  }, {
    key: 'removeSource',
    value: function removeSource(index) {
      var sourcesCopy = this.state.sources.concat([]);
      sourcesCopy.splice(index, 1);
      this.setState({ sources: sourcesCopy });
    }
  }, {
    key: 'upload',
    value: function upload(e) {
      var _this2 = this;

      var props = this.props;
      if (props.upload) {
        var promise = props.upload(e);
        if (!!promise && typeof promise.then == "function") {
          promise.then(function (url) {
            _this2.setState({ currentSource: url });
          }).catch(function (msg) {
            _this2.setState({ errorMsg: msg, errorMsgVisible: true });
            setTimeout(function () {
              _this2.setState({ errorMsg: '', errorMsgVisible: false });
            }, 4000);
          });
        }
      }
    }
  }, {
    key: 'getFileType',
    value: function getFileType(fileUrl, mediaType) {
      var type = fileUrl.match(/\.(\w+)$/, 'i');
      return type ? type[1].toLowerCase() : mediaType === 'audio' ? 'mp3' : 'mp4';
    }
  }, {
    key: 'insert',
    value: function insert() {
      var _this3 = this;

      var _state2 = this.state,
          sources = _state2.sources,
          currentSource = _state2.currentSource,
          width = _state2.width,
          height = _state2.height,
          controls = _state2.controls,
          autoplay = _state2.autoplay,
          muted = _state2.muted,
          loop = _state2.loop,
          poster = _state2.poster,
          name = _state2.name,
          author = _state2.author;
      var type = this.props.type;

      var dataExtra = JSON.stringify({ "poster": poster, "name": name, "author": author });
      var len = sources.length;
      var html = '';

      if (len > 0) {
        if (type === 'audio') {
          if (len === 1) {
            html = '<audio src="' + sources[0] + '" controls="' + controls + '" autoplay="' + autoplay + '" loop="' + loop + '" data-extra=\'' + dataExtra + '\'></audio>';
          } else {
            html = '<audio controls="' + controls + '" autoplay="' + autoplay + '" loop="' + loop + '" data-extra=\'' + dataExtra + '\'>';
            sources.forEach(function (source) {
              html += '<source src=' + source + ' type="audio/' + _this3.getFileType(source, 'audio') + '">';
            });
            html += '</audio>';
          }
        } else {
          if (len === 1) {
            html = '<video src="' + sources[0] + '" width="' + width + '" height="' + height + '" controls="' + controls + '"\n            autoplay="' + autoplay + '" muted="' + muted + '" loop="' + loop + '"></video>';
          } else {
            html = '<video width="' + width + '" height="' + height + '" controls="' + controls + '" autoplay="' + autoplay + '" muted="' + muted + '" loop="' + loop + '">';
            sources.forEach(function (source) {
              html += '<source src=' + source + ' type="video/' + _this3.getFileType(source, 'video') + '"}>';
            });
            html += '</video>';
          }
        }

        this.props.insert(html);
        this.closeModal();
      } else {
        alert('please add');
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
      var boolType = ['controls', 'autoplay', 'muted', 'loop'];
      if (type === 'width' || type === 'height') {
        if (isNaN(parseInt(value))) {
          value = parseInt(value);
        }
      } else if (boolType.indexOf(type) !== -1) {
        value = !!value;
      }
      this.setState(_defineProperty({}, type, value));
    }
  }, {
    key: 'renderSourceList',
    value: function renderSourceList() {
      var _this4 = this;

      var sources = this.state.sources;

      if (sources.length > 0) {
        var list = sources.map(function (source, index) {
          return _react2.default.createElement(_Tag2.default, { value: source, key: source, index: index, onRemove: _this4.removeSource });
        });
        return list;
      } else {
        return _react2.default.createElement(
          'span',
          { style: style.warnInfo },
          '\u81F3\u5C11\u6DFB\u52A0\u4E00\u4E2A\u94FE\u63A5'
        );
      }
    }
  }, {
    key: 'renderVideoConfig',
    value: function renderVideoConfig() {
      var _this5 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          controls = _props.controls,
          autoplay = _props.autoplay,
          muted = _props.muted,
          loop = _props.loop;

      return _react2.default.createElement(
        'form',
        { style: style.paramsConfig },
        _react2.default.createElement(
          _Label2.default,
          { name: 'width' },
          _react2.default.createElement(_Input2.default, { type: 'number', defaultValue: width, onChange: function onChange(e) {
              _this5.changeConfig(e, 'width');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'height' },
          _react2.default.createElement(_Input2.default, { type: 'number', defaultValue: height, onChange: function onChange(e) {
              _this5.changeConfig(e, 'height');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'controls' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: controls, onChange: function onChange(e) {
                _this5.changeConfig(e, 'controls');
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
                _this5.changeConfig(e, 'autoplay');
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
                _this5.changeConfig(e, 'muted');
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
                _this5.changeConfig(e, 'loop');
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
    }
  }, {
    key: 'renderAudioConfig',
    value: function renderAudioConfig() {
      var _this6 = this;

      var _props2 = this.props,
          controls = _props2.controls,
          autoplay = _props2.autoplay,
          loop = _props2.loop,
          poster = _props2.poster,
          name = _props2.name,
          author = _props2.author;

      return _react2.default.createElement(
        'form',
        { style: style.paramsConfig },
        _react2.default.createElement(
          _Label2.default,
          { name: 'controls' },
          _react2.default.createElement(
            _Select2.default,
            { defaultValue: controls, onChange: function onChange(e) {
                _this6.changeConfig(e, 'controls');
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
                _this6.changeConfig(e, 'autoplay');
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
                _this6.changeConfig(e, 'loop');
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
              _this6.changeConfig(e, 'poster');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'name' },
          _react2.default.createElement(_Input2.default, { type: 'text', defaultValue: name, onChange: function onChange(e) {
              _this6.changeConfig(e, 'name');
            } })
        ),
        _react2.default.createElement(
          _Label2.default,
          { name: 'author' },
          _react2.default.createElement(_Input2.default, { type: 'text', defaultValue: author, onChange: function onChange(e) {
              _this6.changeConfig(e, 'author');
            } })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state3 = this.state,
          currentSource = _state3.currentSource,
          sources = _state3.sources,
          width = _state3.width,
          height = _state3.height,
          controls = _state3.controls,
          autoplay = _state3.autoplay,
          muted = _state3.muted,
          loop = _state3.loop,
          errorMsg = _state3.errorMsg,
          errorMsgVisible = _state3.errorMsgVisible;
      var _props3 = this.props,
          type = _props3.type,
          title = _props3.title,
          visible = _props3.visible,
          progress = _props3.progress;


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
              { src: currentSource, controls: 'controls', style: { width: '400px', height: '250px', backgroundColor: '#000' } },
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