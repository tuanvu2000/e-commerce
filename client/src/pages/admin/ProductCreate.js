import { useSelector } from 'react-redux'
import { Form, message } from 'antd'
import { ButtonAction, TitleContent, FormCreateProduct } from '../../components'
import useTitle from '../../hooks/useTitle'
import clsx from 'clsx'
import styles from '../../assets/styles/Product.module.scss'
import productApi from '../../api/productApi'

const ProductCreate = () => {
    useTitle('Product Create')
    const [form] = Form.useForm()
    const urlImg = useSelector((state) => state.saved.product)

    const onSave = async () => {
        try {
            const values = await form.validateFields();
            const newValue = {
                ...values,
                price: values.price.number,
                size: values.size.join(", "),
                transportFee: +values.transportFee,
                transportFeeFast: +values.transportFeeFast,
                image: urlImg.url ? urlImg.url : '',
                cloudinaryId: urlImg.cloudinaryId ? urlImg.cloudinaryId : ''
            } 
            await productApi.add(newValue)
            message.success('Create new product success')
            console.log(newValue)
        } catch (error) {
            message.error('Please input all fields')
            console.log('error: ', error)
        }
    }

    return (
        <div>
            <div className={clsx(styles.flex)}>
                <TitleContent content='Thêm sản phẩm mới' />
                <div className={clsx(styles.space)}>
                    <ButtonAction action='Quay lại' icon='return' color='blue' />
                    <ButtonAction action='Lưu' icon='userAdd' color='red' onSave={onSave} />
                </div>
            </div>
            <FormCreateProduct
                form={form}
            />
        </div>
    )
}

export default ProductCreate