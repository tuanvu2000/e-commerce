import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'

const AppLayout = () => {
    return (
        <div styles={{ minHeight: '100vh' }}>
            <Header />
            <div style={{ minHeight: 500 }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout