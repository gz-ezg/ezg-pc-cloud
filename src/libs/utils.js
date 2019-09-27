/* eslint-disable */
/**
 * 日期格式转换 YYYY-MM-DD
 * @param {*} date
 */

export function DateFormat(date) {
  if (date == null || date == '') {
    return ''
  } else {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
}

//  日期格式转换    YYYYMMDD
export function DateFormat2(date) {
  if (date == null || date == '') {
    return null
  } else {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('')
  }
}

//  YYYY-MM-DD HH:MM:SS
export function FULLDateFormat(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  var hour = '' + d.getHours(),
    miniutes = '' + d.getMinutes(),
    seconds = '' + d.getSeconds()
  if (hour.length < 2) hour = '0' + hour
  if (miniutes.length < 2) miniutes = '0' + miniutes
  if (seconds.length < 2) seconds = '0' + seconds
  return (
    [year, month, day].join('-') + ' ' + [hour, miniutes, seconds].join(':')
  )
}

//  数组转map
export function arrayToMap(array) {
  if (array == '' || array == null) {
    return
  } else {
    let tempMap = new Map()
    for (let i = 0; i < array.length; i++) {
      tempMap.set(array[i].typecode, array[i].typename)
    }
    return tempMap
  }
}
//  日期转YYYY-MM
export function DateFormatYearMonth(date) {
  if (date == null || date == '') {
    return ''
  } else {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month

    return [year, month].join('-')
  }
}
//  日期转YYYY-MM
export function nowDateFormatYearMonth(value) {
  var d = value ? new Date(value) : new Date(),
    month = d.getMonth() + 1,
    year = d.getFullYear()
  if (month.length < 2) month = '0' + month
  console.log(`${year}${month}`)
  return `${year}${month}`
}
//YYYYMM 本月的上个月
export function DateFormatYearMonth2(date) {
  if (date == null || date == '') {
    return ''
  } else {
    var d = new Date(date),
      month = '' + d.getMonth(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month

    return [year, month].join('-')
  }
}

//简单的数据字典转换
export function simpleCodeToText(codeValue, textList) {
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].typecode == codeValue && codeValue != '') {
      return textList[i].typename
    }
  }
}

//  两个时间的差值
export function DateDifference(faultDate, completeTime) {
  // let d1 = new Date(faultDate);
  // let d2 = new Date(completeTime);
  let stime = new Date(faultDate).getTime()
  let etime = new Date(completeTime).getTime()
  let usedTime = etime - stime //两个时间戳相差的毫秒数
  let days = Math.floor(usedTime / (24 * 3600 * 1000))
  //计算出小时数
  let leave1 = usedTime % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  let hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60 * 1000))
  let time = days + '天' + hours + '时' + minutes + '分'
  return time
}

//  YYYY-MM-DD 08:00:00
export function FixFULLDateFormat() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  var hour = '' + '08',
    miniutes = '' + '00',
    seconds = '' + '00'
  // if (hour.length < 2) hour = '0' + hour;
  // if (miniutes.length < 2) miniutes = '0' + miniutes;
  // if (seconds.length < 2) seconds = '0' + seconds;
  return (
    [year, month, day].join('-') + ' ' + [hour, miniutes, seconds].join(':')
  )
}

//深拷贝
export function deepCopy(obj) {
  if (obj && typeof obj === 'object') {
    let result = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          result[key] = deepCopy(obj[key])
        } else {
          result[key] = obj[key]
        }
      }
    }
    return result
  } else {
    console.log('深拷贝对象类型不对！！！！！！！！！')
    return
  }
}
