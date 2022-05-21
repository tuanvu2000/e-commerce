import userApi from '../api/userApi'

export const isAuth = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return false
    try {
        await userApi.checkToken()
        return true
    } catch (error) {
        return false
    }
}

export const logout = (navigate) => {
    localStorage.removeItem('access_token')
    navigate('../')
}