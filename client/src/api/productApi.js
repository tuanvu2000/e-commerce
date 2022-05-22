import axiosClient from './axiosClient'

const productApi = {
    add: (params) => axiosClient.post(
        'product/add',
        params
    ),
    getAll: () => axiosClient.get(
        'product/'
    ),
    getOne: (id) => axiosClient.get(
        `product/${id}`
    ),
    update: (id, params) => axiosClient.put(
        `product/${id}`,
        params
    ),
    delete: (id) => axiosClient.delete(
        `product/${id}`
    ),
    getBestSell: () => axiosClient.get(
        'product/list/best-sell'
    ),
    getCategory: (values) => axiosClient.get(
        `product/list/${values}`
    )
}

export default productApi