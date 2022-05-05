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
    )
}

export default userApi