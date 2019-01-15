import {
    AjaxGet,
    AjaxDic,
    AjaxPost
} from '../../../api/index'

function orderDetail(id, config, success, fail) {
    let url = 'order/detail/' + id
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

function orderList(config, success, fail) {
    let url = 'order/list'
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

export {
    orderDetail,
    getDictionary,
    orderList
}