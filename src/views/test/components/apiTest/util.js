import axios from 'axios'

function commonFail(err){
    console.log("fail")
    if(err.status == 200){
        alert(err.data.msg)
    }else{
        alert(err)
    }
}

function AjaxGet(url, config, success, fail=commonFail){
    let baseUrl = 'api/' + url
    return new Promise((resolve, reject)=>{
        axios.get(baseUrl, config).then((res)=>{
            // console.log(res)
            if(res.status == 200 && res.data.msgCode == 40000){
                resolve(success(res.data.data))
            }else{
                fail(res)
            }
        }).catch((err)=>{
            fail(err)
        })
    })
}

export default AjaxGet;