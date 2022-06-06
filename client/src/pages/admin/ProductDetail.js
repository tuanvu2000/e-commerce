import { useEffect, useState } from 'react'
import { InfoProduct } from '../../components'
import { ButtonAction, TitleContent } from '../../components/UI'
import { Loading } from '../../components/UI'
import { Form, message, Modal } from 'antd'
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
            const values = await form.validateFields();
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
            // console.log(values)
        } catch (error) {
            message.error('Please input all fields')
            // console.log('error: ', error)
        }
        setLoading(false)
    }

    const onDelete = () => {
        Modal.confirm({
            title: 'Delete',
            icon: <CloseCircleOutlined style={{ color: '#FF2828' }} />,
            content: 'Bạn xác nhận xóa sản phẩm này ?',
            okText: 'Yes',
            cancelText: 'No',
            async onOk() {
                try {
                    await productApi.delete(id)
                    navigate('../product')
                    message.success('Đã xóa sản phẩm')
                } catch (error) {
                    message.error('Không thể xóa sản phẩm này')
                }
            }
        })
    }

    return (
        <div>
            {
                loading 
                ? <Loading />
                : <>
                    {/* Hiển thị tiêu đề trang và các button */}
                    <div className={clsx(styles.flex)}>
                        <TitleContent content='Thông tin sản phẩm' />
                        <div className={clsx(styles.flex, styles.space)}>
                            {
                                !isEdit ? (
                                    <>
                                        <div>
                                            <ButtonAction
                                                action='Xóa sản phẩm'
                                                color='red-inner'
                                                onDelete={onDelete}
                                            />
                                        </div>
                                        <div onClick={() => setIsEdit(true)}>
                                            <ButtonAction
                                                action='Chỉnh sửa'
                                                icon='edit'
                                                color='orange'
                                            />
                                        </div>
                                        <div>
                                            <ButtonAction
                                                action='Quay lại'
                                                icon='return'
                                                color='blue'
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div onClick={() => setIsEdit(false)}>
                                            <ButtonAction
                                                action='Hủy'
                                                icon='close'
                                                color='black'
                                            />
                                        </div>
                                        <div onClick={() => setIsEdit(false)}>
                                            <ButtonAction
                                                action='Lưu'
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

                    {/* Hiển thị thông tin tài khoản */}
                    <InfoProduct data={product} edit={isEdit} form={form} />
                </>
            }
        </div>
    )
}

export default ProductDetail