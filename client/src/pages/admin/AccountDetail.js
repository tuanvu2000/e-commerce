import { useEffect, useState } from 'react'
import { InfoAccount, TableContainer } from '../../components'
import { TitleContent, ButtonAction } from '../../components/UI'
import { Loading } from '../../components/UI'
import { Form, message, Modal } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';
import userApi from '../../api/userApi'
import orderApi from '../../api/orderApi'
import useTitle from '../../hooks/useTitle'
import clsx from 'clsx'
import styles from '../../assets/styles/Account.module.scss'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AccountDetail = () => {
    useTitle('Detail Account')
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [historyOrder, setHistoryOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [form] = Form.useForm()
    const urlImg = useSelector((state) => state.saved.user)
    const id = window.location.pathname.split('/admin/account/')[1]

    useEffect(() => {
        const getData = async () => {
            const resUser = await userApi.getOne(id)
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
        getData()
    }, [id, loading])

    const onSave = async () => {
        setLoading(true)
        try {
            const values = await form.validateFields()
            const birthday = values.birthday
            const newValue = {
                ...values,
                birthday: birthday ? moment(birthday).format() : birthday,
                address: values.apartment + ', ' + values.city.reverse().join(', ')
            }
            if (urlImg.url && urlImg.cloudinaryId) {
                values.avatar = urlImg.url
                values.cloudinaryId = urlImg.cloudinaryId
            }
            await userApi.update(user.id, newValue)
            message.success('Create new user success')
        } catch (error) {
            message.error('Please input all fields required')
        }
        setLoading(false)
    }

    const onDelete = () => {
        Modal.confirm({
            title: 'Delete',
            icon: <CloseCircleOutlined style={{ color: '#FF2828' }} />,
            content: 'Bạn xác nhận xóa sản phẩm này ?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                try {
                    await userApi.delete(id)
                    navigate('../account')
                    message.success('Đã xóa sản phẩm')
                } catch (error) {
                    message.error('Không thể xóa sản phẩm này')
                }
            }
        })
    }

    return (
        <div>
            {
                loading 
                ? <Loading />
                : <>
                    {/* Hiển thị tiêu đề trang và các button */}
                    <div className={clsx(styles.flex)}>
                        <TitleContent content='Thông tin khách hàng' />
                        <div className={clsx(styles.flex, styles.space)}>
                            {
                                !isEdit ? (
                                    <>
                                        <div>
                                            <ButtonAction
                                                action='Xóa tài khoản'
                                                color='red-inner'
                                                onDelete={onDelete}
                                            />
                                        </div>
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
                    </div>

                    {/* Hiển thị thông tin tài khoản */}
                    <InfoAccount data={user} edit={isEdit} form={form} theme="admin" />
                    <div className={clsx(styles.divider)}></div>

                    {/* Hiển thị lịch sử mua hàng */}
                    <p className={clsx(styles.title)}>Lịch sử mua hàng</p>
                    <TableContainer 
                        type="historyBuy"
                        data={historyOrder}
                        theme="admin"
                    />
                </>
            }
        </div>
    )
}

export default AccountDetail

// const dataTest = [
//     {
//         key: 1,
//         stt: 1,
//         idOrder: '000001',
//         products: [
//             {
//                 nameProduct: 'Mũ Xe Đạp Balder B79 Đen Xanh',
//                 quantity: 2,
//                 price: 672000,
//             },
//             {
//                 nameProduct: 'Nón 3/4 KYT Venom Leopard',
//                 quantity: 1,
//                 price: 2000000,
//             }
//         ],
//         total: 3344000,
//         dateOrder: '12/03/2022 07:12:46'
//     },
//     {
//         key: 2,
//         stt: 2,
//         idOrder: '000002',
//         products: [
//             {
//                 nameProduct: 'Nón 3/4 KYT Venom Leopard',
//                 quantity: 1,
//                 price: 2000000,
//             }
//         ],
//         total: 2000000,
//         dateOrder: '21/04/2022 15:43:25'
//     },
//     {
//         key: 3,
//         stt: 3,
//         idOrder: '000003',
//         products: [
//             {
//                 nameProduct: 'Nón 3/4 KYT Venom Xám Đen Nhám',
//                 quantity: 1,
//                 price: 1750000,
//             }
//         ],
//         total: 1750000,
//         dateOrder: '23/04/2022 17:22:07'
//     }
// ]