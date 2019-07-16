import axios from 'axios'
import iview from 'iview'

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
    console.log(response) //for debug
    const res = response.data
    const { method } = response.config
    method === 'post' && iview.Message.success(res.msg || '执行成功！')
    return res.data;
  },
  error => {
    console.log('err' + error) // for debug
    iview.Message.error(error.errmsg || '请求出错！')
    return Promise.reject(error)
  }
)

export default service
