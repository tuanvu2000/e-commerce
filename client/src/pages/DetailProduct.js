import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import productApi from '../api/productApi'
import { Loading } from '../components/UI'
import clsx from 'clsx'
import styles from '../assets/styles/DetailProduct.module.scss'
import { Col, Row } from 'antd'

const DetailProduct = () => {
    const location = useLocation()
    const { id } = location.state
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(true)
    
    const arrData = [
        'size',
        'weight',
        'color',
        'hatMaterial',
        'porousMaterial',
        'liningMaterial',
        'earCover',
        'madeIn',
        'brand',
        'warranty',
        'timeChangeError',
        'transportFee',
        'transportFeeFast',
        'washingHat'
    ]
    const changeData = {
        size: 'Size',
        weight: 'Trọng lượng',
        color: 'Màu sắc',
        hatMaterial: 'Vỏ',
        porousMaterial: 'Xốp',
        liningMaterial: 'Lót',
        earCover: 'Ốp tai',
        madeIn: 'Sản xuất tại',
        brand: 'Thương hiệu',
        warranty: 'Bảo hàng',
        timeChangeError: 'Đổi do lỗi',
        transportFee: 'Phí giao thường',
        transportFeeFast: 'Phí giao nhanh',
        washingHat: 'Giặt nón'
    }
    useEffect(() => {
        const getApi = async () => {
            const res = await productApi.getOne(id)
            // setProduct(res)
            const resData = []
            for (let key in res) {
                if (arrData.includes(key)) {
                    resData.push({

                    })
                }
            }
            setLoading(false)
        }
        getApi()
    }, [id])
    

    const handleSale = (product) => {
        return product.price - ((product.price * product.sale) / 100)
    }

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' đ';
    }

    return (
        <div className={clsx(styles.wrapper)}>
            {
                loading
                ? <Loading />
                : <Row style={{ marginTop: 12 }}>
                    <Col span={12} className={clsx(styles.col)}>
                        <img src={product.image} alt={product.namePd} width="600" />
                    </Col>
                    <Col span={12} className={clsx(styles.col)}>
                        <h2>{product.namePd}</h2>
                        <p className={clsx(styles.price)}>
                            {
                                product.sale > 0
                                ? <>
                                    <span className={clsx(styles.priceOld)}>{handleMoney(product.price)}</span>
                                    <span>{handleMoney(handleSale(product))}</span>
                                </>
                                : <span>{handleMoney(product.price)}</span>
                            }
                        </p>
                        <div className={clsx(styles.content)}>
                            <p>
                                <span>Size:</span>
                                <span>M, L và XL</span>
                            </p>
                            <p>
                                <span>Trọng lượng:</span>
                                <span>850gram</span>
                            </p>
                            <p>
                                <span>Màu sắc:</span>
                                <span>Đen ,trắng, xanh vàng</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default DetailProduct