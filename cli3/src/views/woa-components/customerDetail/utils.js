export function DateFormat(date){
    if(date==null||date == ''){
        return null
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