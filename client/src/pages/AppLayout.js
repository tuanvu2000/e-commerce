import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'
import useSrcollTop from '../hooks/useSrcollTop'

const AppLayout = () => {
    // useSrcollTop()
    return (
        <div style={{ minHeight: '100vh' }}>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout