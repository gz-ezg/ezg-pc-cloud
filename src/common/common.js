/* eslint-disable */
// 公共方法库

import axios from 'axios'

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

export function MergeURL(url, config){
    let temp = `${url}?`
    for(let i in config){
        let params = `${i}=${config[i]}&`
        temp = temp + params
    }
    // console.log(temp)
    return temp
}

export function GetData(url, config, Scallback, Ecallback){
    let _self = this
    axios.get(url,config).then(function(res){
        if(res.data.msgCode == '40000'){
            callback(res)
            _self.$Message.success(res.data.msg)
        }else if(res.data.msgCode == '50000'){
            callback()
            _self.$Message.error(res.data.msg)
        }else if(res.data.msgCode == '50003'){
            _self.$Message.warning(res.data.msg)
            Cookies.set('user', '');
            Cookies.set('password', '');
            this.$router.push({
                name:'login'
            })
        }else if(res.dara.msgCode == '60000'){
            _self.$Message.warning(res.data.msg)
        }else{
            _self.$Message.error(res.dara.msg)
        }
    })
}

export function isNull(time){
    let _self = this
    if(time == null||time == ""){
    }else{
        return time.slice(0,10)
    }
}