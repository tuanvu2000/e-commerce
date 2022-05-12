import clsx from 'clsx'
import styles from './TableOrderNew.module.scss'
import { Table } from 'antd'

const TableOrderNew = (props) => {

    const columns = [
        {
            title: 'Mã hóa đơn',
            dataIndex: 'maHoaDon',
            key: 'maHoaDon'
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'nameUser',
            key: 'nameUser'
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'products',
            key: 'nameProduct',
            render: products => (
                <>
                    {
                        products.map((product, index) => (
                            <p key={'N'+index}>
                                {product.nameProduct}
                            </p>
                        ))
                    }
                </>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'products',
            key: 'quantityProduct',
            render: products => (
                <>
                    {
                        products.map((product, index) => (
                            <p key={'Q'+index}>
                                {product.quantityProduct}
                            </p>
                        ))
                    }
                </>
            )
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'totalPrice'
        }
    ]
    
    return (
        <Table
            columns={columns}
            dataSource={props.data}
            pagination={false}
            bordered={true}
            className={clsx(styles.tb)}
        />
    )
}

export default TableOrderNew