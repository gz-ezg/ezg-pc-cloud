import axios from 'axios'
import vue from 'Vue'

function fail(err){
    console.log(err)
}

function AjaxGet(url, config, success, fail=fail){
    let baseUrl = 'api/' + url
    axios.get(baseUrl, config).then((res)=>{
        if(res.data.msgCode == 40000){
            return new Promise((resolve, reject)=>{
                resolve(success(res.data))
            })
        }
    })
}