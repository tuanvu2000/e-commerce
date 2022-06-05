import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Radio, Row } from 'antd'
import clsx from 'clsx'
import styles from '../assets/styles/OrderList.module.scss'
import { removeOrder } from '../redux/slices/orderSlice'

const OrderList = () => {
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const [quantity, setQuantity] = useState([])
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

    const handleDecrease = (value) => {
        setQuantity([
            quantity[value] > 0 ? quantity[value] - 1 : 0
        ])
    }

    const handleIncrease = (value) => {
        setQuantity([
            quantity[value] + 1
        ])
    }

    const handleOnChange = () => {
        console.log(123)
    }

    const handleClick = () => {
        navigate('/thanh-toan')
    }

    const handleRemove = (index) => {
        dispatch(removeOrder(index))
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <Row gutter={32}>
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
                                            <td>{handleMoney(item.price)}</td>
                                            <td>
                                                <div className={clsx(styles.quantity)}>
                                                    <span>-</span>
                                                    <input value={quantity[index]} onChange={handleOnChange} />
                                                    <span>+</span>
                                                </div>
                                            </td>
                                            <td>{handleMoney(item.price * item.quantity)}</td>
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
                            <button className={clsx(styles.black)}>
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
                                                        <Radio.Group defaultValue={0} className={clsx(styles.checked)}>
                                                            <Radio value={0}>Giao hàng miễn phí (Giao thường)</Radio>
                                                            <Radio value={30000}>Giao hàng nhanh: 30.000 đ</Radio>
                                                        </Radio.Group>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Tổng</th>
                                    <td>{handleMoney(order.total)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={handleClick}
                        >
                            TIẾN HÀNH THANH TOÁN
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default OrderList