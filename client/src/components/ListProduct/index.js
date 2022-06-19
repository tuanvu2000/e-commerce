import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './ListProduct.module.scss'
import { Link } from 'react-router-dom'
import productApi from '../../api/productApi'
import { Col, Row } from 'antd'
import { Loading } from '../UI'

const ListProduct = ({ category, subCategory, title, to }) => {
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getApi = async () => {
            const sort = (category === '' && subCategory === '') ? '-quantitySell' : '-createdAt'
            const res = await productApi.getListType({
                pageSize: 8,
                page: 1,
                type: category,
                value: subCategory,
                sort: sort
            })
            setProducts(res.products)
            setLoading(false)
        }
        getApi()
    }, [category, subCategory])

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
        <div className={clsx(styles.wrapper)}>
            <Horizontal text={title} url={to} />
            {
                loading
                ? <Loading />
                : <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                    {
                        products
                        && products.map(product => (
                            <Col span={6} key={product._id}>
                                <div className={clsx(styles.col)}>
                                    <Link to={removeAccents(product.namePd)+'/detail'} state={{ id: product._id }}>
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
                                            <Link to={removeAccents(product.namePd)+'/detail'} state={{ id: product._id }}>
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
                        ))
                    }
                </Row>
            }
        </div>
    )
}

export default ListProduct

const Horizontal = ({ text, url }) => {
    return (
        <div className={clsx(styles.wrapHr)}>
            <div>
                <Link to={url}>{text}</Link>
            </div>
            <span></span>
        </div>
    )
}