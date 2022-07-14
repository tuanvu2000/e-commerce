import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'

const AppLayout = () => {
    document.querySelector('#fb-root').style.display = 'block';

    return (
        <div style={{ minHeight: '100vh'}}>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default AppLayout