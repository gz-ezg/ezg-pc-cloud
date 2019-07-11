export default {
  // 状态码处理，决定是否走catch处理
  async errHandler(errcode, errmsg) {
    if (errcode == '40000') {
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

  async responseHander(res) {
    const { data } = res
    if ('msgCode' in data) {
      const status = await this.errHandler(data.msgCode, data.msg)
      if (status) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    } else {
      const status = await this.errHandler(data.code || 0, data.error)
      if (status) {
        return Promise.resolve(data.data)
      } else {
        return Promise.reject(data)
      }
    }
  }
}
