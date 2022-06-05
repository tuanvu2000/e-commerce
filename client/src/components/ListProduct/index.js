import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './ListProduct.module.scss'
import { Link } from 'react-router-dom'
import productApi from '../../api/productApi'
import { Col, Row } from 'antd'
import { Loading } from '../UI'

const ListProduct = ({ category, subCategory, title }) => {
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const changeData = () => {
            if (category === 'Nón') {
                if (subCategory === 'Nón bảo hiểm 3/4')
                    return 'non+non-34'
                if (subCategory === 'Nón bảo hiểm full-face')
                    return 'non+non-fullface'
                if (subCategory === 'Nón nửa đầu')
                    return 'non+non-nua-dau'
                if (subCategory === 'Nón trẻ em')
                    return 'non+non-tre-em'
                if (subCategory === 'Mũ xe đạp')
                    return 'non+mu-xe-dap'
            }
            if (category === 'Phụ kiện') {
                if (!subCategory)
                    return 'phukien'
                if (subCategory === 'Kính')
                    return 'phukien+kinh'
                if (subCategory === 'Găng tay')
                    return 'phukien+gang-tay'
                if (subCategory === 'Orther')
                    return 'phukien+other'
            }
        }
        setLoading(true)
        const getApi = async () => {
            if (category === '' & subCategory === '') {
                const resApi = await productApi.getBestSell()
                // const resLimit = resApi.filter((item, index) => index < 8)
                setProducts(resApi.filter((item, index) => index < 8))
                setLoading(false)
            } else {
                const resApi = await productApi.getCategory(changeData(category, subCategory))
                setProducts(resApi.filter((item, index) => index < 8))
                setLoading(false)
            }
        }
        getApi()
    }, [category, subCategory   ])

    const handleSale = (product) => {
        return product.price - ((product.price * product.sale) / 100)
    }

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
            <Horizontal text={title} url="." />
            {
                loading
                ? <Loading />
                : <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                    {
                        products
                        && products.map(product => (
                            <Col span={6} key={product.id}>
                                <div className={clsx(styles.col)}>
                                    <Link to={removeAccents(product.namePd)+'/detail'} state={{ id: product.id }}>
                                        <img src={product.image} alt={product.namePd} />
                                    </Link>
                                    <div className={clsx(styles.textBox)}>
                                        {
                                            product.sale > 0 &&
                                            <div className={clsx(styles.promotion)}>
                                                <span className={clsx(styles.icon)}>
                                                    <i className='bx bxs-hot'></i>
                                                </span>
                                                <span className={clsx(styles.sale)}>
                                                    {product.sale}%
                                                </span>
                                            </div> 
                                        }
                                        <p className={clsx(styles.name)}>
                                            <Link to={removeAccents(product.namePd)+'/detail'} state={{ id: product.id }}>
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
                                                        {handleMoney(handleSale(product))} đ</span>
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