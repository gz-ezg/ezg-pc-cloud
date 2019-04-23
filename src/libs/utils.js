/* eslint-disable */
/**
 * 日期格式转换 YYYY-MM-DD
 * @param {*} date 
 */


export function DateFormat(date){
    if(date==null||date == ''){
        return ''
    }else{
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
    }
}

//  日期格式转换    YYYYMMDD
export function DateFormat2(date){
    if(date==null||date == ''){
        return null
    }else{
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
    }
}

//  YYYY-MM-DD HH:MM:SS
export function FULLDateFormat(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var hour ='' + d.getHours(),
        miniutes ='' + d.getMinutes(),
        seconds ='' + d.getSeconds()
    if (hour.length < 2) hour = '0' + hour;
    if (miniutes.length < 2) miniutes = '0' + miniutes;
    if (seconds.length < 2) seconds = '0' + seconds;    
    return [year, month, day].join('-')+' '+ [hour,miniutes,seconds].join(':');
}

//  数组转map
export function arrayToMap(array){
    if(array==""||array==null){
        return ;
    }else{
        let tempMap = new Map()
        for(let i = 0;i<array.length;i++){
            tempMap.set(array[i].typecode,array[i].typename)
        }
        return tempMap
    }
    
}
//  日期转YYYY-MM
export function DateFormatYearMonth(date){
    if(date==null||date == ''){
        return ''
    }else{
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;

    return [year, month].join('-');
    }
}

//简单的数据字典转换
export function simpleCodeToText(codeValue,textList){
    for (let i = 0; i < textList.length; i++) {
        if (textList[i].typecode == codeValue && codeValue != "") {
            return textList[i].typename;
        }
    }
}