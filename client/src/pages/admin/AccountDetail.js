import React, { useEffect, useState } from 'react'
import userApi from '../../api/userApi'
import { ButtonAction, TitleContent, InfoAccount, TableContainer } from '../../components'
import useTitle from '../../hooks/useTitle'
import clsx from 'clsx'
import styles from '../../assets/styles/Account.module.scss'
import { Form, message } from 'antd'
import moment from 'moment'

const AccountDetail = () => {
    useTitle('Detail Account')

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [form] = Form.useForm()
    const id = window.location.pathname.split('/admin/account/')[1]

    useEffect(() => {
        const getData = async () => {
            const apiRes = await userApi.getOne(id)
            setUser(apiRes)
            setLoading(false)
        }
        getData()
    }, [id, loading])

    const onSave = async () => {
        setLoading(true)
        try {
            const values = await form.validateFields();
            const birthday = values.birthday
            values.birthday = birthday ? moment(birthday).format() : birthday
            await userApi.update(id, values)
            message.success('Create success')
            console.log('render-2')
            // console.log(values)
        } catch (error) {
            // console.log('error validate')
            message.error('error validate')
        }
        setLoading(false)
    }

    return (
        <div>
            {
                loading 
                ? <div>...Loading</div>
                : <>
                    {/* Hiển thị tiêu đề trang và các button */}
                    <div className={clsx(styles.flex)}>
                        <TitleContent content='Thông tin khách hàng' />
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
                                                onSave={onSave}
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* Hiển thị thông tin tài khoản */}
                    <InfoAccount data={user} edit={isEdit} form={form} />
                    <div className={clsx(styles.divider)}></div>

                    {/* Hiển thị lịch sử mua hàng */}
                    <p className={clsx(styles.title)}>Lịch sử mua hàng</p>
                    <TableContainer 
                        type="historyBuy"
                        data={dataTest}
                    />
                </>
            }
        </div>
    )
}

export default AccountDetail

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