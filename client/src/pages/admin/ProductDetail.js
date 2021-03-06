import { useEffect, useState } from 'react'
import { InfoProduct } from '../../components'
import { ButtonAction, TitleContent } from '../../components/UI'
import { Loading } from '../../components/UI'
import { Form, InputNumber, message, Modal, Tooltip } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';
import productApi from '../../api/productApi'
import useTitle from '../../hooks/useTitle'
import clsx from 'clsx'
import styles from '../../assets/styles/Product.module.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProductDetail = () => {
    useTitle('Detail Product')
    const navigate = useNavigate()

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [openInput, setOpenInput] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [form] = Form.useForm()
    const id = window.location.pathname.split('/admin/product/')[1]
    const urlImg = useSelector((state) => state.saved.product)

    useEffect(() => {
        const getData = async () => {
            const apiRes = await productApi.getOne(id)
            setProduct(apiRes)
            setLoading(false)
        }
        getData()
    }, [id, loading])

    const onSave = async () => {
        setLoading(true)
        try {
            const values = await form.validateFields()
            values.price = values.price.number
            values.sale = values.sale.number
            values.inventory = values.inventory.number
            values.weight = values.weight.number
            values.size = values.size.join(", ")
            values.transportFee = +values.transportFee
            values.transportFeeFast = +values.transportFeeFast
            if (urlImg.url && urlImg.cloudinaryId) {
                values.image = urlImg.url
                values.cloudinaryId = urlImg.cloudinaryId
            }
            await productApi.update(id, values)
            message.success('Create new product success')
        } catch (error) {
            message.error('Please input all fields')
        }
        setLoading(false)
    }

    const onDelete = () => {
        Modal.confirm({
            title: 'Delete',
            icon: <CloseCircleOutlined style={{ color: '#FF2828' }} />,
            content: 'B???n x??c nh???n x??a s???n ph???m n??y ?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                try {
                    await productApi.delete(id)
                    navigate('../product')
                    message.success('???? x??a s???n ph???m')
                } catch (error) {
                    message.error('Kh??ng th??? x??a s???n ph???m n??y')
                }
            }
        })
    }

    const handleOpenInput = () => {
        setOpenInput(true)
    }
    
    const handleCloseInput = () => {
        setOpenInput(false)
        setQuantity(0)
    }

    const handleChangeQuantity = (value) => {
        setQuantity(value)
    }

    const handleSendRequest = async () => {
        setLoading(true)
        await productApi.putAddQuantity({
            id: product._id,
            quantity: +quantity
        })
        message.success(
            quantity > 0 
            ? `added ${quantity} successful products`
            : `removed ${quantity} successful products`
        )
        setQuantity(0)
        setOpenInput(false)
        setLoading(false)
    }

    

    return (
        <div>
            {
                loading 
                ? <Loading />
                : <>
                    {/* Hi???n th??? ti??u ????? trang v?? c??c button */}
                    <div className={clsx(styles.flex)}>
                        <TitleContent content='Th??ng tin s???n ph???m' />
                        <div className={clsx(styles.subHeader)}>
                            {
                                openInput
                                ? <>
                                    <InputNumber value={quantity} onChange={handleChangeQuantity} />
                                    <i className="fas fa-check-circle" onClick={handleSendRequest} style={{ color: '#2EB85C'}}></i>
                                    <i className="fas fa-times-circle" onClick={handleCloseInput} style={{ color: '#E55353'}}></i>
                                </>
                                : <Tooltip placement="right" onClick={handleOpenInput} title="Th??m s???n ph???m">
                                    <i className="fas fa-plus-circle" style={{ color: '#FF7121', marginLeft: 0 }}></i>
                                </Tooltip>
                            }
                            <div className={clsx(styles.sell)}>
                                <span>???? b??n {product.quantitySell} s???n ph???m</span>
                            </div>
                        </div>


                        <div className={clsx(styles.flex, styles.space)}>
                            {
                                !isEdit ? (
                                    <>
                                        <div>
                                            <ButtonAction
                                                action='X??a s???n ph???m'
                                                color='red-inner'
                                                onDelete={onDelete}
                                            />
                                        </div>
                                        <div onClick={() => setIsEdit(true)}>
                                            <ButtonAction
                                                action='Ch???nh s???a'
                                                icon='edit'
                                                color='orange'
                                            />
                                        </div>
                                        <div>
                                            <ButtonAction
                                                action='Quay l???i'
                                                icon='return'
                                                color='blue'
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div onClick={() => setIsEdit(false)}>
                                            <ButtonAction
                                                action='H???y'
                                                icon='close'
                                                color='black'
                                            />
                                        </div>
                                        <div onClick={() => setIsEdit(false)}>
                                            <ButtonAction
                                                action='L??u'
                                                icon='addPd'
                                                color='red'
                                                type='product'
                                                onSave={onSave}
                                            />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* Hi???n th??? th??ng tin s???n ph???m */}
                    <InfoProduct data={product} edit={isEdit} form={form} />
                </>
            }
        </div>
    )
}

export default ProductDetail