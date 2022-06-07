import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import { InfoAccount, TableContainer } from '../components'
import { Loading, ButtonAction } from '../components/UI'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from '../assets/styles/Profile.module.scss'
import moment from 'moment'
import userApi from '../api/userApi'

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({})
    const [form] = Form.useForm()
    const urlImg = useSelector((state) => state.saved.user)

    useEffect(() => {
        const getApi = async () => {
            if (localStorage.getItem('access_token')) {
                const res = await userApi.checkToken()
                setUser(res)
                setLoading(false)
            }
        }
        getApi()
    }, [])

    const onSave = async () => {
        setLoading(true)
        try {
            const values = await form.validateFields();
            const birthday = values.birthday
            const newValue = {
                ...values,
                birthday: birthday ? moment(birthday).format() : birthday,
                address: values.apartment + ', ' + values.city.reverse().join(', ')
            }
            if (urlImg.url && urlImg.cloudinaryId) {
                newValue.avatar = urlImg.url
                newValue.cloudinaryId = urlImg.cloudinaryId
            }
            // console.log(newValue)
            await userApi.update(user.id, newValue)
            message.success('Create success')
        } catch (error) {
            message.error('error validate')
        }
        setLoading(false)
    }

    return (
        loading
        ? <Loading />
        : <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.flex, styles.space)}>
                {
                    !isEdit ? (
                        <>
                            <div onClick={() => setIsEdit(true)}>
                                <ButtonAction
                                    action='Chỉnh sửa'
                                    icon='edit'
                                    color='orange'
                                />
                            </div>
                            <div>
                                <ButtonAction
                                    action='Quay lại'
                                    icon='return'
                                    color='blue'
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div onClick={() => setIsEdit(false)}>
                                <ButtonAction
                                    action='Hủy'
                                    icon='close'
                                    color='black'
                                />
                            </div>
                            <div onClick={() => setIsEdit(false)}>
                                <ButtonAction
                                    action='Lưu'
                                    icon='add'
                                    color='red'
                                    type='user'
                                    onSave={onSave}
                                />
                            </div>
                        </>
                    )
                }
            </div>

            {/* Hiển thị thông tin tài khoản */}
            <InfoAccount data={user} edit={isEdit} form={form} theme='user' />
            <div className={clsx(styles.divider)}></div>

            {/* Hiển thị lịch sử mua hàng */}
            <p className={clsx(styles.title)}>Lịch sử mua hàng</p>
            <TableContainer 
                type="historyBuy"
                data={dataTest}
                theme="user"
            />
        </div>
    )
}

export default Profile

const dataTest = [
    {
        key: 1,
        stt: 1,
        idOrder: '000001',
        products: [
            {
                nameProduct: 'Mũ Xe Đạp Balder B79 Đen Xanh',
                quantity: 2,
                price: 672000,
            },
            {
                nameProduct: 'Nón 3/4 KYT Venom Leopard',
                quantity: 1,
                price: 2000000,
            }
        ],
        total: 3344000,
        dateOrder: '12/03/2022 07:12:46'
    },
    {
        key: 2,
        stt: 2,
        idOrder: '000002',
        products: [
            {
                nameProduct: 'Nón 3/4 KYT Venom Leopard',
                quantity: 1,
                price: 2000000,
            }
        ],
        total: 2000000,
        dateOrder: '21/04/2022 15:43:25'
    },
    {
        key: 3,
        stt: 3,
        idOrder: '000003',
        products: [
            {
                nameProduct: 'Nón 3/4 KYT Venom Xám Đen Nhám',
                quantity: 1,
                price: 1750000,
            }
        ],
        total: 1750000,
        dateOrder: '23/04/2022 17:22:07'
    }
]