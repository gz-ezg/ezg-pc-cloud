import axios from 'axios'

import delegate from './interceptors'
axios.create({
  timeout: 30000
})

export class BaseService {
  constructor(host, uriPrefix) {
    this.host = host
    this.uriPrefix = uriPrefix
  }

  getUri(uri = '') {
    if (uri && uri.match(/^http/)) {
      return uri
    } else {
      if (this.uriPrefix) {
        return uri.indexOf('/') === 0
          ? this.host + this.uriPrefix + uri
          : this.host + this.uriPrefix + '/' + uri
      } else {
        return uri.indexOf('/') === 0 ? this.host + uri : this.host + '/' + uri
      }
    }
  }

  request(req) {
    return new Promise((resolve, reject) => {
      axios(req)
        .then(res => {
          const { statusCode } = res
          if (statusCode >= 200 && statusCode <= 300) {
            return resolve(res)
          } else {
            return reject(res)
          }
        })
        .catch(err => {
          return reject(err)
        })
    })
  }
}

export class HttpService extends BaseService {
  constructor(uriPrefix) {
    super('', uriPrefix)
  }

  post(data = {}, config) {
    const req = {
      url: this.getUri(config.url),
      method: 'POST',
      data
    }
    return this.requestProxy({
      req,
      config
    })
  }

  get(params = {}, config) {
    const req = {
      url: this.getUri(config.url),
      method: 'GET',
      params
    }

    return this.requestProxy({
      req,
      config
    })
  }

  async requestProxy({ req = {}, config = {} }) {
    let res
    // 请求头处理
    // TODO 这里可以对config做处理
    req = delegate.requestHeaderHander({
      req,
      config
    })

    try {
      res = await this.request(req)
    } catch (e) {
      res = e
    }
    res = await delegate.responseHander(res)
    return res
  }
}
