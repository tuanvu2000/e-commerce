import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    AdminLayout,
    Dashboard,
    Product,
    Account,
    AccountCreate,
    Order,
    Total
} from './pages/admin'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="product" element={<Product />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/create" element={<AccountCreate />} />
                    <Route path="order" element={<Order />} />
                    <Route path="total" element={<Total />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
