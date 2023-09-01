import axios from "axios";

const myAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

myAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

export { myAxios }