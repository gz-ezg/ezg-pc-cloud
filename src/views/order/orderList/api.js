import { AjaxGet, AjaxDic, AjaxPost } from '../../../api/index'

function orderFinishUpdate(config, success, fail){
  let url = 'order/finishedUpdate'
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    reject(err)
  })
}

export {
  orderFinishUpdate
}