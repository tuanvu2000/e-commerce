import React, { useEffect, useState } from 'react'
import { Col, Form, Input, Row, Select, Radio, Checkbox, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '../components/UI'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../assets/styles/Pay.module.scss'
import { data } from '../api/tinhthanh'
import { isAuth } from '../handlers/authHandler'
import userApi from '../api/userApi'
import orderApi from '../api/orderApi'
import { resetOrder } from '../redux/slices/orderSlice'

const { Option } = Select
const Pay = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order)
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [initValue, setInitValue] = useState({})
    const [agree, setAgree] = useState('')
    const [transport, setTransport] = useState(order.total > 500000 ? 0 : city.name === 'Thành phố Hồ Chí Minh' ? 20000 : 50000)

    useEffect(() => {
        if (!order.list.length) {
            message.error('Giỏ hàng hiện tại chưa có sản phẩm !')
            return navigate('/')
        }
        const checkUser = async () => {
            setLoading(true)
            const isUser = await isAuth()
            if (!isUser) {
                setLoading(false)
                return false
            }
            try {
                const res = await userApi.checkToken() 
                setUser(res)
                const wardType = ['Phường', 'Thị trấn', 'Xã']
                const findWard = wardType.filter(item => res.address.search(item) !== -1)
                const findWardId = res.address.search(findWard)
                const cityText = res.address.slice(findWardId)
                const cityArr = cityText.split(', ')
                const apartment = res.address.slice(0, findWardId - 2)
                setInitValue({
                    fullName: res.fullName,
                    phoneNumber: res.phoneNumber,
                    email: res.accountId.email,
                    city: cityArr[2],
                    district: cityArr[1],
                    ward: cityArr[0],
                    apartment: apartment
                })
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        checkUser()
        window.scrollTo(0, 0)
    }, [navigate, order.list.length])

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' đ';
    }

    const onChangeTransport = (e) => {
        setTransport(e.target.value)
    }

    const onChangeCity = (value) => {
        const dataCity = data.find(item => item.name === value)
        setCity(dataCity)
        setDistrict(null)
        setWard(null)
        form.resetFields(['district', 'ward'])
    }

    const onChangeDistrict = (value) => {
        const dataDistrict = city.level2s.find(item => item.name === value)
        setDistrict(dataDistrict)
        setWard(null)
        form.resetFields(['ward'])
    }
    
    const onChangeWard = (value) => {
        const dataWard = district.level3s.find(item => item.name === value)
        setWard(dataWard)
    }
    
    const handleCheckAgree = (e) => {
        setAgree(e.target.checked)
    }

    const handleConfirm = async () => {
        if (!order.list.length) {
            message.error('Bạn chưa có sản phẩm nào trong giỏ hàng')
            navigate('/')
            return false
        }
        if (!agree) {
            message.error('Vui lòng nhấn nút đồng ý điều khoản')
            return false
        }  
        try {
            const values = await form.validateFields()
            const products = order.list.map(product => ({
                productId: product.id,
                quantity: product.quantity
            }))
            const apartment = values.apartment
            const ward = values.ward
            const district = values.district
            const city = values.city
            values.address = [apartment, ward, district, city].join(', ')

            await orderApi.new({
                info: {
                    ...values,
                    id: user ? user.id : ''
                },
                products: products,
                transport: transport,
                total: order.total + transport
            })
            message.success('Đặt hàng thành công')
            dispatch(resetOrder({
                list: [],
                total: 0
            }))
            navigate('/')
        } catch (error) {
            message.error('Vui lòng nhập đủ thông tin để shop giao hàng')
        }
    }
    
    const rules = [{
        required: true,
        message: "Không được bỏ trống"
    }]

    return (
        <div className={clsx(styles.wrapper)}>
            {
                loading
                ? <Loading />
                : <Form 
                    form={form}
                    size="large" 
                    layout="vertical"
                    autoComplete="off"
                    initialValues={user ? initValue : null}
                >
                    <Row gutter={32}>
                        <Col span={14}>
                            <div className={clsx(styles.form)}>
                                <h2>THÔNG TIN THANH TOÁN</h2>
                                <Row gutter={32}>
                                    <Col span={24}>
                                        <Form.Item name="fullName" rules={rules}>
                                            <Input placeholder="Họ và tên của bạn" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="phoneNumber" rules={rules}>
                                            <Input placeholder="Số điện thoại của bạn" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="email">
                                            <Input type="email" placeholder="Email của bạn" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} className={clsx(styles.select)}>
                                        <Form.Item name="city" rules={rules}>
                                            <Select 
                                                value={city.name}
                                                onChange={onChangeCity}
                                                placeholder="Chọn tỉnh/thành phố"
                                            >
                                                {
                                                    data.map(item => (
                                                        <Option key={item.level1_id} value={item.name}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} className={clsx(styles.select)}>
                                        <Form.Item name="district" rules={rules}>
                                            <Select 
                                                value={district ? district.name : null}
                                                onChange={onChangeDistrict}
                                                placeholder="Chọn quận/huyện"
                                                allowClear
                                            >
                                                {
                                                    city && city.level2s.map(item => (
                                                        <Option key={item.level2_id} value={item.name}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} className={clsx(styles.select)}>
                                        <Form.Item name="ward" rules={rules}>
                                            <Select 
                                                value={ward ?ward.name : null}
                                                onChange={onChangeWard}
                                                placeholder="Chọn xã/phường"
                                                allowClear
                                            >
                                                {
                                                    district && district.level3s.map(item => (
                                                        <Option key={item.level3_id} value={item.name}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="apartment" rules={rules}>
                                            <Input placeholder="Số nhà, tên đường" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24} className={clsx(styles.textarea)}>
                                        <Form.Item name="notes" label="Ghi chú về đơn hàng">
                                            <Input.TextArea 
                                                placeholder="Ghi chú về thời gian giao hàng hay chỉ dẫn địa điểm chi tiết hơn." 
                                                autoSize={{
                                                    minRows: 3
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className={clsx(styles.form)}>
                                <h2>ĐƠN HÀNG CỦA BẠN</h2>
                                <table className={clsx(styles.tb)}>
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.list.map(item => (
                                                <tr key={item.id + item.size}>
                                                    <td>
                                                        {item.name}
                                                        <strong> x {item.quantity}</strong>
                                                    </td>
                                                    <td>{handleMoney(item.quantity * item.priceSale)}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td>
                                                <strong>Tổng sản phẩm:</strong>
                                            </td>
                                            <td>{handleMoney(order.total)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <table className={clsx(styles.tbSub)}>
                                                    <thead>
                                                        <tr>
                                                            <th>Giao hàng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Radio.Group
                                                                    value={transport}
                                                                    onChange={onChangeTransport}
                                                                >
                                                                    {
                                                                        order.total >= 500000
                                                                        ? <Radio value={0}>Giao hàng miễn phí (Giao thường)</Radio>
                                                                        : city.name === 'Thành phố Hồ Chí Minh'
                                                                        ? <Radio value={20000}>Giao hàng thường: 20.000đ (2 - 3 ngày)</Radio>
                                                                        : <Radio value={50000}>Giao hàng thường: 50.000đ (2 - 3 ngày)</Radio>
                                                                    }
                                                                    {
                                                                        city.name === 'Thành phố Hồ Chí Minh'
                                                                        ? <Radio value={30000}>Giao hàng nhanh: 30.000 đ</Radio>
                                                                        : <Radio disabled>Chỉ giao nhanh ở nội thành TP. Hồ Chí Minh</Radio>
                                                                    }
                                                                    {/* <Radio value={30000}>Giao hàng nhanh: 30.000 đ</Radio> */}
                                                                </Radio.Group>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Tổng đơn hàng:</strong>
                                            </td>
                                            <td>{handleMoney(order.total + transport)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <strong>Trả tiền mặt khi nhận hàng</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <Checkbox onChange={handleCheckAgree}>
                                                    Tôi đã đọc và đồng ý với
                                                    <Link to="../policy/ban-hang"> điều khoản và điều kiện </Link>
                                                    của website.
                                                </Checkbox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <button onClick={handleConfirm}>ĐẶT HÀNG</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2">
                                                Bộ phận CSKH sẽ liên hệ bạn qua số điện thoại để xác nhận đơn hàng.
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Form>
            }
        </div>
    )
}

export default Pay