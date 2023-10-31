import axios from "axios";
import { getToken } from "./token";

const request = axios.create({
    baseURL: "/v1",
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
    (config) =>
    {
        const token = getToken()
        if (token) 
        {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, error =>
    {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) =>
    {
        
        return response.data
    }, error =>
    {
        return Promise.reject(error)
    }
)

export {
    request
}