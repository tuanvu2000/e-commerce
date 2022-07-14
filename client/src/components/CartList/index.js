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

    const handleRemove = (e, index) => {
        e.preventDefault()
        dispatch(removeOrder(index))
    }

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' đ';
    }

    const removeAccents = (str) => {
        return str.toLowerCase()
                .normalize('NFD')                   // chuyển chuỗi sang unicode tổ hợp
                .replace(/[\u0300-\u036f]/g, '')    // xóa các ký tự dấu sau khi tách tổ hợp
                .replace(/[đĐ]/g, 'd')              // Thay ký tự đ Đ
                .replace(/([^0-9a-z-\s])/g, '')     // Xóa ký tự đặc biệt
                .replace(/(\s+)/g, '-')             // Xóa khoảng trắng thay bằng ký tự -
                .replace(/-+/g, '-')                // Xóa ký tự - liên tiếp
                .replace(/^-+|-+$/g, '');           // xóa phần dư - ở đầu & cuối
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.list)}>
                {
                    order.list.map((item, index) => (
                        <Link 
                            key={item.id + item.size} 
                            to={`../${removeAccents(item.name)}/detail`} 
                            state={{ id: item.id }} 
                            className={clsx(styles.item)}
                        >
                            <img src={item.image} alt="non" width="60" height="60" />
                            <div>
                                <p>{item.name} ({item.size})</p>
                                <p>
                                    <span>{item.quantity}</span> * <span>{handleMoney(item.priceSale)}</span>
                                </p>
                            </div>
                            <span onClick={(e) => handleRemove(e, index)}>
                                <i className="far fa-times-circle"></i>
                            </span>
                        </Link>
                    ))
                }
            </div>
            {
                order.list.length > 0 
                ? (
                    <>
                        <p className={clsx(styles.total)}>Tổng tiền: {handleMoney(order.total)}</p>
                        <button className={clsx(styles.btn, styles.yellow)}>
                            <Link to="gio-hang">Xem giỏ hàng</Link>
                        </button>
                        <button className={clsx(styles.btn, styles.red)}>
                            <Link to="thanh-toan">Đặt hàng</Link>
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