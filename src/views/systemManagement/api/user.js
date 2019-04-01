import {AjaxGet, AjaxDic, AjaxPost} from '../../../api/index'

function getUserList(config, success, fail){
    let url = 'user/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getProList(config, success, fail){
    let url = 'product/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getUserDetail(config, success, fail){
    let url = 'user/detail'
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

function postUpdateUser(config, success, fail){
    let url = 'user/updateUser'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function saveUserProduct(config, success, fail){
    let url = 'user/product/save'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getPorductSKU(config, success, fail){
    let url = 'product/sku/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

//  权限设置
function getUserMenusByUserId(config, success, fail){
    let url = 'user/role/getUserMenusByUserId?'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getUserButtonsByUserIdAndInterfaceId(config, success, fail){
    let url = 'user/role/getUserButtonsByUserIdAndInterfaceId'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getUserDataRulesByUserIdAndInterfaceId(config, success, fail){
    let url = 'user/role/getUserDataRulesByUserIdAndInterfaceId'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function addInterfaceAndOperationToUser(config, success, fail){
    let url = 'user/role/addInterfaceAndOperationToUser'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function addInterfaceToUser(config, success, fail){
    let url = 'user/role/addInterfaceToUser'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function addInterfaceAndDataRuleToUser(config, success, fail){
    let url = 'user/role/addInterfaceAndDataRuleToUser'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}
//  权限剔除
function getUserRMMenusByUserId(config, success, fail){
    let url = 'user/role/getUserRMMenusByUserId?'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getUserRMButtonsByUserIdAndInterfaceId(config, success, fail){
    let url = 'user/role/getUserRMButtonsByUserIdAndInterfaceId'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getUserRMDataRulesByUserIdAndInterfaceId(config, success, fail){
    let url = 'user/role/getUserRMDataRulesByUserIdAndInterfaceId'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function addInterfaceAndOperationToUserRM(config, success, fail){
    let url = 'user/role/addInterfaceAndOperationToUserRM'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function addInterfaceToUserRM(config, success, fail){
    let url = 'user/role/addInterfaceToUserRM'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function addInterfaceAndDataRuleToUserRM(config, success, fail){
    let url = 'user/role/addInterfaceAndDataRuleToUserRM'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export {
    getUserDetail,
	getProList,
    getDictionary,
    postUpdateUser,
    getUserList,
    getUserMenusByUserId,
    getUserRMMenusByUserId,
    getUserButtonsByUserIdAndInterfaceId,
    getUserDataRulesByUserIdAndInterfaceId,
    getUserRMButtonsByUserIdAndInterfaceId,
    getUserRMDataRulesByUserIdAndInterfaceId,
	getPorductSKU,
	saveUserProduct,
    addInterfaceAndOperationToUser,
    addInterfaceAndOperationToUserRM,
    addInterfaceToUser,
    addInterfaceToUserRM,
    addInterfaceAndDataRuleToUser,
    addInterfaceAndDataRuleToUserRM
}