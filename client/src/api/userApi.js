import axiosClient from './axiosClient'

const userApi = {
    register: (params) => axiosClient.post(
        'user/register',
        params
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
    delete: (id) => axiosClient.delete(
        `user/${id}`
    )
}

export default userApi