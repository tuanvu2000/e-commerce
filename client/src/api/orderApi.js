import axiosClient from './axiosClient'

const orderApi = {
    new: (params) => axiosClient.post(
        'order/new',
        params
    ),
    history: (id) => axiosClient.get(
        `order/history/${id}`
    ),
    sum: () => axiosClient.get(
        'order/admin-summary'
    ),
    getAll: () => axiosClient.get(
        'order/'
    ),
    getOne: (id) => axiosClient.get(
        `order/detail/${id}`
    ),
    getNewOrder: () => axiosClient.get(
        'order/order-new'
    ),
    updateState: (id, params) => axiosClient.put(
        `order/status/${id}`,
        params
    )
}

export default orderApi