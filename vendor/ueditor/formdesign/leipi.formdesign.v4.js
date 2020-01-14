/*
 * 设计器私有的配置说明
 * 一
 * UE.leipiFormDesignUrl  插件路径
 *
 * 二
 *UE.getEditor('myFormDesign',{
 *          toolleipi:true,//是否显示，设计器的清单 tool
 */

UE.leipiFormDesignUrl = 'formdesign'
/**
 * 文本框
 * @command textfield
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'textfield');
 * ```
 */
UE.plugins['text'] = function() {
  const me = this
  const thePlugins = 'text'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/text.html`,
        name: thePlugins,
        editor: this,
        title: '文本框',
        cssRules: 'width:600px;height:310px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/input/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 宏控件
 * @command macros
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'macros');
 * ```
 */
UE.plugins['macros'] = function() {
  const me = this
  const thePlugins = 'macros'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/macros.html`,
        name: thePlugins,
        editor: this,
        title: '宏控件',
        cssRules: 'width:600px;height:270px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/input/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>宏控件: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 单选框
 * @command radio
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'radio');
 * ```

/**
 * 复选框
 * @command checkbox
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'checkbox');
 * ```
 */

/**
 * 单选框组
 * @command radios
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'radio');
 * ```
 */
UE.plugins['radios'] = function() {
  const me = this
  const thePlugins = 'radios'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/radios.html`,
        name: thePlugins,
        editor: this,
        title: '单选框组',
        cssRules: 'width:590px;height:370px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/span/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>单选框组: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        const elInput = el.getElementsByTagName('input')
        const rEl = elInput.length > 0 ? elInput[0] : el
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(rEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 复选框组
 * @command checkboxs
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'checkboxs');
 * ```
 */
UE.plugins['checkboxs'] = function() {
  const me = this
  const thePlugins = 'checkboxs'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/checkboxs.html`,
        name: thePlugins,
        editor: this,
        title: '复选框组',
        cssRules: 'width:600px;height:400px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/span/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>复选框组: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        const elInput = el.getElementsByTagName('input')
        const rEl = elInput.length > 0 ? elInput[0] : el
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(rEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 多行文本框
 * @command textarea
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'textarea');
 * ```
 */
UE.plugins['textarea'] = function() {
  const me = this
  const thePlugins = 'textarea'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/textarea.html`,
        name: thePlugins,
        editor: this,
        title: '多行文本框',
        cssRules: 'width:600px;height:330px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    if (/textarea/gi.test(el.tagName)) {
      const html = popup.formatHtml('<nobr>多行文本框: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 下拉菜单
 * @command select
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'select');
 * ```
 */
UE.plugins['select'] = function() {
  const me = this
  const thePlugins = 'select'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/select.html`,
        name: thePlugins,
        editor: this,
        title: '下拉菜单',
        cssRules: 'width:590px;height:370px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    let el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/select|span/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>下拉菜单: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        if (el.tagName == 'SPAN') {
          const elInput = el.getElementsByTagName('select')
          el = elInput.length > 0 ? elInput[0] : el
        }
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 进度条
 * @command progressbar
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'progressbar');
 * ```
 */
UE.plugins['progressbar'] = function() {
  const me = this
  const thePlugins = 'progressbar'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/progressbar.html`,
        name: thePlugins,
        editor: this,
        title: '进度条',
        cssRules: 'width:600px;height:450px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/img/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>进度条: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 二维码
 * @command qrcode
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'qrcode');
 * ```
 */
UE.plugins['qrcode'] = function() {
  const me = this
  const thePlugins = 'qrcode'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/qrcode.html`,
        name: thePlugins,
        editor: this,
        title: '二维码',
        cssRules: 'width:600px;height:370px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/img/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>二维码: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
/**
 * 列表控件
 * @command listctrl
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @example
 * ```javascript
 * editor.execCommand( 'qrcode');
 * ```
 */
UE.plugins['listctrl'] = function() {
  const me = this
  const thePlugins = 'listctrl'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/listctrl.html`,
        name: thePlugins,
        editor: this,
        title: '列表控件',
        cssRules: 'width:800px;height:400px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
          {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick() {
              dialog.close(false)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
  var popup = new baidu.editor.ui.Popup({
    editor: this,
    content: '',
    className: 'edui-bubble',
    _edittext() {
      baidu.editor.plugins[thePlugins].editdom = popup.anchorEl
      me.execCommand(thePlugins)
      this.hide()
    },
    _delete() {
      if (window.confirm('确认删除该控件吗？')) {
        baidu.editor.dom.domUtils.remove(this.anchorEl, false)
      }
      this.hide()
    },
  })
  popup.render()
  me.addListener('mouseover', function(t, evt) {
    evt = evt || window.event
    const el = evt.target || evt.srcElement
    const leipiPlugins = el.getAttribute('leipiplugins')
    if (/input/gi.test(el.tagName) && leipiPlugins == thePlugins) {
      const html = popup.formatHtml('<nobr>列表控件: <span onclick=$$._edittext() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>')
      if (html) {
        popup.getDom('content').innerHTML = html
        popup.anchorEl = el
        popup.showAnchor(popup.anchorEl)
      } else {
        popup.hide()
      }
    }
  })
}
UE.plugins['more'] = function() {
  const me = this
  const thePlugins = 'more'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/more.html`,
        name: thePlugins,
        editor: this,
        title: '玩转表单设计器，一起参与，帮助完善',
        cssRules: 'width:600px;height:200px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
}
UE.plugins['error'] = function() {
  const me = this
  const thePlugins = 'error'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/error.html`,
        name: thePlugins,
        editor: this,
        title: '异常提示',
        cssRules: 'width:400px;height:130px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
}
UE.plugins['leipi'] = function() {
  const me = this
  const thePlugins = 'leipi'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/leipi.html`,
        name: thePlugins,
        editor: this,
        title: '表单设计器 - 清单',
        cssRules: 'width:620px;height:220px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
}
UE.plugins['leipi_template'] = function() {
  const me = this
  const thePlugins = 'leipi_template'
  me.commands[thePlugins] = {
    execCommand() {
      var dialog = new UE.ui.Dialog({
        iframeUrl: `${this.options.UEDITOR_HOME_URL + UE.leipiFormDesignUrl}/template.html`,
        name: thePlugins,
        editor: this,
        title: '表单模板',
        cssRules: 'width:640px;height:380px;',
        buttons: [
          {
            className: 'edui-okbutton',
            label: '确定',
            onclick() {
              dialog.close(true)
            },
          },
        ],
      })
      dialog.render()
      dialog.open()
    },
  }
}

UE.registerUI('button_leipi', function(editor, uiName) {
  if (!this.options.toolleipi) {
    return false
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand() {
      editor.execCommand('leipi')
    },
  })
  // 创建一个button
  const btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '表单设计器',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -401px -40px;',
    // 点击时执行的命令
    onclick() {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName)
    },
  })
  /*
    //当点到编辑内容上时，按钮要做的状态反射
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
*/
  // 因为你是添加button,所以需要返回这个button
  return btn
})
UE.registerUI('button_template', function(editor, uiName) {
  if (!this.options.toolleipi) {
    return false
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand() {
      try {
        leipiFormDesign.exec('leipi_template')
        // leipiFormDesign.fnCheckForm('save');
      } catch (e) {
        alert('打开模板异常')
      }
    },
  })
  // 创建一个button
  const btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '表单模板',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -339px -40px;',
    // 点击时执行的命令
    onclick() {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName)
    },
  })

  // 因为你是添加button,所以需要返回这个button
  return btn
})
UE.registerUI('button_preview', function(editor, uiName) {
  if (!this.options.toolleipi) {
    return false
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand() {
      try {
        leipiFormDesign.fnReview()
      } catch (e) {
        alert('leipiFormDesign.fnReview 预览异常')
      }
    },
  })
  // 创建一个button
  const btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '预览',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -420px -19px;',
    // 点击时执行的命令
    onclick() {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName)
    },
  })

  // 因为你是添加button,所以需要返回这个button
  return btn
})

UE.registerUI('button_save', function(editor, uiName) {
  if (!this.options.toolleipi) {
    return false
  }
  // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
  editor.registerCommand(uiName, {
    execCommand() {
      try {
        leipiFormDesign.fnCheckForm('save')
      } catch (e) {
        alert('leipiFormDesign.fnCheckForm("save") 保存异常')
      }
    },
  })
  // 创建一个button
  const btn = new UE.ui.Button({
    // 按钮的名字
    name: uiName,
    // 提示
    title: '保存表单',
    // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
    cssRules: 'background-position: -481px -20px;',
    // 点击时执行的命令
    onclick() {
      // 这里可以不用执行命令,做你自己的操作也可
      editor.execCommand(uiName)
    },
  })

  // 因为你是添加button,所以需要返回这个button
  return btn
})
