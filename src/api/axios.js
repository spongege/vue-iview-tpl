import axios from 'axios'

// 在此处修改axios的一些全局设置
const instance = axios.create({
  timeout: 1000 * 15,
  baseURL: ''
  // headers: {}
})

// 取消axios请求的api
const cancelToken = axios.CancelToken

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* 以下做 axios重复请求是中断之前的请求 优化*/

//声明一个数组用于存储每个axios请求的取消函数和axios标识
const pendingArr = []

const removePending = (config) => {
  const data = config.method === 'get' ? JSON.stringify(config.params) : config.data
  const url = config.url + '&' + data + '&' + config.method
  pendingArr.forEach((ele, index) => {
    //如果pendingArr存在正在进行的请求
    if (pendingArr[index].url === url) {
      //执行取消操作
      pendingArr[index].cancel()
      //把这条记录从数组中移除
      pendingArr.splice(index, 1)
    }
  })
}

/* 请求拦截器 */
instance.interceptors.request.use(
  (config) => {
    //在一个axios发送前执行一下取消操作
    removePending(config)
    const data = config.method === 'get' ? JSON.stringify(config.params) : config.data
    // 将拼接好的url作为一个请求的唯一标识
    const url = config.url + '&' + data + '&' + config.method
    config.cancelToken = new cancelToken((cancel) => {
      pendingArr.push({
        url: url,
        cancel
      })
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
instance.interceptors.response.use(
  (response) => {
    removePending(response.config) //在一个axios响应后再执行一下取消操作，把已经完成的请求从pendingArr中移除
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
