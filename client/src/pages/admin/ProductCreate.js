import { useDispatch, useSelector } from 'react-redux'
import { Form, message } from 'antd'
import { FormCreateProduct } from '../../components'
import { ButtonAction, TitleContent } from '../../components/UI'
import useTitle from '../../hooks/useTitle'
import clsx from 'clsx'
import styles from '../../assets/styles/Product.module.scss'
import productApi from '../../api/productApi'
import { saveImgProduct } from '../../redux/slices/savedSlice'

const ProductCreate = () => {
    useTitle('Product Create')
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const urlImg = useSelector((state) => state.saved.product)

    const onSave = async () => {
        try {
            const values = await form.validateFields();
            const newValue = {
                ...values,
                price: values.price.number,
                sale: values.sale.number,
                inventory: values.inventory.number,
                weight: values.weight.number,
                size: values.size.join(", "),
                transportFee: +values.transportFee,
                transportFeeFast: +values.transportFeeFast,
                image: urlImg.url ? urlImg.url : '',
                cloudinaryId: urlImg.cloudinaryId ? urlImg.cloudinaryId : ''
            } 
            await productApi.add(newValue)
            message.success('Create new product success')
            // console.log(newValue)
            dispatch(saveImgProduct({
                url: '',
                cloudinaryId: ''
            }))
        } catch (error) {
            message.error('Please input all fields')
            // console.log('error: ', error)
        }
    }

    return (
        <div>
            <div className={clsx(styles.flex)}>
                <TitleContent content='Thêm sản phẩm mới' />
                <div className={clsx(styles.space)}>
                    <ButtonAction action='Quay lại' icon='return' color='blue' />
                    <ButtonAction action='Lưu' icon='addPd' color='red' onSave={onSave} />
                </div>
            </div>
            <FormCreateProduct
                form={form}
            />
        </div>
    )
}

export default ProductCreate