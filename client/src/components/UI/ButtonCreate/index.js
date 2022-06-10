import { Button } from 'antd'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './ButtonCreate.module.scss'

const ButtonCreate = ({ to, action, icon }) => {
    const arrIcon = {
        addUser: <i className="fas fa-user-plus"></i>,
        add: <i className="fas fa-plus"></i>
    }

    return (    
        <Link to={to} className={clsx(styles.btn)}>
            <Button type='primary' icon={arrIcon[icon]}>
                {action}
            </Button>
        </Link>
    )
}

export default ButtonCreate