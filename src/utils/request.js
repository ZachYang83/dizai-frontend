import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

request.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 200) {
      return data.data
    }
    return Promise.reject(new Error(data.msg || '请求失败'))
  },
  error => {
    console.error('请求异常：', error.message)
    return Promise.reject(error)
  }
)

export default request
