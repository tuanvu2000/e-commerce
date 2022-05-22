import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { SideBar, HeaderAdmin } from '../../components'
import { Loading } from '../../components/UI'
import clsx from 'clsx'
import styles from '../../assets/styles/AdminLayout.module.scss'
import { useSelector } from 'react-redux'
import userApi from '../../api/userApi'
import { isAuth } from '../../handlers/authHandler'
import { message } from 'antd';

const AdminLayout = () => {
    const navigate = useNavigate()
    const openSidebar = useSelector((state) => state.config.open)
    const [admin, setAdmin] = useState()

    const mainStyle = clsx(styles.wrapper, {
        [styles.collapse]: openSidebar
    })
    const wrapContent = clsx(styles.wrapContent)

    useEffect(() => {
        const checkApi = async () => {
            await isAuth()
            try {
                const resApi = await userApi.checkToken()
                if (resApi.role === 'admin')
                    setAdmin(resApi)
                else {
                    navigate('/')
                    message.error('Không được phép truy cập')
                }
            } catch (error) {
                navigate('/login')
                message.error('Authorized')
            }
        }
        checkApi()
    }, [navigate])
    
    return (
        <div>
            {
                admin ? (<>
                    <SideBar admin={admin} />
                    <div className={mainStyle}>
                        <HeaderAdmin />
                        <div className={wrapContent}>
                            <Outlet />
                        </div>
                    </div>
                </>) : <Loading />
            }
        </div>
    )
}

export default AdminLayout