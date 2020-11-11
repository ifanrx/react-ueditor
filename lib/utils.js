"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractImageSource = extractImageSource;
exports.replaceImageSource = replaceImageSource;
exports.toast = void 0;

function extractImageSource(html) {
  var imgReg = /<img.*?(?:>|\/>)/gi;
  var srcReg = /src=['"]?([^'"]*)['"]?/i;
  var arr = html.match(imgReg);
  var imgSrc = [];
  if (!arr) return html;

  for (var i = 0; i < arr.length; i++) {
    var src = arr[i].match(srcReg)[1];
    src && imgSrc.push(src);
  }

  return imgSrc;
}

function replaceImageSource(html, origin, target) {
  return html.replace(/<img.*?src="(.*?)".*?\/?>/ig, function (img, src) {
    return src === origin ? img.replace(src, target) : img;
  });
}

var toast = function toast(text, duration) {
  if (!text || !text.length) return;
  duration = duration || 1000;
  var root = document.body;
  var toastDom = document.createElement('div');
  toastDom.setAttribute('id', 'toast');
  toastDom.setAttribute('style', "display: flex;\n    justify-content: center;\n    align-items: center;\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 9999;\n    background: rgba(0, 0, 0, 0);");
  var textDom = document.createElement('div');
  textDom.setAttribute('style', "background: rgba(0, 0, 0, 0.2);\n    padding: 5px 10px;\n    border-radius: 4px;\n    color: #fff;\n    font-size: 13px;");
  textDom.innerHTML = text;
  toastDom.append(textDom);
  root.append(toastDom);
  setTimeout(function () {
    var toast = document.getElementById('toast');
    toast.remove();
  }, duration);
};

exports.toast = toast;