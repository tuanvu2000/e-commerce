import { Button } from 'antd'
import clsx from 'clsx'
import styles from './ButtonAction.module.scss'

const ButtonAction = ({ action, icon, color, onSave }) => {
    const arrIcon = {
        add: <i className="fas fa-user-plus"></i>,
        return: <i className="fas fa-undo"></i>,
        edit: <i className="fas fa-pen"></i>,
        close: <i className="far fa-times-circle"></i>
    }
    
    const handleAction = () => {
        if (action === 'Quay lại') {
            window.history.back()
        }

        if (action === 'Lưu') {
            onSave()
        }
    }

    return (
        <Button
            type='primary'
            icon={arrIcon[icon]}
            onClick={handleAction}
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