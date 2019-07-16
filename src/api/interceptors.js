import iView from 'iview'
export default {
  // 状态码处理，决定是否走catch处理
  async errHandler(errcode, errmsg, config) {
    if (errcode == '40000') {
      if (config.method == 'POST') {
        // iView.Message.success(errmsg || '执行成功！')
      }
      return true
    } else {
      if (errcode == '50003') {
        //TODO removeToken();
      }
      return false
    }
  },

  requestHeaderHander({ req }) {
    req.header = Object.assign({}, req.header, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    })
    return req
  },

  async responseHander(res, config) {
    const { data } = res
    if (!res.data) {
      iView.Message.error('服务器异常！' + data)
      return Promise.reject(data)
    }
    if ('msgCode' in data) {
      const status = await this.errHandler(data.msgCode, data.msg, config)
      if (status) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    } else {
      const status = await this.errHandler(data.code || 0, data.error, config)
      if (status) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    }
  }
}
