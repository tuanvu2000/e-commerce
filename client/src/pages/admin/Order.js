// import { useState, useEffect } from 'react'
import { TableContainer } from '../../components'
import { TitleContent, ButtonCreate } from '../../components/UI'
import useTitle from '../../hooks/useTitle'

const Order = () => {
    useTitle('Order')

    const list = [
        {
            orderId: '00001',
            fullName: 'Nguyễn Văn A',
            total: 2581000,
            dateOrder: '29/03/2022 15:48',
            status: 'Đang giao',
        },
        {
            orderId: '00002',
            fullName: 'Nguyễn Văn B',
            total: 750000,
            dateOrder: '30/03/2022 19:09',
            status: 'Đang xử lý',
        },
        {
            orderId: '00002',
            fullName: 'Nguyễn Văn B',
            total: 750000,
            dateOrder: '30/03/2022 19:09',
            status: 'Đang xử lý',
        },
        {
            orderId: '00002',
            fullName: 'Nguyễn Văn B',
            total: 750000,
            dateOrder: '30/03/2022 19:09',
            status: 'Đang xử lý',
        },
        {
            orderId: '00002',
            fullName: 'Nguyễn Văn B',
            total: 750000,
            dateOrder: '30/03/2022 19:09',
            status: 'Đang xử lý',
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='' />
                <ButtonCreate
                    to='create'
                    action='Thêm'
                    icon='addUser'
                />
            </div>

            <div style={{ margin: 15 }}></div>

            <TableContainer 
                type="order"
                data={list}
                // loading={loading}
            />
        </div>
    )
}

export default Order