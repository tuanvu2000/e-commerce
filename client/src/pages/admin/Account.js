import React from 'react'
import { TitleContent, TableContainer, ButtonCreate } from '../../components'

const Account = () => {
    const data = [
        {
            key: 1,
            stt: 1,
            fullname: 'Vũ Đình Tuân',
            username: 'abc123',
            email: 'abc123@gmail.com',
            phoneNumber: '0123456789',
        },
        {
            key: 2,
            stt: 2,
            fullname: 'Hồ Đức Thế Minh',
            username: 'uhi54',
            email: 'uhi54@gmail.com',
            phoneNumber: '0987654321',
        },
        {
            key: 3,
            stt: 3,
            fullname: 'Nguyễn Văn A',
            username: 'pid191',
            email: 'pid191@gmail.com',
            phoneNumber: '0864213579',
        },
    ]
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='Tài khoản khách hàng' />
                <ButtonCreate 
                    to='create'
                    action='Thêm'
                    icon='userAdd'
                />
            </div>

            <div style={{ margin: 15 }}></div>

            <TableContainer 
                type="account"
                data={data}
            />
        </div>
    )
}

export default Account