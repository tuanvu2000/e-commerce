import React from 'react'
import { Col } from 'antd'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './CardProduct.module.scss'

const CardProduct = ({ product }) => {

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.');
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
        <Col span={6} key={product.id} className={clsx(styles.hover)}>
            <div className={clsx(styles.col)}>
                <Link to={`../${removeAccents(product.namePd)}/detail`} state={{ id: product._id }}>
                    <img src={product.image} alt={product.namePd} />
                </Link>
                <div className={clsx(styles.textBox)}>
                    <div className={clsx(styles.wrapNote)}>
                        {
                            product.sale > 0 &&
                            <div className={clsx(styles.note)}>
                                <span className={clsx(styles.icon)}>
                                    <i className='bx bxs-hot'></i>
                                </span>
                                <span className={clsx(styles.noteContent)}>
                                    {product.sale}%
                                </span>
                            </div> 
                        }
                        {
                            product.inventory === 0 &&
                            <div className={clsx(styles.note)}>
                                <span className={clsx(styles.noteContent)}>
                                    sold out
                                </span>
                            </div> 
                        }
                    </div>
                    <p className={clsx(styles.name)}>
                        <Link to={`../${removeAccents(product.namePd)}/detail`} state={{ id: product._id }}>
                            {product.namePd}
                        </Link>
                    </p>
                    <p>
                        {
                            product.sale > 0
                            ? <>
                                <span className={clsx(styles.odd)}>
                                    {handleMoney(product.price)} đ
                                </span>
                                <span>
                                    {handleMoney(product.priceSale)} đ</span>
                            </>
                            : <span>{handleMoney(product.price)} đ</span>
                        }
                    </p>
                </div>
            </div>
        </Col>
    )
}

export default CardProduct