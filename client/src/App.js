import React from 'react'
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
    OrderDetail,
    Total
} from './pages/admin'
import {
    AppLayout,
    Login,
    Register,
    Home,
    Profile,
    DetailProduct,
    OrderList,
    Pay,
    Promotion,
    Store,
    NotFound
} from './pages'
import { BanHang, MuaHang, GiaoHang, BaoVe } from './pages/subs';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path=":product/detail" element={<DetailProduct />} />
                    {[
                        ":type/",
                        "non-bao-hiem/:type/",
                        "phu-kien/:type/",
                        "thuong-hieu/:type/"
                    ].map((path, index) => 
                    <Route path={path} element={<Store />} key={index} />)}
                    <Route path="giam-gia" element={<Promotion />} />
                    <Route path="gio-hang" element={<OrderList />} />
                    <Route path="thanh-toan" element={<Pay />} />
                    <Route path="policy">
                        <Route path="ban-hang" element={<BanHang />} />
                        <Route path="mua-hang" element={<MuaHang />} />
                        <Route path="giao-hang" element={<GiaoHang />} />
                        <Route path="bao-ve" element={<BaoVe />} />
                    </Route>
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/create" element={<AccountCreate />} />
                    <Route path="account/:id" element={<AccountDetail />} />
                    <Route path="product" element={<Product />} />
                    <Route path="product/create" element={<ProductCreate />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="order" element={<Order />} />
                    <Route path="order/:id" element={<OrderDetail />} />
                    <Route path="total" element={<Total />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
