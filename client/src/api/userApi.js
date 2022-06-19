import axiosClient from './axiosClient'

const userApi = {
    register: (params) => axiosClient.post(
        'user/register',
        params
    ),
    login: (params) => axiosClient.post(
        'user/login',
        params
    ),
    checkToken: () => axiosClient.post(
        'user/check-token'
    ),
    getAll: () => axiosClient.get(
        'user'
    ),
    getOne: (id) => axiosClient.get(
        `user/${id}`
    ),
    update: (id, params) => axiosClient.put(
        `user/${id}`,
        params
    ),
    changeRole: (params) => axiosClient.put(
        'user/edit/change-role',
        params
    ),
    delete: (id) => axiosClient.delete(
        `user/${id}`
    )
}

export default userApi