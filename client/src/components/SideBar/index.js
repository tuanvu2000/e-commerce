import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import styles from './SideBar.module.scss'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import noAvatar from '../../assets/images/no-photo.jpg'

const SideBar = ({ admin }) => {
    const openSidebar = useSelector((state) => state.config.open)
    const [pathname, setPathname] = useState(window.location.pathname)
    const [loading, setLoading] = useState(false)
    
    const linkActive = [
        {
            to: "",
            icon: <i className='bx bxs-dashboard'></i>,
            text: 'Dashboard'
        },
        {
            to: "product",
            icon: <i className="fas fa-box"></i>,
            text: 'Products'
        },
        {
            to: "account",
            icon: <i className="fas fa-user-circle"></i>,
            text: 'Accounts'
        },
        {
            to: "order",
            icon: <i className="fas fa-receipt"></i>,
            text: 'Orders'
        },
        {
            to: "total",
            icon: <i className="fas fa-sack-dollar"></i>,
            text: 'Gross revenue'
        }
    ]

    const wrapperStyle = clsx(styles.wrapper, {
        [styles.small]: openSidebar,
    })

    useEffect(() => {
        if (loading) {
            setPathname(window.location.pathname)
            setLoading(false)
        }
    }, [loading])


    return (
        <div className={wrapperStyle}>
            <div className={clsx(styles.logo)}>
                <Link to="../">PHƯỢT CULTURE</Link>
            </div>
            <div className={clsx(styles.avt)}>
                <Avatar src={admin && admin.avatar ? admin.avatar : noAvatar} icon={<UserOutlined />} />
                <div>
                    <p className="fullname">{admin && admin.fullName}</p>
                    <span className={clsx(styles.divider)}></span>
                    <p className="role">{admin ? admin.accountId.role : 'admin'}</p>
                </div>
            </div>
            <div className={clsx(styles.list)}>
                {
                    linkActive.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            onClick={() => setLoading(true)}
                            className={clsx({
                                [styles.active]: link.text !== 'Dashboard' 
                                    ? pathname.split('/admin')[1].match(link.to) 
                                    : pathname.split('/admin')[1] === "" 
                                        ? true 
                                        : false
                            })}
                        >
                            {link.icon}
                            <span className="itemName">{link.text}</span>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default SideBar