"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractImageSource = extractImageSource;
exports.replaceImageSource = replaceImageSource;
exports.linkRegx = void 0;

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

var linkRegString = '^((https|http|ftp|rtsp|mms)?://)' + '?(([0-9a-zA-Z_!~*\'().&=+$%-]+: )?[0-9a-zA-Z_!~*\'().&=+$%-]+@)?' + // ftp的user@
'(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
'|' + // 允许IP和DOMAIN（域名）
'([0-9a-zA-Z_!~*\'()-]+.)*' + // 域名- www.
'([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].' + // 二级域名
'[a-zA-Z]{2,6})' + // first level domain- .com or .museum
'(:[0-9]{1,4})?' + // port - :80
'((/?)|' + // a slash isn't required if there is no file name
'(/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
var linkRegx = new RegExp(linkRegString, 'i');
exports.linkRegx = linkRegx;