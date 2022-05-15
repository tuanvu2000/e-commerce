import clsx from 'clsx'
import styles from '../../assets/styles/Account.module.scss'
import { ButtonAction, TitleContent, FormCreateUser } from '../../components'
import { Form, message } from 'antd'
import useTitle from '../../hooks/useTitle'
import moment from 'moment'
import userApi from '../../api/userApi'

const AccountCreate = () => {
    useTitle('Account Create')
    const [form] = Form.useForm()
    
    const onSave = async () => {
        try {
            const values = await form.validateFields();
            const birthday = values.birthday
            values.birthday = birthday ? moment(birthday).format() : birthday
            await userApi.register(values)
            message.success('Create success')
        } catch (error) {
            message.error('error validate')
        }
    }

    return (
        <div>
            <div className={clsx(styles.flex)}>
                <TitleContent content='Thêm khách hàng mới' />
                <div className={clsx(styles.space)}>
                    <ButtonAction action='Quay lại' icon='return' color='blue' />
                    <ButtonAction action='Lưu' icon='userAdd' color='red' onSave={onSave} />
                </div>
            </div>
            <FormCreateUser
                form={form}
            />
        </div>
    )
}

export default AccountCreate