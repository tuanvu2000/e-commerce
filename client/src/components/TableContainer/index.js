import React from 'react'
import { Table } from 'antd'
import { SelectOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './TableContainer.module.scss'
import moment from 'moment'

const TableContainer = ({ type, data, loading, theme }) => {

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
            fixed: 'left',
            width: 65,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            fixed: 'left',
            sorter: (a, b) => {
                let x = a.fullName.toUpperCase(),
                    y = b.fullName.toUpperCase();
                return x === y ? 0 : x > y ? 1 : -1;
            },
        },
        {
            title: 'Tên tài khoản',
            dataIndex: ['accountId', 'username'],
            key: 'username',
            sorter: (a, b) => {
                let x = a.accountId.username.toUpperCase(),
                    y = b.accountId.username.toUpperCase();
                return x === y ? 0 : x > y ? 1 : -1;
            },
        },
        {
            title: 'Email',
            dataIndex: ['accountId', 'email'],
            key: 'email',
            sorter: (a, b) => {
                let x = a.accountId.email.toUpperCase(),
                    y = b.accountId.email.toUpperCase();
                return x === y ? 0 : x > y ? 1 : -1;
            },
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
            render: (text) => <Link to={text.accountId.id}><SelectOutlined /> Xem chi tiết</Link>
        }
    ]

    const columnProduct = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            fixed: 'left',
            width: 65,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'namePd',
            key: 'namePd',
            fixed: 'left',
            sorter: (a, b) => {
                let x = a.namePd.toUpperCase(),
                    y = b.namePd.toUpperCase();
                return x === y ? 0 : x > y ? 1 : -1;
            },
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'subCategory',
            key: 'subCategory',
            filters: [
                { text: 'Nón bảo hiểm 3/4', value: 'Nón bảo hiểm 3/4'},
				{ text: 'Nón bảo hiểm full-face', value: 'Nón bảo hiểm full-face'},
				{ text: 'Nón nửa đầu', value: 'Nón nửa đầu'},
				{ text: 'Mũ xe đạp', value: 'Mũ xe đạp'},
				{ text: 'Nón trẻ em', value: 'Nón trẻ em'},
				{ text: 'Găng tay', value: 'Găng tay'},
				{ text: 'Kính', value: 'Kính'},
				{ text: 'Khác', value: 'Khác'}
			],
			onFilter: (value, record) => record.subCategory.includes(value),
            filterSearch: true
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
            filters: [
                { text: 'Royal', value: 'Royal'},
				{ text: 'ROC', value: 'ROC'},
				{ text: 'Balder', value: 'Balder'},
				{ text: 'KYT', value: 'KYT'},
				{ text: 'Rona', value: 'Rona'},
				{ text: 'Andes', value: 'Andes'},
				{ text: 'TORC', value: 'TORC'},
				{ text: 'JC', value: 'JC'},
				{ text: 'Asia', value: 'Asia'},
				{ text: 'Sunda', value: 'Sunda'}
			],
			onFilter: (value, record) => record.brand.includes(value),
            filterSearch: true
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: text => handleMoney(text)
        },
        {
            title: 'Tồn kho',
            dataIndex: 'inventory',
            key: 'inventory',
            width: 108,
            sorter: (a, b) => a.inventory - b.inventory,
        },
        {
            title: 'Chi tiết',
            key: 'detail',
            width: 150,
            fixed: 'right',
            render: (text) => <Link to={`${text.id}`}><SelectOutlined /> Xem chi tiết</Link>
        }
    ]

    const columnOrder = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
            width: 180,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            width: 135,
            sorter: (a, b) => a.total - b.total,
            render: text => handleMoney(text)
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'dateOrder',
            key: 'dateOrder',
            render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss')
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Chờ xử lý', value: 'Chờ xử lý'},
                { text: 'Đã hoàn thành', value: 'Đã hoàn thành'},
                { text: 'Hủy đơn hàng', value: 'Hủy đơn hàng'}
            ],
            onFilter: (value, record) => record.status.includes(value),
            render: (text) => <span className={clsx(styles.bold, {
                [styles.green]: text === 'Đã hoàn thành',
                [styles.orange]: text === 'Chờ xử lý',
                [styles.red]: text === 'Hủy đơn hàng',
            })}>{text}</span>
        },
        {
            title: 'Chi tiết',
            key: 'detail',
            width: 150,
            render: (text) => <Link to={`${text.id}`}><SelectOutlined /> Xem chi tiết</Link>
        },
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
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'products',
            key: 'namePd',
            render: products => (
                <>
                    {
                        products.map((product, index) => (
                            <p key={'N'+index}>
                                {product.productId.namePd}
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
            width: 100,
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
                                {handleMoney(product.productId.price)}
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
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss')
        },
    ]

    const columns = {
        account: columnAccount,
        product: columnProduct,
        order: columnOrder,
        historyBuy: columnHistory
    }

    return (
        <div className={clsx(styles.tb, styles[theme], {
            [styles.history]: type === 'historyBuy'
        })}>
            <Table
                loading={loading}
                columns={columns[type]}
                dataSource={data}
                bordered={true}
                // sticky
                scroll={{ x: 1200 }}
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />
        </div>
    )
}

export default TableContainer