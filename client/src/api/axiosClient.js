import axios from 'axios'
import queryString from 'query-string'

const getToken = () => localStorage.getItem('access_token')

const axiosClient = axios.create({
    baseURL: process.env.NODE_ENV === 'development' 
        ? process.env.REACT_APP_API_LOCAL_BASE_URL
        : process.env.REACT_APP_API_BASE_URL,
    paramSerializer: params => queryString.stringify({params})
})

axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }
})

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) return response.data
    return response
}, (err) => {
    if (!err.response) {
        alert('Err! Network err!')
    }
    throw err
})

export default axiosClient