import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    AdminLayout,
    Dashboard,
    Account,
    AccountCreate,
    AccountDetail,
    Product,
    ProductCreate,
    ProductDetail,
    Order,
    Total
} from './pages/admin'
import {
    AppLayout,
    Login
} from './pages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<AppLayout />} />
                <Route path="login" element={<Login />} />
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/create" element={<AccountCreate />} />
                    <Route path="account/:id" element={<AccountDetail />} />
                    <Route path="product" element={<Product />} />
                    <Route path="product/create" element={<ProductCreate />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="order" element={<Order />} />
                    <Route path="total" element={<Total />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
