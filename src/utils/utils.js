export const mergeUrl = (url, config) => {
  let temUrl = `${url}?`
  Object.keys(config).forEach(v => {
    if (config[v]) {
      temUrl = `${temUrl}${v}=${config[v]}&`
    }
  })
  return temUrl.replace('&$', '')
}

export function DateFormat(date) {
  if (date == null || date == '') {
    return ''
  } else {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [year, month, day].join('-')
  }
}
