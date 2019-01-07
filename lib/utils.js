"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractImageSource = extractImageSource;
exports.replaceImageSource = replaceImageSource;

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