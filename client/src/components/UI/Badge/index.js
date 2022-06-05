import React from 'react'
import clsx from 'clsx'
import styles from './Badge.module.scss'
import { useSelector } from 'react-redux'

const Badge = () => {
    const orderList = useSelector((state) => state.order.list)
    
    const showQuantity = (list) => {
        const quantity = list.reduce((total, item) => total + item.quantity , 0)
        
        return quantity > 99 ? '99+' : quantity
    }

    return (
        <>
            {
                orderList.length > 0 &&
                <div className={clsx(styles.wrap)}>
                    <span>{showQuantity(orderList)}</span>
                </div>
            }
        </>
    )
}

export default Badge