import React from 'react'
import { Table } from 'antd'
import { SelectOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const TableContainer = ({type, data}) => {
    const columnAccount = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 50,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname'
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
            render: () => <Link to='.'><SelectOutlined /> Xem chi tiết</Link>
        }
    ]

    return (
        <div>
            <Table
                columns={columnAccount}
                dataSource={data}
                bordered={true}
                pagination={{ pageSize: 20, position: ['bottomCenter'] }}
            />
        </div>
    )
}

export default TableContainer