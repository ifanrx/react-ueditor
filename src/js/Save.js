import React, {Fragment} from 'react'
import ReactJson from 'react-json-view'

class Save extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ueditor: this.props.ue,
      savejson: {},
      savehtml: null,
    }
  }

  componentWillMount() {}

  componentDidMount() {
    console.log('save componentDidMount')
    this.getTrueValue()
  }

  getTrueValue = () => {
    const self = this
    const {ueditor} = self.state
    ueditor.queryCommandState('source') === 0 ? ueditor.execCommand('source') : false

    if (ueditor.hasContents()) {
      ueditor.sync()

      let fields = 0
      let formeditor = ueditor.getContent()
      let parse_form = this.parse_form(formeditor, fields)
      console.log('parse_form++++++++', parse_form)

      document.querySelector('#viewHtml').innerHTML = formeditor
      ueditor.execCommand('source')
      self.props.onChange(parse_form)

      self.setState({
        savehtml: formeditor,
        savejson: parse_form,
      })
    } else {
      return false
    }
  }

  parse_form = (template, fields) => {
    console.log('template, fields', template, fields)
    let preg = /(\|-<span(((?!<span).)*leipiplugins=\"(radios|checkboxs|select)\".*?)>(.*?)<\/span>-\||<(img|input|textarea|select).*?(<\/select>|<\/textarea>|\/>))/gi
    let preg_attr = /(\w+)=\"(.?|.+?)\"/gi
    let preg_group = /<input.*?\/>/gi
    if (!fields) fields = 0

    let template_parse = template
    let template_data = []
    let add_fields = {}
    let checkboxs = 0

    let pno = 0
    template.replace(preg, function(plugin, p1, p2, p3, p4, p5, p6) {
      let parse_attr = []
      let attr_arr_all = {}
      let name = ''
      let select_dot = ''
      let is_new = false
      let p0 = plugin
      let tag = p6 || p4

      if (tag == 'radios' || tag == 'checkboxs') {
        plugin = p2
      } else if (tag == 'select') {
        plugin = plugin.replace('|-', '')
        plugin = plugin.replace('-|', '')
      }
      plugin.replace(preg_attr, function(str0, attr, val) {
        if (attr == 'name') {
          if (val == 'leipiNewField') {
            is_new = true
            fields++
            val = 'data_' + fields
          }
          name = val
        }

        if (tag == 'select' && attr == 'value') {
          if (!attr_arr_all[attr]) attr_arr_all[attr] = ''
          attr_arr_all[attr] += select_dot + val
          select_dot = ','
        } else {
          attr_arr_all[attr] = val
        }
        let oField = {}
        oField[attr] = val
        parse_attr.push(oField)
      })
      if (tag == 'checkboxs') {
        plugin = p0
        plugin = plugin.replace('|-', '')
        plugin = plugin.replace('-|', '')
        let name = 'checkboxs_' + checkboxs
        attr_arr_all['parse_name'] = name
        attr_arr_all['name'] = ''
        attr_arr_all['value'] = ''

        attr_arr_all['content'] = '<span leipiplugins="checkboxs"  title="' + attr_arr_all['title'] + '">'
        let dot_name = ''
        let dot_value = ''
        p5.replace(preg_group, function(parse_group) {
          let is_new = false
          let option = {}
          parse_group.replace(preg_attr, function(str0, k, val) {
            if (k == 'name') {
              if (val == 'leipiNewField') {
                is_new = true
                fields++
                val = 'data_' + fields
              }

              attr_arr_all['name'] += dot_name + val
              dot_name = ','
            } else if (k == 'value') {
              attr_arr_all['value'] += dot_value + val
              dot_value = ','
            }
            option[k] = val
          })

          if (!attr_arr_all['options']) attr_arr_all['options'] = new Array()
          attr_arr_all['options'].push(option)
          // if(!option['checked']) option['checked'] = '';
          let checked = option['checked'] != undefined ? 'checked="checked"' : ''
          attr_arr_all['content'] += '<input type="checkbox" name="' + option['name'] + '" value="' + option['value'] + '"  ' + checked + '/>' + option['value'] + '&nbsp;'

          if (is_new) {
            let arr = {}
            arr['name'] = option['name']
            arr['leipiplugins'] = attr_arr_all['leipiplugins']
            add_fields[option['name']] = arr
          }
        })
        attr_arr_all['content'] += '</span>'

        // parse
        template = template.replace(plugin, attr_arr_all['content'])
        template_parse = template_parse.replace(plugin, '{' + name + '}')
        template_parse = template_parse.replace('{|-', '')
        template_parse = template_parse.replace('-|}', '')
        template_data[pno] = attr_arr_all
        checkboxs++
      } else if (name) {
        if (tag == 'radios') {
          /* 单选组  一个字段 */
          plugin = p0
          plugin = plugin.replace('|-', '')
          plugin = plugin.replace('-|', '')
          attr_arr_all['value'] = ''
          attr_arr_all['content'] = '<span leipiplugins="radios" name="' + attr_arr_all['name'] + '" title="' + attr_arr_all['title'] + '">'
          let dot = ''
          p5.replace(preg_group, function(parse_group) {
            let option = {}
            parse_group.replace(preg_attr, function(str0, k, val) {
              if (k == 'value') {
                attr_arr_all['value'] += dot + val
                dot = ','
              }
              option[k] = val
            })
            option['name'] = attr_arr_all['name']
            if (!attr_arr_all['options']) attr_arr_all['options'] = []
            attr_arr_all['options'].push(option)
            // if(!option['checked']) option['checked'] = '';
            let checked = option['checked'] != undefined ? 'checked="checked"' : ''
            attr_arr_all['content'] += '<input type="radio" name="' + attr_arr_all['name'] + '" value="' + option['value'] + '"  ' + checked + '/>' + option['value'] + '&nbsp;'
          })
          attr_arr_all['content'] += '</span>'
        } else {
          attr_arr_all['content'] = is_new ? plugin.replace(/leipiNewField/, name) : plugin
        }
        // attr_arr_all['itemid'] = fields;
        // attr_arr_all['tag'] = tag;
        template = template.replace(plugin, attr_arr_all['content'])
        template_parse = template_parse.replace(plugin, '{' + name + '}')
        template_parse = template_parse.replace('{|-', '')
        template_parse = template_parse.replace('-|}', '')
        if (is_new) {
          let arr = {
            name: name,
            leipiplugins: attr_arr_all['leipiplugins'],
          }
          add_fields[arr.name] = arr
        }
        template_data[pno] = attr_arr_all
      }
      pno++
    })
    let parse_form = {
      fields: fields, // 总字段数
      template: template, // 完整html
      parse: template_parse, // 控件替换为{data_1}的html
      data: template_data, // 控件属性
      add_fields: add_fields, // 新增控件
    }
    // return JSON.stringify(parse_form)
    return parse_form
  }

  render() {
    let self = this
    const {ueditor, savejson, savehtml} = self.state
    console.log('save ---- ueditor', ueditor)

    return (
      <div className='dling-contrast'>
        <div id='viewHtml' />
        <div id='viewJson'>
          <ReactJson src={savejson} iconStyle='triangle' collapseStringsAfterLength={20} />
        </div>
      </div>
    )
  }
}

export default Save
