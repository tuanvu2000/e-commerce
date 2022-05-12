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
    Order,
    Total
} from './pages/admin'
import {
    AppLayout
} from './pages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<AppLayout />} />
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/create" element={<AccountCreate />} />
                    <Route path="account/:id" element={<AccountDetail />} />
                    <Route path="product" element={<Product />} />
                    <Route path="product/create" element={<ProductCreate />} />
                    <Route path="order" element={<Order />} />
                    <Route path="total" element={<Total />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
