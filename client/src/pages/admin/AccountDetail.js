import { useEffect, useState } from 'react'
import { InfoAccount, TableContainer } from '../../components'
import { TitleContent, ButtonAction } from '../../components/UI'
import { Loading } from '../../components/UI'
import { Form, Select, message, Modal } from 'antd'
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
    const [roleAdmin, setRoleAdmin] = useState('')
    const [roleEdit, setRoleEdit] = useState('')
    const [historyOrder, setHistoryOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [isEditRole, setIsEditRole] = useState(false)
    const [form] = Form.useForm()
    const urlImg = useSelector((state) => state.saved.user)
    const id = window.location.pathname.split('/admin/account/')[1]

    useEffect(() => {
        const getData = async () => {
            const resUser = await userApi.getOne(id)
            setUser(resUser)
            setRoleEdit(resUser.accountId.role)

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

    useEffect(() => {
        const checkRole = async () => {
            const res = await userApi.checkToken()
            setRoleAdmin(res.accountId.role)
        }
        checkRole()
    }, [])

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

    const handleOpenEditRole = () => {
        setIsEditRole(true)
    }
    const handleCloseEditRole = () => {
        setIsEditRole(false)
        setRoleEdit(user.accountId.role)
    }

    const handleChangeRole = (value) => {
        setRoleEdit(value)
    }

    const handleSendRequest = async () => {
        setLoading(true)
        await userApi.changeRole({
            userId: user.accountId.id,
            role: roleEdit
        })
        message.success('Change role user success')
        setIsEditRole(false)
        setLoading(false)
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
                        <div className={clsx(styles.role)}>
                            {
                                isEditRole
                                ? <>
                                    <Select 
                                        style={{ width: 100 }} 
                                        value={roleEdit} 
                                        onChange={handleChangeRole}
                                    >
                                        <Select.Option value='user'>User</Select.Option>
                                        <Select.Option value='admin'>Admin</Select.Option>
                                    </Select>
                                    <i className="fas fa-check-circle" onClick={handleSendRequest} style={{ color: '#2EB85C'}}></i>
                                    <i className="fas fa-times-circle" onClick={handleCloseEditRole} style={{ color: '#E55353'}}></i>
                                </>
                                : <>
                                    <p>( {user.accountId.role} )</p>
                                    {
                                        roleAdmin === 'mod' &&
                                        <i className="fas fa-edit" onClick={handleOpenEditRole}></i>
                                    }
                                </>
                            }
                        </div>

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