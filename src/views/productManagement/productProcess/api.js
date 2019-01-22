import {AjaxGet, AjaxDic, AjaxPost} from '../.././../api/index'

function getActivitiTaskProcessList(config, success, fail){
    let url = 'activiti/taskProcdefList'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function postActivitiuploadBpmnInputStream(config, success, fail){
    let url = 'activiti/uploadBpmnInputStream'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export {
    getActivitiTaskProcessList,
    postActivitiuploadBpmnInputStream
}