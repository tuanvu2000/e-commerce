import React from 'react'
import clsx from 'clsx'
import styles from '../../assets/styles/AccountCreate.module.scss'
import { ButtonAction, TitleContent } from '../../components'

const AccountCreate = () => {
    return (
        <div>
            <div className={clsx(styles.flex)}>
                <TitleContent content='Thêm khách hàng mới' />
                <div className={clsx(styles.space)}>
                    <ButtonAction action='Quay lại' icon='return' color='blue' />
                    <ButtonAction action='Lưu' icon='userAdd' color='red' />
                </div>
            </div>
        </div>
    )
}

export default AccountCreate