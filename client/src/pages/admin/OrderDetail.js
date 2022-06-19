import { useState, useEffect } from 'react'
import { Row, Col, Modal, message } from 'antd'
import { CloseCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Loading, ButtonAction } from '../../components/UI'
import orderApi from '../../api/orderApi'
import clsx from 'clsx'
import styles from '../../assets/styles/Order.module.scss'
import moment from 'moment'

const OrderDetail = () => {
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const id = window.location.pathname.split('/admin/order/')[1]
        const getApi = async () => {
            const res = await orderApi.getOne(id)
            setOrder(res)
            setLoading(false)
        }
        getApi()
    }, [loading])

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;

        return numToString.replace(regex, '.')
    }

    const handlePriceSale = (item) => {
        const sale = (item.sale * item.price) / 100
        return item.price - sale
    }

    const onDrop = () => {
        Modal.confirm({
            title: 'Hủy đơn',
            icon: <CloseCircleOutlined style={{ color: '#FF2828' }} />,
            content: 'Bạn xác nhận hủy đơn hàng này ?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                setLoading(true)
                try {
                    await orderApi.updateState(order.id, { status: 'Hủy đơn hàng' })
                    await message.success('Hủy đơn hàng thành công')
                    setLoading(false)
                } catch (error) {
                    await message.error('Không thể hủy đơn hàng này')
                    setLoading(false)
                }
            }
        })
    }

    const onSuccess = () => {
        Modal.confirm({
            title: 'Đã giao',
            icon: <CheckCircleOutlined style={{ color: '#49AA19' }} />,
            content: 'Bạn xác nhận đơn hàng đã được giao này ?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                setLoading(true)
                try {
                    await orderApi.updateState(order.id, { status: 'Đã hoàn thành' })
                    await message.success('Đơn hàng đã thành hoàn')
                    setLoading(false)
                } catch (error) {
                    await message.error('Không thể hoàn thành đơn hàng này')
                    setLoading(false)
                }
            }
        })
    }

    const onPending = () => {
        Modal.confirm({
            title: 'Khôi phục trạng thái',
            icon: <WarningOutlined style={{ color: '#D89614' }} />,
            content: 'Bạn xác nhận khôi phục lại đơn hàng này ?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                setLoading(true)
                try {
                    await orderApi.updateState(order.id, { status: 'Chờ xử lý' })
                    await message.success('Đơn hàng đã được khôi phục mới')
                    setLoading(false)
                } catch (error) {
                    await message.error('Không thể khôi phục đơn hàng này')
                    return setLoading(false)
                }
            }
        })
    }

    return (
        <div>
            {
                loading
                ? <Loading />
                : <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.header, styles.flex)}>
                        <h2>{order.orderId}</h2>
                        <div className={clsx(styles.flex, styles.space)}>
                            <ListButton 
                                status={order.status} 
                                id={order.id}
                                onSuccess={onSuccess}
                                onPending={onPending}
                                onDrop={onDrop}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={clsx(styles.info)}>
                            <Row>
                                <Col span={10} className={clsx(styles.left)}>
                                    <Row>
                                        <Col span={8}>Tình trạng:</Col>
                                        <Col 
                                            span={16}
                                            className={clsx(styles.status ,{
                                                [styles.orange]: 'Chờ xử lý' === order.status,
                                                [styles.green]: 'Đã hoàn thành' === order.status,
                                                [styles.red]: 'Hủy đơn hàng' === order.status
                                            })}
                                        >
                                            {order.status}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>Ngày đặt hàng:</Col>
                                        <Col span={16}>{moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>Giá trị đơn hàng:</Col>
                                        <Col span={16}>{handleMoney(order.total)} đ</Col>
                                    </Row>
                                </Col>
                                <Col span={14} className={clsx(styles.right)}>
                                    <Row>
                                        <Col span={12}>
                                            <span>Tên khách hàng:</span>
                                            <br />
                                            <span>{order.customer.fullName}</span>
                                        </Col>
                                        <Col span={12}>
                                            <span>Số điện thoại:</span>
                                            <br />
                                            <span>{order.customer.phoneNumber}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <span>Địa chỉ:</span>
                                                <br />
                                            <span>{order.customer.address}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        <div className={clsx(styles.detail)}>
                            <span className={clsx(styles.title)}>Chi tiết</span>
                            <div className={clsx(styles.list)}>
                                {
                                    order.products.map(item => (
                                        <div key={item.productId.id} className={clsx(styles.item)}>
                                            <img src={item.productId.image} alt={item.productId.namePd} />
                                            <div className={clsx(styles.product)}>
                                                <Row style={{ width: '100%'}}>
                                                    <Col span={10}>
                                                        <div>
                                                            <p>Tên sản phẩm</p>
                                                            <p>{item.productId.namePd}</p>
                                                        </div>
                                                    </Col>
                                                    <Col span={3}>
                                                        <div>
                                                            <p>Đơn giá</p>
                                                            {
                                                                item.productId.sale > 0
                                                                ? <>
                                                                    <p className={clsx(styles.drop)}>{handleMoney(item.productId.price)}</p>
                                                                    <p>{handleMoney(handlePriceSale(item.productId))}</p>
                                                                </>
                                                                : <p>{handleMoney(item.productId.price)}</p>
                                                            }
                                                            {/* <p>{handleMoney(item.productId.price)}</p> */}
                                                        </div>
                                                    </Col>
                                                    <Col span={3}>
                                                        <div>
                                                            <p>Số lượng</p>
                                                            <p>{item.quantity}</p>
                                                        </div>
                                                    </Col>
                                                    <Col span={3}>
                                                        <div>
                                                            <p>Tổng tiền</p>
                                                            <p>{handleMoney(item.productId.price * item.quantity)}</p>
                                                        </div>
                                                    </Col>
                                                    <Col span={5}>
                                                        <div>
                                                            <p>Quà khuyến mãi</p>
                                                            <p>Không có</p>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderDetail

const ListButton = ({ status, id, onSuccess, onPending, onDrop }) => {
    const changeData = {
        'Chờ xử lý': 'pending',
        'Đã hoàn thành': 'success',
        'Hủy đơn hàng': 'drop',
    }

    const listStatus = {
        pending: [
            {
                action: 'Xóa đơn hàng',
                color: 'red-inner'
            },
            {
                action: 'Hủy đơn hàng',
                color: 'red',
                icon: 'close',
                onDrop: onDrop
            },
            {
                action: 'Hoàn thành',
                color: 'blue',
                icon: 'check',
                onSuccess: onSuccess
            },
        ],
        success: [
            {
                action: 'Xóa đơn hàng',
                color: 'red-inner'
            },
            {
                action: 'Khôi phục',
                color: 'orange',
                icon: 'pending',
                onPending: onPending
            }
        ],
        drop: [
            {
                action: 'Xóa đơn hàng',
                color: 'red-inner'
            },
            {
                action: 'Khôi phục',
                color: 'orange',
                icon: 'pending',
                onPending: onPending
            }
        ],
    }

    return (
        <>
            {
                listStatus[changeData[status]].map((button, index) => (
                    <div key={index}>
                        <ButtonAction
                            action={button.action}
                            color={button.color}
                            icon={button.icon ? button.icon : ''}
                            onSuccess={button.onSuccess ? button.onSuccess : null}
                            onPending={button.onPending ? button.onPending : null}
                            onDrop={button.onDrop ? button.onDrop : null}
                        />
                    </div>
                ))
            }
        </>
    )
}