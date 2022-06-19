import React, { useState, useEffect } from 'react'
import { Row } from 'antd'
import { CardProduct } from '../components'
import { Loading } from '../components/UI'
import clsx from 'clsx'
import styles from '../assets/styles/Promotion.module.scss'
import productApi from '../api/productApi'

const Promotion = () => {
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const getApi = async () => {
            const res = await productApi.getBestSale()
            setProducts(res)
            setLoading(false)
        }
        getApi()
    }, [])

    return (
        <div style={{ minHeight: 500 }}>
            <div className={clsx(styles.slider)}></div>
            <div className={clsx(styles.wrapper)}>
                {
                    loading
                    ? <Loading />
                    : <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                        {
                            products.map(product => (
                                <React.Fragment key={product._id}>
                                    <CardProduct product={product} />
                                </React.Fragment>
                            ))
                        }
                    </Row>
                }
            </div>
        </div>
    )
}

export default Promotion