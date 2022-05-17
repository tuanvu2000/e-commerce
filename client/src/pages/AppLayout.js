import React from 'react'
import { Link } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div style={{ margin: 50, fontSize: 30 }}>
            <Link to="admin">Page Admin</Link>
            <br />
            <Link to="login">Login</Link>
            <br />
            <Link to="register">Register</Link>
        </div>
    )
}

export default AppLayout