import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

instance.interceptors.request.use(config => {
  // config.headers.Authorization = localStorage.getItem('token')
  config.headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ0ZDdhY2Q1ZGMzNTIxNTAzYzM1OTkiLCJpYXQiOjE2OTE2NzA0OTIsImV4cCI6MTY5NDI2MjQ5Mn0.pQv1NsLAVHm7zrHlYOO4kzi7GekLrYTdcfm2KJRh51Q'
  return config
})

export default instance