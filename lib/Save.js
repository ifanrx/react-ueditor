"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJsonView = _interopRequireDefault(require("react-json-view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Save =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Save, _React$Component);

  function Save(props) {
    var _this;

    _classCallCheck(this, Save);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Save).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getTrueValue", function () {
      var self = _assertThisInitialized(_this);

      var ueditor = self.state.ueditor;
      ueditor.queryCommandState('source') === 0 ? ueditor.execCommand('source') : false;

      if (ueditor.hasContents()) {
        ueditor.sync();
        var fields = 0;
        var formeditor = ueditor.getContent();

        var parse_form = _this.parse_form(formeditor, fields);

        var saveValue = _objectSpread({
          html: formeditor
        }, parse_form); // console.log('parse_form++++++++', parse_form)
        // document.querySelector('#viewHtml').innerHTML = formeditor


        ueditor.execCommand('source');
        self.props.onChange(saveValue);
        self.setState({
          savehtml: saveValue,
          savejson: parse_form
        });
      } else {
        return false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "parse_form", function (template, fields) {
      // console.log('template, fields', template, fields)
      var preg = /(\|-<span(((?!<span).)*leipiplugins=\"(radios|checkboxs|select)\".*?)>(.*?)<\/span>-\||<(img|input|textarea|select).*?(<\/select>|<\/textarea>|\/>))/gi;
      var preg_attr = /(\w+)=\"(.?|.+?)\"/gi;
      var preg_group = /<input.*?\/>/gi;
      if (!fields) fields = 0;
      var template_parse = template;
      var template_data = [];
      var add_fields = {};
      var checkboxs = 0;
      var pno = 0;
      template.replace(preg, function (plugin, p1, p2, p3, p4, p5, p6) {
        var parse_attr = [];
        var attr_arr_all = {};
        var name = '';
        var select_dot = '';
        var is_new = false;
        var p0 = plugin;
        var tag = p6 || p4;

        if (tag == 'radios' || tag == 'checkboxs') {
          plugin = p2;
        } else if (tag == 'select') {
          plugin = plugin.replace('|-', '');
          plugin = plugin.replace('-|', '');
        }

        plugin.replace(preg_attr, function (str0, attr, val) {
          if (attr == 'name') {
            if (val == 'leipiNewField') {
              is_new = true;
              fields++;
              val = 'data_' + fields;
            }

            name = val;
          }

          if (tag == 'select' && attr == 'value') {
            if (!attr_arr_all[attr]) attr_arr_all[attr] = '';
            attr_arr_all[attr] += select_dot + val;
            select_dot = ',';
          } else {
            attr_arr_all[attr] = val;
          }

          var oField = {};
          oField[attr] = val;
          parse_attr.push(oField);
        });

        if (tag == 'checkboxs') {
          plugin = p0;
          plugin = plugin.replace('|-', '');
          plugin = plugin.replace('-|', '');

          var _name = 'checkboxs_' + checkboxs;

          attr_arr_all['parse_name'] = _name;
          attr_arr_all['name'] = '';
          attr_arr_all['value'] = '';
          attr_arr_all['content'] = '<span leipiplugins="checkboxs"  title="' + attr_arr_all['title'] + '">';
          var dot_name = '';
          var dot_value = '';
          p5.replace(preg_group, function (parse_group) {
            var is_new = false;
            var option = {};
            parse_group.replace(preg_attr, function (str0, k, val) {
              if (k == 'name') {
                if (val == 'leipiNewField') {
                  is_new = true;
                  fields++;
                  val = 'data_' + fields;
                }

                attr_arr_all['name'] += dot_name + val;
                dot_name = ',';
              } else if (k == 'value') {
                attr_arr_all['value'] += dot_value + val;
                dot_value = ',';
              }

              option[k] = val;
            });
            if (!attr_arr_all['options']) attr_arr_all['options'] = new Array();
            attr_arr_all['options'].push(option); // if(!option['checked']) option['checked'] = '';

            var checked = option['checked'] != undefined ? 'checked="checked"' : '';
            attr_arr_all['content'] += '<input type="checkbox" name="' + option['name'] + '" value="' + option['value'] + '"  ' + checked + '/>' + option['value'] + '&nbsp;';

            if (is_new) {
              var arr = {};
              arr['name'] = option['name'];
              arr['leipiplugins'] = attr_arr_all['leipiplugins'];
              add_fields[option['name']] = arr;
            }
          });
          attr_arr_all['content'] += '</span>'; // parse

          template = template.replace(plugin, attr_arr_all['content']);
          template_parse = template_parse.replace(plugin, '{' + _name + '}');
          template_parse = template_parse.replace('{|-', '');
          template_parse = template_parse.replace('-|}', '');
          template_data[pno] = attr_arr_all;
          checkboxs++;
        } else if (name) {
          if (tag == 'radios') {
            /* 单选组  一个字段 */
            plugin = p0;
            plugin = plugin.replace('|-', '');
            plugin = plugin.replace('-|', '');
            attr_arr_all['value'] = '';
            attr_arr_all['content'] = '<span leipiplugins="radios" name="' + attr_arr_all['name'] + '" title="' + attr_arr_all['title'] + '">';
            var dot = '';
            p5.replace(preg_group, function (parse_group) {
              var option = {};
              parse_group.replace(preg_attr, function (str0, k, val) {
                if (k == 'value') {
                  attr_arr_all['value'] += dot + val;
                  dot = ',';
                }

                option[k] = val;
              });
              option['name'] = attr_arr_all['name'];
              if (!attr_arr_all['options']) attr_arr_all['options'] = [];
              attr_arr_all['options'].push(option); // if(!option['checked']) option['checked'] = '';

              var checked = option['checked'] != undefined ? 'checked="checked"' : '';
              attr_arr_all['content'] += '<input type="radio" name="' + attr_arr_all['name'] + '" value="' + option['value'] + '"  ' + checked + '/>' + option['value'] + '&nbsp;';
            });
            attr_arr_all['content'] += '</span>';
          } else {
            attr_arr_all['content'] = is_new ? plugin.replace(/leipiNewField/, name) : plugin;
          } // attr_arr_all['itemid'] = fields;
          // attr_arr_all['tag'] = tag;


          template = template.replace(plugin, attr_arr_all['content']);
          template_parse = template_parse.replace(plugin, '{' + name + '}');
          template_parse = template_parse.replace('{|-', '');
          template_parse = template_parse.replace('-|}', '');

          if (is_new) {
            var arr = {
              name: name,
              leipiplugins: attr_arr_all['leipiplugins']
            };
            add_fields[arr.name] = arr;
          }

          template_data[pno] = attr_arr_all;
        }

        pno++;
      });
      var parse_form = {
        fields: fields,
        // 总字段数
        // template: template, // 完整html
        // parse: template_parse, // 控件替换为{data_1}的html
        data: template_data // 控件属性
        // add_fields: add_fields, // 新增控件

      }; // return JSON.stringify(parse_form)

      return parse_form;
    });

    _defineProperty(_assertThisInitialized(_this), "viewShow", function () {
      _this.setState({
        isShow: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeName", function (e) {
      var self = _assertThisInitialized(_this); // console.log('changename', e.target.value)


      var value = e.target.value;
      var jsons = self.state.savehtml;
      self.props.onChange(_objectSpread({}, jsons, {
        formname: value
      }));
      self.setState({
        formval: value
      });
    });

    _this.state = {
      ueditor: _this.props.ue,
      isShow: false,
      formval: '',
      savejson: {},
      savehtml: null
    };
    return _this;
  }

  _createClass(Save, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // console.log('save componentDidMount')
      this.getTrueValue();
    }
  }, {
    key: "render",
    value: function render() {
      var self = this;
      var _self$state = self.state,
          ueditor = _self$state.ueditor,
          savejson = _self$state.savejson,
          isShow = _self$state.isShow,
          formval = _self$state.formval;
      var Ifurl = "".concat(ueditor.options.UEDITOR_HOME_URL, "dialogs/preview/preview.html"); // console.log('save ---- ueditor', ueditor, Ifurl)

      return _react["default"].createElement("div", {
        className: "dling-contrast"
      }, _react["default"].createElement("form", {
        className: "formname"
      }, _react["default"].createElement("label", {
        className: "lablename",
        htmlFor: "FORMNAME"
      }, "\u8868\u540D:"), _react["default"].createElement("input", {
        type: "text",
        id: "FORMNAME",
        placeholder: "\u8BF7\u8F93\u5165\u8868\u5355\u540D\u79F0",
        alt: "\u8F93\u5165\u8868\u5355",
        ref: "getFocus",
        defaultValue: formval,
        onChange: this.changeName
      }), _react["default"].createElement("span", {
        className: "viewname",
        alt: "\u67E5\u770B\u9884\u89C8",
        onClick: this.viewShow
      }, "\u67E5\u770B\u9884\u89C8")), isShow ? _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
        id: "viewHtml"
      }, _react["default"].createElement("iframe", {
        id: "edui117_iframe",
        src: Ifurl,
        width: "100%",
        height: "100%"
      })), _react["default"].createElement("div", {
        id: "viewJson"
      }, _react["default"].createElement(_reactJsonView["default"], {
        src: savejson,
        iconStyle: "triangle",
        collapsed: 1,
        collapseStringsAfterLength: 20
      }))) : false);
    }
  }]);

  return Save;
}(_react["default"].Component);

var _default = Save;
exports["default"] = _default;