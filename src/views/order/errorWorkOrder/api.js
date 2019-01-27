import {
    AjaxGet,
    AjaxDic,
    AjaxPost
} from '../../../api/index'

function unusualWorkOrderList(config, success, fail) {
    let url = 'order/unusual/workorder/list'
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

function unusualWorkOrderDel(config, success, fail) {
    let url = 'order/unusual/workorder/deleteWorkOrder'
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function unusualWorkOrderAdd(config, success, fail) {
    let url = 'order/unusual/workorder/addWorkOrder'
    return new Promise((resolve, reject) => {
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function unusualWorkOrderEdit(config, success, fail) {
    let url = 'order/unusual/workorder/editWorkOrder'
    return new Promise((resolve, reject) => {
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function unusualWorkOrderDetailById(config, success, fail) {
    let url = 'order/unusual/workorder/searchWordOrderById'
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

function getCompanyList(config, success, fail) {
    let url = 'customer/company/list'
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}


export {
    unusualWorkOrderList,
    getDictionary,
    unusualWorkOrderDel,
    unusualWorkOrderAdd,
    unusualWorkOrderEdit,
    unusualWorkOrderDetailById,
    getCompanyList
}