import React, {Fragment} from 'react'
import ReactUeditor from '../src/js'

class Formdesign extends React.Component {
  constructor() {
    super()
    this.ueditorRef = null
    this.leipiFormDesign = null
    this.state = {
      content: '',
    }
  }

  updateEditorContent = content => {
    this.content = content
  }

  getUeditor = ref => {
    this.ueditorRef = ref
  }

  handleReady = () => {
    const leipiEditor = this.ueditorRef
    this.leipiFormDesign = {
      exec: function(method) {
        leipiEditor.execCommand(method)
      },
      /*
		Javascript 解析表单
		template 表单设计器里的Html内容
		fields 字段总数
	*/
      parse_form: function(template, fields) {
        console.log('template, fields', template, fields)
        // 正则  radios|checkboxs|select 匹配的边界 |--|  因为当使用 {} 时js报错
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
          // alert(tag + " \n- t1 - "+p1 +" \n-2- " +p2+" \n-3- " +p3+" \n-4- " +p4+" \n-5- " +p5+" \n-6- " +p6);

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
          /* alert(JSON.stringify(parse_attr));return; */
          if (tag == 'checkboxs') {
            /* 复选组  多个字段 */
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
                if (!attr_arr_all['options']) attr_arr_all['options'] = new Array()
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
              let arr = {}
              arr['name'] = name
              arr['leipiplugins'] = attr_arr_all['leipiplugins']
              add_fields[arr['name']] = arr
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
        return JSON.stringify(parse_form)
      },
      /* type  =  save 保存设计 versions 保存版本  close关闭 */
      fnCheckForm: function(type) {
        if (leipiEditor.queryCommandState('source')) leipiEditor.execCommand('source') // 切换到编辑模式才提交，否则有bug

        if (leipiEditor.hasContents()) {
          leipiEditor.sync() /* 同步内容 */

          alert('你点击了保存,这里可以异步提交，请自行处理....')
          return false
        }
      },
      /* 预览表单 */
      fnReview: function() {
        if (leipiEditor.queryCommandState('source')) leipiEditor.execCommand('source') /* 切换到编辑模式才提交，否则部分浏览器有bug */

        if (leipiEditor.hasContents()) {
          leipiEditor.sync() /* 同步内容 */

          // alert('你点击了预览,请自行处理....')
          // return false
          // --------------以下仅参考-------------------------------------------------------------------

          /* 设计form的target 然后提交至一个新的窗口进行预览 */
          document.saveform.target = 'mywin'
          window.open('', 'mywin', 'menubar=0,toolbar=0,status=0,resizable=1,left=0,top=0,scrollbars=1,width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 50) + '"')

          document.saveform.action = '/index.php?s=/index/preview.html'
          document.saveform.submit() // 提交表单
        } else {
          alert('表单内容不能为空！')
          return false
        }
      },
    }
  }

  ueClick = type => {
    console.log('ueClick', type)
    this.leipiFormDesign.exec(type)
  }

  render() {
    return (
      <Fragment>
        <p>
          一栏布局：
          <br />
          <br />
          <button type='button' onClick={() => this.ueClick('text')} className='btn btn-info'>
            文本框
          </button>
          <button type='button' onClick={() => this.ueClick('textarea')} className='btn btn-info'>
            多行文本
          </button>
          <button type='button' onClick={() => this.ueClick('select')} className='btn btn-info'>
            下拉菜单
          </button>
          <button type='button' onClick={() => this.ueClick('radios')} className='btn btn-info'>
            单选框
          </button>
          <button type='button' onClick={() => this.ueClick('checkboxs')} className='btn btn-info'>
            复选框
          </button>
          <button type='button' onClick={() => this.ueClick('macros')} className='btn btn-info'>
            宏控件
          </button>
          <button type='button' onClick={() => this.ueClick('progressbar')} className='btn btn-info'>
            进度条
          </button>
          <button type='button' onClick={() => this.ueClick('qrcode')} className='btn btn-info'>
            二维码
          </button>
          <button type='button' onClick={() => this.ueClick('listctrl')} className='btn btn-info'>
            列表控件
          </button>
          <button type='button' onClick={() => this.ueClick('more')} className='btn btn-primary'>
            一起参与...
          </button>
        </p>
        <ReactUeditor
          debug
          ueditorPath='../vendor/ueditor'
          plugins={['insertInput', 'insertTextarea', 'insertSelect', 'insertRadios', 'insertCheckboxs', 'insertListctrl', 'saveJson']}
          uploadImage={this.uploadImage}
          getRef={this.getUeditor}
          onChange={this.updateEditorContent}
          onReady={this.handleReady}
        />
      </Fragment>
    )
  }
}

export default Formdesign
