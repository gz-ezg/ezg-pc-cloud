import {AjaxGet, AjaxDic, AjaxPost} from '../../../api/index'

function getMsgRuleList(config, success, fail){
    let url = 'system/queryMsgrule/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getMsgRuleById(config, success, fail){
    let url = 'system/findMsgruleById'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function deleteMsgRuleById(config, success, fail){
    let url = 'system/deleteMsgruleById'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function postUpdateMsgRule(config, success, fail){
    let url = 'system/updateMsgrule'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function postAddMsgRuleAndLinked(config, success, fail){
    let url = 'system/addMsgruleAndLinked'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getDictionary(params){
    return new Promise((resolve, reject)=>{
        resolve(AjaxDic(params))
    }).catch((err)=>{
        return err
    })
}

export {
    getMsgRuleList,
    getMsgRuleById,
    deleteMsgRuleById,
    postAddMsgRuleAndLinked,
    getDictionary,
    postUpdateMsgRule
}