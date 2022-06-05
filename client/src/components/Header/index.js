import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import styles from './Header.module.scss'
import userApi from '../../api/userApi'
import { logout } from '../../handlers/authHandler'
import { navHat, navAccessory, navBrand } from './data'
import { CartList } from '../../components'
import { Badge } from '../../components/UI'

const Header = () => {
    const navigate = useNavigate()
    const refWrap = useRef(null)
    const order = useSelector((state) => state.order)
    const [user, setUser] = useState()
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(refWrap.current.clientHeight)
        const header = document.getElementById('header');
        if (height) {
            header.style.paddingBottom = `${height}px`
        }
    }, [height])

    useEffect(() => {
        const getApi = async () => {
            if (localStorage.getItem('access_token')) {
                const res = await userApi.checkToken()
                setUser(res)
            }
        }
        getApi()
    }, [])

    const handleLogout = () => {
        logout(navigate)
        setUser()
    };

    return (
        <div id="header">
            <div className={clsx(styles.wrapper)} ref={refWrap}>
                <div className={clsx(styles.top)}>
                    <p>Chào mừng bạn đến với Phượt Culture</p>
                    <ul className={clsx(styles.auth)}>
                        {user ? (
                            <>
                                {
                                    user.role === 'admin' 
                                    ? <Link to="admin">{user.fullName}</Link>
                                    : <Link to=".">{user.fullName}</Link>
                                }
                                <li></li>
                                <li>
                                    <Link to="../profile">Thông tin tài khoản</Link>
                                </li>
                                <li></li>
                                <li onClick={handleLogout}>
                                    <span>Đăng xuất</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="login">Đăng nhập</Link>
                                </li>
                                <li></li>
                                <li>
                                    <Link to="register">Đăng ký</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className={clsx(styles.bottom)}>
                    <div className={clsx(styles.logo)}>
                        <Link to='/'>PHƯỢT CULTURE</Link>
                    </div>
                    <ul className={clsx(styles.navbar)}>
                        <li>
                            <Link to="/giam-gia">
                                Khuyến mãi
                            </Link>
                        </li>
                        <li>
                            <Link to="/non-bao-hiem">
                                Nón bảo hiểm
                                <i className="fas fa-angle-down"></i>
                            </Link>
                            <NavbarList data={navHat} />
                        </li>
                        <li>
                            <Link to="/phu-kien">
                                Phụ kiện
                                <i className="fas fa-angle-down"></i>
                            </Link>
                            <NavbarItem data={navAccessory} />
                        </li>
                        <li>
                            <Link to="/thuong-hieu">
                                Thương hiệu
                                <i className="fas fa-angle-down"></i>
                            </Link>
                            <NavbarList data={navBrand} />
                        </li>
                        <li>
                            {
                                order.list.length > 0
                                ? <Link to='dat-hang'>
                                    <i className='bx bx-cart-alt'></i>
                                </Link>
                                : <i className='bx bx-cart-alt'></i>
                            }
                            <CartList />
                            <Badge />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header

const NavbarList = ({ data }) => {
    return (
        <div className={clsx(styles.wrapperNav, styles.large)}>
            {
                data.map(subCategory => (
                    <div key={subCategory.text}>
                        <Link to={subCategory.to}>{subCategory.text}</Link>
                        {
                            subCategory.hasOwnProperty('list') && 
                            <ul>
                                {
                                    subCategory.list.map(item => (
                                        <li key={item.subText}>
                                            <span>{item.subText}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </div>
                ))
            }
        </div>
    )
}

const NavbarItem = ({ data }) => {
    return (
        <div className={clsx(styles.wrapperNav, styles.small)}>
            {
                data.map(item => (
                    <Link to={item.to} key={item.text}>
                        {item.text}
                    </Link>
                ))
            }
        </div>
    )
}