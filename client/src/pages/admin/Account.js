import React, { useState, useEffect } from 'react'
import { TitleContent, TableContainer, ButtonCreate } from '../../components'
import useTitle from '../../hooks/useTitle'
import userApi from '../../api/userApi'

const Account = () => {
    useTitle('Account')

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const apiRes = await userApi.getAll()
                const resData = []
                for (let key in apiRes) {
                    resData.push({
                        ...apiRes[key],
                        key: key,
                        stt: parseInt(key) + 1
                    })
                }
                setLoading(false)
                setList(resData)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    // const data = [
    //     {
    //         key: 1,
    //         stt: 1,
    //         fullname: 'Vũ Đình Tuân',
    //         username: 'abc123',
    //         email: 'abc123@gmail.com',
    //         phoneNumber: '0123456789',
    //     },
    //     {
    //         key: 2,
    //         stt: 2,
    //         fullname: 'Hồ Đức Thế Minh',
    //         username: 'uhi54',
    //         email: 'uhi54@gmail.com',
    //         phoneNumber: '0987654321',
    //     },
    //     {
    //         key: 3,
    //         stt: 3,
    //         fullname: 'Nguyễn Văn A',
    //         username: 'pid191',
    //         email: 'pid191@gmail.com',
    //         phoneNumber: '0864213579',
    //     },
    // ]
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='Tài khoản khách hàng' />
                <ButtonCreate
                    to='create'
                    action='Thêm'
                    icon='add'
                />
            </div>

            <div style={{ margin: 15 }}></div>

            <TableContainer 
                type="account"
                data={list}
                loading={loading}
            />
        </div>
    )
}

export default Account