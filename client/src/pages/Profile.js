import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import { InfoAccount, TableContainer } from '../components'
import { Loading, ButtonAction } from '../components/UI'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from '../assets/styles/Profile.module.scss'
import moment from 'moment'
import userApi from '../api/userApi'
import orderApi from '../api/orderApi'

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({})
    const [historyOrder, setHistoryOrder] = useState([])
    const [form] = Form.useForm()
    const urlImg = useSelector((state) => state.saved.user)

    useEffect(() => {
        const getApi = async () => {
            if (!localStorage.getItem('access_token')) return false

            const resUser = await userApi.checkToken()
            setUser(resUser)

            const resOrder = await orderApi.history(resUser.id)
            const ordersNew = resOrder.map((order, index) => ({
                ...order,
                key: index,
                stt: index + 1
            }))
            setHistoryOrder(ordersNew)
            setLoading(false)
        }
        getApi()
    }, [])

    const onSave = async () => {
        setLoading(true)
        try {
            const values = await form.validateFields();
            const birthday = values.birthday
            const formatComma = /(\s*,\s*)/
            const formatString = /Tỉnh|Thành phố/
            if (values.apartment.search(formatComma) !== -1) {
                setLoading(false)
                message.error('Trong số nhà không được chứa dấu phẩy')
                return false
            }
            const city = values.city[0].search(formatString) === -1
                ? values.city.join(', ')
                : values.city.reverse().join(', ')
            const newValue = {
                ...values,
                birthday: birthday ? moment(birthday).format() : birthday,
                address: values.apartment + ', ' + city
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
                data={historyOrder}
                theme="user"
            />
        </div>
    )
}

export default Profile
