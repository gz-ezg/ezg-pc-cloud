import { AjaxPost, AjaxGet } from '@/api/index.js'
import Cookies from 'js-cookie';

export const handleUploadImg = async (config) => {
    let url = 'customer/addCustomerContentImg'
    return AjaxPost(url, config)
}

export const createChannelTypeImg = async (config) => {
    let url = 'channel/img/createChannelTypeImg'
    return AjaxPost(url, config)
}

export const updateChannelTypeImg = async (config) => {
    let url = 'channel/img/updateChannelTypeImg'
    return AjaxPost(url, config)
}

export const updateChannelTypeImgStatus = async (configs) => {
    let config = {
        params: configs
    }
    let url = 'channel/img/updateChannelTypeImgStatus'
    return AjaxGet(url, config)
}

export const isAdmin = () => {
    return 'admin' == Cookies.get('user')
}