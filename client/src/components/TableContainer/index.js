import React from 'react'
import { Table } from 'antd'
import { SelectOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './TableContainer.module.scss'

const TableContainer = ({type, data, loading}) => {

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;

        return numToString.replace(regex, '.')
    }

    const columnAccount = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 50,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
        },
        {
            title: 'Chi tiết',
            key: 'detail',
            width: 150,
            render: (text) => <Link to={`${text.id}`}><SelectOutlined /> Xem chi tiết</Link>
        }
    ]

    const columnProduct = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 50,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'namePd',
            key: 'namePd'
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'subCategory',
            key: 'subCategory'
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: text => handleMoney(text)
        },
        {
            title: 'Tồn kho',
            dataIndex: 'inventory',
            key: 'inventory',
            width: 95
        },
        {
            title: 'Chi tiết',
            key: 'detail',
            width: 150,
            render: (text) => <Link to="#"><SelectOutlined /> Xem chi tiết</Link>
            // render: (text) => <Link to={`${text.id}`}><SelectOutlined /> Xem chi tiết</Link>
        }
    ]

    const columnHistory = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 50,
            render: (text) => <p style={{ textAlign: 'center'}}>{text}</p>
        },
        {
            title: 'Mã hóa đơn',
            dataIndex: 'idOrder',
            key: 'idOrder',
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
            key: 'quantity',
            render: products => (
                <>
                    {
                        products.map((product, index) => (
                            <p key={'N'+index}>
                                {product.quantity}
                            </p>
                        ))
                    }
                </>
            )
        },
        {
            title: 'Đơn giá',
            dataIndex: 'products',
            key: 'price',
            render: products => (
                <>
                    {
                        products.map((product, index) => (
                            <p key={'N'+index}>
                                {handleMoney(product.price)}
                            </p>
                        ))
                    }
                </>
            )
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (text) => handleMoney(text)
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'dateOrder',
            key: 'dateOrder',
        },
    ]

    const columns = {
        account: columnAccount,
        product: columnProduct,
        historyBuy: columnHistory
    }

    return (
        <div className={clsx(styles.tb, {
            [styles.history]: type === 'historyBuy'
        })}>
            <Table
                loading={loading}
                columns={columns[type]}
                dataSource={data}
                bordered={true}
                pagination={{ pageSize: 20, position: ['bottomCenter'] }}
            />
        </div>
    )
}

export default TableContainer