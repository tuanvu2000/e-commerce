import { useState } from 'react'
import clsx from 'clsx'
import styles from './HeaderAdmin.module.scss'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { openSidebar } from '../../redux/slices/configSlice'
import { logout } from '../../handlers/authHandler'
import { useNavigate } from 'react-router-dom'

const HeaderAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    const handleOpenSidebar = () => {
        setOpen(!open)
        dispatch(openSidebar(open))
    }

    const handleLogout = () => {
        logout(navigate)
    }
    
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.left)} onClick={handleOpenSidebar}>
                {open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </div>
            <div className={clsx(styles.right)} onClick={handleLogout}>
                <LogoutOutlined className={clsx(styles.icon)} />
                <span>Log out</span>
            </div>
        </div>
    )
}

export default HeaderAdmin