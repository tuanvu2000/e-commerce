import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './CartList.module.scss'
import empty from '../../assets/images/basket.png'
import { removeOrder } from '../../redux/slices/orderSlice'

const CartList = () => {
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)

    const handleRemove = (index) => {
        dispatch(removeOrder(index))
    }

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' đ';
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.list)}>
                {
                    order.list.map((item, index) => (
                        <div key={item.id + item.size} className={clsx(styles.item)}>
                            <img src={item.image} alt="non" width="60" height="60" />
                            <div>
                                <p>{item.name} ({item.size})</p>
                                <p>
                                    <span>{item.quantity}</span> * <span>{handleMoney(item.price)}</span>
                                </p>
                            </div>
                            <span onClick={() => handleRemove(index)}>
                                <i className="far fa-times-circle"></i>
                            </span>
                        </div>
                    ))
                }
            </div>
            {
                order.list.length > 0 
                ? (
                    <>
                        <p className={clsx(styles.total)}>Tổng tiền: {handleMoney(order.total)}</p>
                        <button className={clsx(styles.btn, styles.yellow)}>
                            <Link to="dat-hang">Xem giỏ hàng</Link>
                        </button>
                        <button className={clsx(styles.btn, styles.red)}>
                            <Link to="thanh-toan">Thanh toán</Link>
                        </button>
                    </>
                )
                : (
                    <div className={clsx(styles.empty)}>
                        <img src={empty} alt="empty order" />
                        <p>Giỏ hàng chưa có sản phẩm nào !</p>
                    </div>
                )
            }
        </div>
    )
}

export default CartList