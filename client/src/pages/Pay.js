import React, { useState } from 'react'
import { Col, Form, Input, Row, Select, Radio, Checkbox } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../assets/styles/Pay.module.scss'
import data from '../api/tinhthanh'

const { Option } = Select
const Pay = () => {
    const [form] = Form.useForm()
    const order = useSelector((state) => state.order)
    const [transport, setTransport] = useState(0)
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')


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
    // console.log({
    //     city: city,
    //     district: district,
    //     ward: ward
    // })

    return (
        <div className={clsx(styles.wrapper)}>
            <Form 
                form={form}
                size="large" 
                layout="vertical"
                autoComplete="off" 
            >
                <Row gutter={32}>
                    <Col span={14}>
                        <div className={clsx(styles.form)}>
                            <h2>THÔNG TIN THANH TOÁN</h2>
                            <Row gutter={32}>
                                <Col span={24}>
                                    <Form.Item name="fullName">
                                        <Input placeholder="Họ và tên của bạn" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phoneNumber">
                                        <Input placeholder="Số điện thoại của bạn" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="email">
                                        <Input placeholder="Email của bạn" />
                                    </Form.Item>
                                </Col>
                                <Col span={12} className={clsx(styles.select)}>
                                    <Form.Item name="city">
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
                                    <Form.Item name="district">
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
                                    <Form.Item name="ward">
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
                                    <Form.Item name="address">
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
                                                <td>{handleMoney(item.quantity * item.price)}</td>
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
                                                                <Radio value={0}>Giao hàng miễn phí (Giao thường)</Radio>
                                                                <Radio value={30000}>Giao hàng nhanh: 30.000 đ</Radio>
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
                                            <Checkbox>
                                                Tôi đã đọc và đồng ý với
                                                <Link to="."> điều khoản và điều kiện </Link>
                                                của website.
                                            </Checkbox>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">
                                            <button>ĐẶT HÀNG</button>
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
        </div>
    )
}

export default Pay