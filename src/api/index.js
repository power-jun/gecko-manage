import request from 'axios'

export default {
  // 用户登录
  login (data) {
    return request({
      url: '',
      method: 'POST',
      data
    })
  },

  // 用户退出
  logout () {
    return request({
      url: '',
      method: 'GET'
    })
  }
}
