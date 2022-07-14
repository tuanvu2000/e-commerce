import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import productApi from '../api/productApi'
import { Loading } from '../components/UI'
import clsx from 'clsx'
import styles from '../assets/styles/DetailProduct.module.scss'
import { Button, Col, Radio, Row, message } from 'antd'
import { addOrder } from '../redux/slices/orderSlice'

const DetailProduct = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { id } = location.state
    const [product, setProduct] = useState()
    const [content, setContent] = useState()
    const [loading, setLoading] = useState(true)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState()
    
    useEffect(() => {
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
        const arrLabel = {
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
        // const arrNo = ['hatMaterial', 'porousMaterial', 'liningMaterial', 'earCover', 'washingHat']
        const changeData = (label, value) => {
            switch (label) {
                case 'size':
                    const arrSize = value.split(', ')
                    if (arrSize.length > 1) {
                        const arrLength = arrSize.length
                        const arrSizeBegin = arrSize.slice(0, arrLength - 1)
                        const arrSizeEnd = arrSize.slice(arrLength - 1).join('')

                        return arrSizeBegin.join(', ') + ' và ' + arrSizeEnd
                    }
                    return value
                case 'weight': 
                    return value + ' gram'
                case 'transportFee':
                case 'transportFeeFast':
                    if (value === 0) return 'Miễn phí'
                    return handleMoney(value)
                default:
                    return value
            }
        }
        const getApi = async () => {
            const res = await productApi.getOne(id)
            setProduct(res)
            const resData = []
            for (let key in res) {
                if (arrData.includes(key) && res[key] !== 'Không') {
                    resData.push({
                        label: arrLabel[key],
                        value: changeData(key, res[key]),
                        order: arrData.indexOf(key)
                    })
                }
            }
            setContent(resData)
            setLoading(false)
            window.scrollTo(0, 0)
        }
        getApi()
    }, [id])
    
    // const handleSale = (product) => {
    //     return product.price - ((product.price * product.sale) / 100)
    // }

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' đ';
    }

    const handleDecrease = () => {
        setQuantity(pre => pre <= 1 ? 1 : pre - 1)
    }

    const handleIncrease = () => {
        setQuantity(pre => pre + 1)
    }
    
    const handleClickAdd = () => {
        setLoadingBtn(true)
        setTimeout(() => {
            if (!size) {
                setLoadingBtn(false)
                return message.error('Vui lòng chọn size phù hợp')
            }
            if (quantity <= product.inventory) {
                dispatch(addOrder({
                    id: product._id,
                    name: product.namePd,
                    image: product.image,
                    size: size,
                    price: product.price,
                    priceSale: product.priceSale,
                    sale: product.sale,
                    quantity: quantity
                }))
                message.success('Đã thêm vào giỏ hàng')
            } else {
                message.error('Số lượng vượt quá số hàng tồn kho của shop')
            }
            setLoadingBtn(false)
            setQuantity(1)
        }, 1000)
    }

    const handleChangeSize = (e) => {
        setSize(e.target.value)
    }

    return (
        <div className={clsx(styles.wrapper)}>
            {
                loading
                ? <Loading />
                : <Row style={{ marginTop: 12 }}>
                    <Col span={12} className={clsx(styles.col)}>
                        <img 
                            src={product.image} 
                            alt={product.namePd} 
                            width="600" 
                        />
                    </Col>
                    <Col span={12} className={clsx(styles.col)}>
                        <h2>{product.namePd}</h2>
                        <p className={clsx(styles.price)}>
                            {
                                product.sale > 0
                                ? <>
                                    <span className={clsx(styles.priceOld)}>{handleMoney(product.price)}</span>
                                    {/* <span>{handleMoney(handleSale(product))}</span> */}
                                    <span>{handleMoney(product.priceSale)}</span>
                                </>
                                : <span>{handleMoney(product.price)}</span>
                            }
                        </p>
                        <p className={clsx(styles.sell)}>Đã bán {product.quantitySell}</p>
                        <div className={clsx(styles.content)}>
                            {
                                content.map(item => (
                                    <p key={item.order} style={{ order: item.order }}>
                                        <span>{item.label}</span>
                                        <span>{item.value}</span>
                                    </p>
                                ))
                            }
                        </div>
                        <div className={clsx(styles.addCart)}>
                            <h3>Chọn kích thước nón:</h3>
                            <Radio.Group onChange={handleChangeSize} value={size}>
                                {
                                    product.size.split(', ').map(item => (
                                        <Radio key={item} value={item}>{item}</Radio>
                                    ))
                                }
                            </Radio.Group>
                            <div className={clsx(styles.confirm)}>
                                <div className={clsx(styles.quantity)}>
                                    <span onClick={handleDecrease}>-</span>
                                    <span>{quantity}</span>
                                    <span onClick={handleIncrease}>+</span>
                                </div>
                                <Button 
                                    type="primary" 
                                    size="large"
                                    onClick={handleClickAdd}
                                    loading={loadingBtn}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                                <span>Tồn kho: {product.inventory}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default DetailProduct