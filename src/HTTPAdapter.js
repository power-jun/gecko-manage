import axios from 'axios'
import router from './router'
import store from './store'

let myRequester = null
let myResponser = null

const token = sessionStorage.getItem('geckoToken')
if (token) {
  axios.defaults.headers.common['token'] = token
}

function redirect (res) {
  res.config.source.cancel(res.data.message)
  initInterceptors()
  store.dispatch('wipeData').then(() => {
    router.replace('/Login')
  })
}

function initInterceptors () {
  // 确保重新初始化拦截器之前，生成全新的promise对象
  const source = axios.CancelToken.source()

  // 重新初始化拦截器之前，先移除旧的拦截器
  if (myRequester !== null && myResponser !== null) {
    axios.interceptors.request.eject(myRequester)
    axios.interceptors.response.eject(myResponser)
  }

  // 添加请求拦截器
  myRequester = axios.interceptors.request.use(
    config => {
      const cfg = config

      // 在发送请求之前，加入 cancelToke，以备后续中止请求
      cfg.cancelToken = source.token
      cfg.source = source

      return cfg
    },
    error => {
      // 请求错误时
      Promise.reject(error)
    }
  )

  // 添加响应拦截器
  myResponser = axios.interceptors.response.use(
    res => {
      console.log(`url=${res.request.responseURL}`, res)

      // 是否二进制流应用
      if (!res.data.status) {
        return Promise.reject(res)
      } else if (res.data.status !== 'C0000') {
        // 响应的是否是正常数据
        ELEMENT.Message({
          type: 'warning',
          message: res.data.message,
          duration: 2e3
        })
        return Promise.reject(res)
      }

      return res
    },
    error => {
      const { response } = error
      if (response) {
        // session 无效
        if (response.status === 401 || response.data.status === 'E0008') {
          redirect(response)
        } else if (response.status === 403) {
          // 权限不足
          ELEMENT.Message({
            type: 'warning',
            message: response.data.message,
            duration: 2e3
          })
        }

        return Promise.reject(response.data)
      } else {
        return Promise.reject(error)
      }
    }
  )
}

initInterceptors()
