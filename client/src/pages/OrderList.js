import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Radio, Row } from 'antd'
import clsx from 'clsx'
import styles from '../assets/styles/OrderList.module.scss'
import { removeOrder } from '../redux/slices/orderSlice'
import empty from '../assets/images/basket.png'

const OrderList = () => {
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    // const [orderNew, setOrderNew] = useState(order.list)
    const [quantity, setQuantity] = useState([])
    const [transport, setTransport] = useState(order.total >= 500000 ? 0 : 20000)
    // const [list, setList] = useState([])

    useEffect(() => {
        const arrQuantity = []
        for (let value of order.list) {
            arrQuantity.push(value.quantity)
        }
        setQuantity(arrQuantity)
        window.scrollTo(0, 0)
    }, [order])

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' đ';
    }

    // const handleIncrease = (index) => {
    //     const quantityInc = quantity[index]++
    //     const orderInc = {
    //         // ...orderNew[index],
    //         quantity: quantityInc
    //     }
        
        
    //     console.log(orderInc)
    // }

    // const handleIncrease = (value) => {
    //     const newArr = quantity
    //     newArr[value]++

    //     dispatch(increaseOrder({ index: value, quantity: newArr[value] }))
    //     console.log(newArr)
    // }

    const handleOnChange = () => {
        console.log(123)
    }

    const handleClick = () => {
        navigate('/thanh-toan')
    }

    const handleRemove = (index) => {
        dispatch(removeOrder(index))
    }

    const onChangeTransport = (e) => {
        setTransport(e.target.value)
    }

    const handleUpdateOrder = () => {
        
    }

    return (
        <div className={clsx(styles.wrapper)}>
            {
                order.list.length > 0
                ? <Row gutter={32}>
                    <Col span={16}>
                        <div className={clsx(styles.tb, styles.left)}>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan={3}>SẢN PHẨM</th>
                                        <th>GIÁ</th>
                                        <th>SỐ LƯỢNG</th>
                                        <th>TỔNG</th>
                                    </tr>
                                </thead>
                                <tbody className={clsx(styles.bodyLeft)}>
                                    {
                                        order.list.map((item, index) => (
                                            <tr key={item.id + item.size}>
                                                <td>
                                                    <span onClick={() => handleRemove(index)}>
                                                        <i className="far fa-times-circle"></i>
                                                    </span>
                                                </td>
                                                <td>
                                                    <img src={item.image} alt={item.name} />
                                                </td>
                                                <td>
                                                    <div>
                                                        <p>{item.name}</p>
                                                        <p>size: {item.size}</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={clsx(styles.price)}>
                                                        {
                                                            item.sale > 0
                                                            ? <>
                                                                <p className={clsx(styles.priceOld)}>{handleMoney(item.price)}</p>
                                                                <p>{handleMoney(item.priceSale)}</p>
                                                            </>
                                                            : <p>{handleMoney(item.price)}</p>
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={clsx(styles.quantity)}>
                                                        <span>-</span>
                                                        <input value={quantity[index]} onChange={handleOnChange} />
                                                        <span>+</span>
                                                        {/* <span onClick={() => handleIncrease(index)}>+</span> */}
                                                    </div>
                                                </td>
                                                <td>{handleMoney(item.priceSale * item.quantity)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div>
                                <button className={clsx(styles.yellow)} onClick={() => navigate('/')}>
                                    <i className="fas fa-arrow-left"></i>
                                    Xem thêm sản phẩm khác
                                </button>
                                <button className={clsx(styles.black)} onClick={handleUpdateOrder}>
                                    Cập nhật giỏ hàng
                                </button>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={clsx(styles.tb, styles.right)}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ĐƠN HÀNG TỔNG</th>
                                    </tr>
                                </thead>
                                <tbody className={clsx(styles.bodyRight)}>
                                    <tr>
                                        <th>Tạm tính</th>
                                        <td>{handleMoney(order.total)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <table style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Giao hàng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <Radio.Group 
                                                                value={transport} 
                                                                onChange={onChangeTransport}
                                                                className={clsx(styles.checked)}
                                                            >
                                                                {
                                                                    order.total >= 500000
                                                                    ? <Radio value={0}>Giao hàng miễn phí (Giao thường)</Radio>
                                                                    : <Radio value={20000}>Giao hàng thường (2 - 3 Ngày)</Radio>
                                                                }
                                                                {/* <Radio value={0}>Giao hàng miễn phí (Giao thường)</Radio> */}
                                                                <Radio value={30000}>Giao hàng nhanh: 30.000 đ</Radio>
                                                            </Radio.Group>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontSize: 13, color: '#5A5A5A'}}>
                                                            Vận chuyển đến <strong>TP. Hồ Chí Minh</strong>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Tổng</th>
                                        <td>{handleMoney(order.total + transport)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button
                                onClick={handleClick}
                            >
                                XÁC NHẬN THANH TOÁN
                            </button>
                        </div>
                    </Col>
                </Row>
                : <>
                    <div className={clsx(styles.empty)}>
                        <img src={empty} alt="empty order" />
                        <p>Giỏ hàng chưa có sản phẩm nào !</p>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderList