import request from './request'
import { mergeUrl } from './utils'
export default class listManage {
  constructor({ pageSize = 10 } = {}, url, dataHandle) {
    if (typeof url == 'function') {
      this.fetchFunc = url
    } else if (typeof url == 'string') {
      this.fetchFunc = query => {
        return request({
          url: this.url,
          method: 'get',
          params: query
        })
      }
    } else {
      return console.warn('please offer a url or getlist func for list')
    }
    // 请求接口地址
    this.url = url
    // loading 状态
    this.loading = false
    // 当前页
    this.page = 1
    // 总条数
    this.total = 0
    // 一页多少条数
    this.pageSize = pageSize

    // 对返回数据进行处理
    this.dataHandle = dataHandle
    // 表单数据
    this.data = []

    this.config = {}
    // 筛选条件
    this.searchConfig = {}
  }

  setPage(page) {
    this.page = page
  }

  setDefaultConfig(config) {
    this.config = config
  }

  setSearchConfig(config) {
    this.searchConfig = config
  }
  // 清空配置选项
  initSearchConfig() {
    this.searchConfig = {}
  }

  search(config) {
    this.setSearchConfig(config)
    this.fetchList(1)
  }
  reset() {
    this.initSearchConfig()
    this.fetchList(1)
  }

  setPageSize(pageSize) {
    this.pageSize = pageSize
  }
  async fetchList(page, options = {}) {
    if (typeof this.fetchFunc !== 'function') {
      return console.warn('please offer get data function')
    }
    try {
      this.loading = true
      let config = Object.assign(
        {
          page: page || this.page,
          pageSize: this.pageSize
        },
        this.searchConfig,
        options,
        this.config
      )
      let resp = await this.fetchFunc(config)
      this.total = resp.total
      this.data =
        typeof this.dataHandle == 'function'
          ? this.dataHandle.call(this, resp.rows)
          : resp.rows
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
  handleSizeChange(size, options) {
    this.setPage(size)
    this.fetchList(size, options)
  }

  handlePageSizeChange(pageSize, options) {
    this.setPageSize(pageSize)
    this.fetchList(1, { pageSize, ...options })
  }
  handleCurrentChange(currentPage, options) {
    this.setPage(currentPage)
    this.fetchList(currentPage, options)
  }
  downloadExcel(excelField, pageSize) {
    let config = {
      ...this.searchConfig,
      page: this.page,
      pageSize: pageSize || 1000000,
      exportField: encodeURI(JSON.stringify(excelField)),
      export: 'Y'
    }
    window.open('/api' + mergeUrl(this.url, config))
  }
}
