import { useState, useEffect } from 'react'
import { TableContainer } from '../../components'
import { TitleContent, ButtonCreate } from '../../components/UI'
import useTitle from '../../hooks/useTitle'
import orderApi from '../../api/orderApi'

const Order = () => {
    useTitle('Order')
    
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getApi = async () => {
            const res = await orderApi.getAll()
            const listOrder = res.map((order, index) => ({
                key: index,
                id: order.id,
                orderId: order.orderId,
                fullName: order.customer.fullName,
                total: order.total,
                dateOrder: order.createdAt,
                status: order.status
            }))
            setOrders(listOrder)
            setLoading(false) 
        }
        getApi()
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='Danh sách đơn hàng' />
            </div>

            <div style={{ margin: 15 }}></div>

            <TableContainer 
                type="order"
                data={orders}
                loading={loading}
            />
        </div>
    )
}

export default Order