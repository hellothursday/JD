import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://www.fastmock.site/mock/fe3660472f95acdae7d8381a29b60521/api/'

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
