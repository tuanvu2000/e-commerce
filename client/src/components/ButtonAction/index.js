import React from 'react'
import { Button } from 'antd'
import clsx from 'clsx'
import styles from './ButtonAction.module.scss'

const ButtonAction = ({ action, icon, color }) => {
    const arrIcon = {
        userAdd: <i className="fas fa-user-plus"></i>,
        return: <i className="fas fa-undo"></i>,
        // return:<i className="fas fa-long-arrow-alt-left"></i>
    }
    
    const clickBack = () => {
        if (action === 'Quay lại') {
            window.history.back()
        }
    }

    return (    
        <Button
            type='primary'
            icon={arrIcon[icon]}
            onClick={clickBack}
            className={clsx(styles.btn, {
                [styles.blue] : color === 'blue',
                [styles.red] : color === 'red',
                [styles.black] : color === 'black',
                [styles.orange] : color === 'orange',
            })}
        >
            {action}
        </Button>
    )
}

export default ButtonAction