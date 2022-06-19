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
    getBestSale: () => axiosClient.get(
        'product/list/best-sale'
    ),
    getListType: (params) => axiosClient.post(
        `product/store`,
        params
    ),
    putAddQuantity: (params) => axiosClient.put(
        'product/add/quantity',
        params
    )
    // getBestSell: () => axiosClient.get(
    //     'product/list/best-sell'
    // ),
    // getCategory: (values) => axiosClient.get(
    //     `product/list/${values}`
    // ),
    // getListHatSub: (values) => axiosClient.get(
    //     `product/store/non-bao-hiem/${values}`
    // ),
    // getListAccessorySub: (values) => axiosClient.get(
    //     `product/store/phu-kien/${values}`
    // ),
    // getListBrand: (values) => axiosClient.get(
    //     `product/store/thuong-hieu/${values}`
    // ),
}

export default productApi