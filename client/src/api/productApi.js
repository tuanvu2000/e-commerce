import axiosClient from './axiosClient'

const productApi = {
    add: (params) => axiosClient.post(
        'product/add',
        params
    ),
    getAll: () => axiosClient.get(
        'product/'
    )
}

export default productApi