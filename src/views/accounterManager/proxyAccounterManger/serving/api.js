import {AjaxGet, AjaxDic, AjaxPost} from '../../../../api/index'

function workOrderCycleUnitPriceUpdate(config, success, fail){
    let url = 'order/work/order/cycle/unitprice/update'
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

function getNotRecordTaxAccountCompanyInfos(config, success, fail){
    let url = 'customer/company/getNotRecordTaxAccountCompanyInfos'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getOrderCycleMonthServiceList(config, success, fail){
    let url = 'order/cycle/month/service/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getOrderCycleServiceList(config, success, fail){
    let url = 'order/cycle/service/record/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getOrderCycleServiceRecordList(config, success, fail){
    let url = 'order/cycle/service/record/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function saveAccountGradeMsg(config, success, fail){
    let url = 'order/cycle/saveAccountGradeMsg'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function cycleMonthServiceItemFinish(config, success, fail){
    let url = 'order/cycle/month/service/item/finish'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function cycleServiceRecordUpdate(config, success, fail){
    let url = 'order/cycle/service/record/update'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function orderCycleMonthServiceList(config, success, fail){
    let url = 'order/cycle/service/dljz/cycleMothList'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function orderETaxSynchronizeCycleMonthServiceItemFinish(config, success, fail){
    let url = 'order/cycle/eTaxSynchronizeCycleMonthServiceItemFinish'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function orderSpiderETaxDeclare(config, success, fail){
    let url = 'order/cycle/spideETaxDeclare/company'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export{
    workOrderCycleUnitPriceUpdate,
    getDictionary,
    getNotRecordTaxAccountCompanyInfos,
    saveAccountGradeMsg,
    cycleMonthServiceItemFinish,
    cycleServiceRecordUpdate,
    getOrderCycleMonthServiceList,
    getOrderCycleServiceRecordList,
    orderCycleMonthServiceList,
    orderETaxSynchronizeCycleMonthServiceItemFinish,
    orderSpiderETaxDeclare,
    getOrderCycleServiceList
}