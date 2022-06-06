import { useState, useEffect } from 'react'
import { Form, Input, Radio, DatePicker, Cascader } from 'antd'
import clsx from 'clsx'
import styles from './FormCreateUser.module.scss'
import { data } from '../../api/tinhthanh'

const FormCreateUser = ({form}) => {
    const [options, setOptions] = useState()

    const validation = {
        fullname: [
            {
                required: true,
                message: 'Please input your fullname!',
            }
        ],
        username: [
            {
                required: true,
                message: 'Please input your username!',
            }
        ],
        password: [
            {
                required: true,
                message: 'Please input your password!',
            },
            {
                type: 'string',
                min: 3
            }
        ],
        email: [
            {
                required: true,
                message: 'Please input your email!',
            },
            {
                type: 'email',
                message: 'email not valid!',
            }
        ],
        numberPhone: [
            {
                required: true,
                message: 'Please input your numberPhone!',
            },
        ],
        address: [
            {
                required: true,
                message: 'Please input your address!',
            },
        ],
        city: [
            {
                required: true,
                message: 'Please input your city!',
            },
        ],
        apartment: [
            {
                required: true,
                message: 'Please input your apartment number!',
            },
        ]
    }

    useEffect(() => {
        const formatArr = []
        data.forEach((item) => {
            const chilArr = []
            item['level2s'].forEach((chil) => {
                const chilArr2 = []
                chil['level3s'].forEach((chil2) => {
                    chilArr2.push({
                        value: chil2.name,
                        label: chil2.name,
                    })
                })
                chilArr.push({
                    value: chil.name,
                    label: chil.name,
                    children: chilArr2
                })
            })
            formatArr.push({
                value: item.name,
                label: item.name,
                children: chilArr
            })
        })
        setOptions(formatArr)
    }, [])

    return (
        <div className={clsx(styles.wrapper)}>
            <Form
                form={form}
                name="accountCreate"
                labelCol={{
                    span: 6
                }}
                wrapperCol={{
                    span: 18
                }}
                autoComplete="off"
                size='large'
            >
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={validation.fullname}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tài khoản"
                    name="username"
                    rules={validation.username}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={validation.password}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={validation.email}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giới tính"
                    name="gender"
                    initialValue="male"
                >
                    <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="birthday"
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={validation.numberPhone}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={validation.city}
                >
                    <Cascader options={options} />
                </Form.Item>
                <Form.Item
                    label="Số nhà"
                    name="apartment"
                    rules={validation.apartment}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormCreateUser