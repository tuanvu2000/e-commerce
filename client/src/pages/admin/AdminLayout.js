import React from 'react'
import { Outlet } from 'react-router-dom';
import { SideBar, HeaderAdmin } from '../../components'
import clsx from 'clsx'
import styles from '../../assets/styles/AdminLayout.module.scss'
import { useSelector } from 'react-redux'

const AdminLayout = () => {
    const openSidebar = useSelector((state) => state.config.open)

    const mainStyle = clsx(styles.wrapper, {
        [styles.collapse]: openSidebar
    })
    const wrapContent = clsx(styles.wrapContent)
    
    return (
        <div>
            <SideBar />
            <div className={mainStyle}>
                <HeaderAdmin />
                <div className={wrapContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout