export function extractImageSource(html) {
  let imgReg = /<img.*?(?:>|\/>)/gi
  let srcReg = /src=['"]?([^'"]*)['"]?/i
  let arr = html.match(imgReg)
  let imgSrc = []

  if (!arr) return html

  for (let i = 0; i < arr.length; i++) {
    let src = arr[i].match(srcReg)[1]
    src && imgSrc.push(src)
  }
  return imgSrc
}

export function replaceImageSource(html, origin, target) {
  return html.replace(/<img.*?src="(.*?)".*?\/?>/ig, function(img, src) {
    return src === origin ? img.replace(src, target) : img
  })
}

const linkRegString = '^((https|http|ftp|rtsp|mms)?://)' +
  '?(([0-9a-zA-Z_!~*\'().&=+$%-]+: )?[0-9a-zA-Z_!~*\'().&=+$%-]+@)?' + // ftp的user@
  '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
  '|' + // 允许IP和DOMAIN（域名）
  '([0-9a-zA-Z_!~*\'()-]+.)*' + // 域名- www.
  '([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].' + // 二级域名
  '[a-zA-Z]{2,6})' + // first level domain- .com or .museum
  '(:[0-9]{1,4})?' + // port - :80
  '((/?)|' + // a slash isn't required if there is no file name
  '(/[0-9a-zA-Z_!~*\'().;?:@&=+$,%#-]+)+/?)$'
export const linkRegx = new RegExp(linkRegString, 'i')
