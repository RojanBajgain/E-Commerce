import axios from 'axios'
import { toast } from 'react-toastify'
import { fromStorage } from '../lib'

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

http.interceptors.request.use(config => {
    const token = fromStorage('12fronttoken')

    if(token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        }
    }
    return config

}, err => Promise.error(err))

http.interceptors.response.use(response => {
    if('success' in response.data) {
        toast.success(response.data.success)
    }

    return response
}, err => {
    if('response' in err && 'error' in err.response.data) {
        toast.error(err.response.data.error)
    }

    return Promise.reject(err)
})

export default http