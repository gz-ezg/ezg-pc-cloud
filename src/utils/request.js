import axios from 'axios'
import iview from 'iview'
import Cookies from 'js-cookie'

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 接口错误上报
    if (
      response.data.msgCode == '50000' &&
      response.config.url != 'api/legwork/apiLoginByWechatCode'
    ) {
      iview.Message.error(response.data.msg)
      let config = {
        name: 'cloud',
        page: response.config.url,
        err: JSON.stringify(response)
      }
      axios.post('api/system/saveFontErrMsg', config)
    }
    if (response.data.msgCode == '50003' && Cookies.get('user') != '') {
      iView.Message.warning('对不起，您还未登陆！')
      iView.Message.destroy()
      //只有post求情失败才打开重新登录窗口
      Cookies.set('user', '')
      Cookies.set('password', '')
      setTimeout(() => {
        router.push({
          name: 'login'
        })
      }, 800)
    }
    if (response.data.msgCode == '60000') {
      iView.Message.warning('对不起，您没有权限访问该页面！')
      // iView.Message.destroy()
      setTimeout(() => {
        router.push({
          name: 'home_index'
        })
      }, 500)
    }
    return response.data.data
  },
  error => {
    iview.Message.error(error.errmsg || '请求出错！')
    return Promise.reject(error)
  }
)

export default service
