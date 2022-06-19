import clsx from 'clsx'
import styles from './TableOrderNew.module.scss'
import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

const TableOrderNew = (props) => {
    const navigate = useNavigate()

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;

        return numToString.replace(regex, '.')
    }

    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'orderId',
            key: 'orderId'
        },
        {
            title: 'Tên khách hàng',
            dataIndex: ['customer', 'fullName'],
            key: 'fullName'
        },
        {
            title: 'Điện thoại',
            dataIndex: ['customer', 'phoneNumber'],
            key: 'phoneNumber'
        },
        // {
        //     title: 'Tên sản phẩm',
        //     dataIndex: 'products',
        //     key: 'nameProduct',
        //     render: products => (
        //         <>
        //             {
        //                 products.map((product, index) => (
        //                     <p key={'N'+index}>
        //                         {product.nameProduct}
        //                     </p>
        //                 ))
        //             }
        //         </>
        //     )
        // },
        // {
        //     title: 'Số lượng',
        //     dataIndex: 'products',
        //     key: 'quantityProduct',
        //     render: products => (
        //         <>
        //             {
        //                 products.map((product, index) => (
        //                     <p key={'Q'+index}>
        //                         {product.quantityProduct}
        //                     </p>
        //                 ))
        //             }
        //         </>
        //     )
        // },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (text) => handleMoney(text)
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            bordered={true}
            className={clsx(styles.tb)}
            onRow={(record, index) => {
                return {
                    onClick: event => navigate('order/' + record.id)
                }
            }}
        />
    )
}

export default TableOrderNew