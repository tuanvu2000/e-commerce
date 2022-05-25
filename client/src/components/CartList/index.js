import React from 'react'
import clsx from 'clsx'
import styles from './CartList.module.scss'
import { Link } from 'react-router-dom'

const image="https://res.cloudinary.com/dwf04fosc/image/upload/v1652365706/rcvhp4sqstduja60ian9.jpg"
const CartList = () => {

    const handleRemove = () => {
        console.log("remove product")
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.list)}>
                <div className={clsx(styles.item)}>
                    <img src={image} alt="non" width="60" height="60" />
                    <div>
                        <p>Fullface KYT NFR Trắng A</p>
                        <p>
                            <span>1</span> * <span>3.910.000</span>
                        </p>
                    </div>
                    <span onClick={handleRemove}>
                        <i className="far fa-times-circle"></i>
                    </span>
                </div>
                <div className={clsx(styles.item)}>
                    <img src={image} alt="non" width="60" height="60" />
                    <div>
                        <p>Fullface KYT NFR Trắng</p>
                        <p>
                            <span>1</span> * <span>3.910.000</span>
                        </p>
                    </div>
                    <span onClick={handleRemove}>
                        <i className="far fa-times-circle"></i>
                    </span>
                </div>
            </div>
            <p className={clsx(styles.total)}>Tổng tiền: 7.820.000</p>
            <button className={clsx(styles.btn, styles.yellow)}>
                <Link to=".">Xem giỏ hàng</Link>
            </button>
            <button className={clsx(styles.btn, styles.red)}>
                <Link to=".">Thanh toán</Link>
            </button>
        </div>
    )
}

export default CartList