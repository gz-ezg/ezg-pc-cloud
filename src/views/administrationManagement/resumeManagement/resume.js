import {
    AjaxGet,
    AjaxDic,
    AjaxPost
} from '../../../api/index'

function getResumeList(config, success, fail) {
    let url = 'system/resource/resume/list'
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function getDictionary(params) {
    return new Promise((resolve, reject) => {
        resolve(AjaxDic(params))
    }).catch((err) => {
        return err
    })
}

function resumeDel(config, success, fail) {
    let url = 'system/resource/resume/del'
    return new Promise((resolve, reject) => {
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function resumeCreate(config, success, fail) {
    let url = 'zuul/system/resource/resume/create'
    return new Promise((resolve, reject) => {
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function resumeUpdate(config, success, fail) {
    let url = 'zuul/system/resource/resume/update'
    return new Promise((resolve, reject) => {
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

export {
    getResumeList,
    getDictionary,
    resumeDel,
    resumeCreate,
    resumeUpdate
}