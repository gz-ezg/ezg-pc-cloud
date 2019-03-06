import {
    AjaxDic,
    AjaxGet,
    AjaxPost
} from '../../../api/index';

function getTaskList(config, success, fail) {
    let url = 'task/list'
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

export {
    getTaskList,
}