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
