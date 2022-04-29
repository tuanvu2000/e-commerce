import React from 'react'
import { Link } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div style={{ margin: 50, fontSize: 30 }}>
            <Link to="admin">Page Admin</Link>
        </div>
    )
}

export default AppLayout