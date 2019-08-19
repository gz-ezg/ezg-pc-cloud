import { addGather } from '../api/systemManage'
import axios from 'axios'
import request from '../utils/request'

export const vessel = {
  async ButtonCollect(name) {
    await addGather({
      code: name
    })
  },
  indexOfArray(data, array) {
    let flag = false
    for (let i = 0; i < array.length; i++) {
      if (data == array[i]) {
        flag = true
      }
    }
    return flag
  },
  Data2Casr(data) {
    let Casr = []
    for (let i = 0; i < data.length; i++) {
      let temp = {}
      if (data[i].children != null) {
        for (let j = 0; j < data[i].children.length; j++) {
          temp = {}
          temp.id = data[i].children[j].id
          temp.typecode = data[i].children[j].typecode
          temp.typename = data[i].children[j].typename
          temp.pid = data[i].children[j].pid
          temp.ptypename = data[i].typename
          temp.ptypecode = data[i].typecode
          Casr.push(temp)
        }
      } else {
        temp = {}
        temp.id = data[i].id
        temp.typecode = data[i].typecode
        temp.ptypename = data[i].typename
        temp.typename = ''
        temp.pid = 0
        Casr.push(temp)
      }
    }

    return Casr
  },
  changeCars(data) {
    let data2 = []
    for (let i = 0; i < data.length; i++) {
      let temp = {}
      temp.value = data[i].id
      temp.label = data[i].typename
      temp.children = []
      if (data[i].children != null) {
        let temp3 = {}
        temp3.value = ''
        temp3.label = '无'
        temp.children.push(temp3)
        for (let j = 0; j < data[i].children.length; j++) {
          let temp2 = {}
          temp2.value = data[i].children[j].id
          temp2.label = data[i].children[j].typename
          temp.children.push(temp2)
        }
      }
      data2.push(temp)
    }
    return data2
  },

  Get(
    url,
    config,
    success,
    fail = function(err) {
      console.log(err)
      _self.$Message.error(err)
    }
  ) {
    let _self = this
    axios
      .get(url, config)
      .then(function(res) {
        if (res.data.msgCode == '40000') {
          success(res)
        } else {
          if (res.data.msg) {
            _self.$Message.error(res.data.msg)
            fail(res.data.msg)
          } else {
            console.error(res)
          }
        }
      })
      .catch(function(err) {
        fail(err)
        console.error(err)
      })
  },
  Post(url, config, success, fail) {
    let _self = this
    axios
      .post(url, config)
      .then(function(res) {
        if (res.data.msgCode == '40000') {
          if (res.data.msg) {
            _self.$Message.success(res.data.msg)
          }
          success(res)
        } else {
          _self.$Message.error(res.data.msg)
          fail(res)
          console.warn(res)
        }
      })
      .catch(function(err) {
        fail(err)
        _self.$Message.error('数据异常！')
        console.error(err)
      })
  },
  async queryCodes(query, boolean = false) {
    try {
      let resp = await request({
        url: '/system/tsType/queryTsTypeByGroupCodes',
        method: 'get',
        params: { groupCodes: query }
      })
      if (boolean) {
        return resp[query]
      }
      let TEM = resp[query].map(v => {
        return {
          value: v.typecode,
          label: v.typename
        }
      })
      let MAP = {}
      resp[query].forEach(v => {
        MAP[v.typecode] = v.typename
      })
      return [TEM, MAP]
    } catch (error) {
      console.log(error)
    }
  },

  GetDataCenter(params, finish) {
    let _self = this
    let config = {
      params: {
        groupCodes: params
      }
    }
    let url = `api/system/tsType/queryTsTypeByGroupCodes`

    axios
      .get(url, config)
      .then(function(res) {
        if (res.data.msgCode == '40000') {
          finish(res)
        } else {
          _self.$Message.error('请求异常！')
        }
      })
      .catch(function(err) {
        console.log(err)
        _self.$Message.error('网络异常！')
      })
  },

  backToLogin(res) {
    if (res.data.msgCode == '50003') {
      this.$Message.warning('对不起，您还未登陆！即将回到登陆页面！')
      this.$router.push({
        name: 'login'
      })
    }
    if (res.data.msgCode == '60000') {
      this.$Message.warning('对不起，您没有权限访问该页面！')
    }
  },
  array2map(array) {
    if (array == '' || array == null) {
      return
    } else {
      let tempMap = new Map()
      for (let i = 0; i < array.length; i++) {
        tempMap.set(array[i].typecode, array[i].typename)
      }
      return tempMap
    }
  },
  MergeURL(url, config) {
    let temp = `${url}?`
    for (let i in config) {
      if (config[i]) {
        let params = `${i}=${config[i]}&`
        temp = temp + params
      }
    }
    return temp
  }
}

let proto = new Object()
proto.install = function(Vue) {
  Object.keys(vessel).forEach(v => {
    Vue.prototype[`$${v}`] = vessel[v]
  })
}

export default proto
