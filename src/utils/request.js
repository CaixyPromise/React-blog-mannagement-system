import axios from "axios";
import { getToken } from "./token";
import router from "@/router";

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
        if (error.response.status === 401)
        {
            router.navigate('/login');
            window.location.reload();
        }
        return Promise.reject(error)
    }
)

export {
    request
}