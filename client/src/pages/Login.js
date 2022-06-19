import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../assets/styles/Login.module.scss'
import { ArrowLeftOutlined } from '@ant-design/icons'
// import { messageText } from '../redux/slices/messageSlice'
// import { useDispatch } from 'react-redux'
import userApi from '../api/userApi'

const Login = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const [form] = Form.useForm()

    useEffect(() => {
        const checkToken = localStorage.getItem('access_token')
        if (checkToken) return navigate('/')
    }, [navigate])

    const onSave = async () => {
        try {
            const values = await form.validateFields()
            const apiRes = await userApi.login(values)
            localStorage.setItem('access_token', apiRes.token)
            message.success('Đăng nhập thành công')
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (error) {
            message.error('Đăng nhập thất bại, vui lòng thử lại')
            console.log('error: ', error)
        }
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.wrapBtn)}>
                <Button 
                    type='primary' 
                    icon={<ArrowLeftOutlined />} 
                    onClick={() => navigate('/')}
                >
                    Quay lại
                </Button>
            </div>
            <div className={clsx(styles.box)}>
                <h2 className={clsx(styles.title)}>Đăng nhập</h2>
                <div className={clsx(styles.form)}>
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[
                                {
                                    required: true,
                                    message: "Tên đăng nhập không được để trống",
                                },
                                {
                                    type: 'string',
                                    min: 3,
                                    message: "Tên đăng nhập phải hơn 3 kí tự"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Mật khẩu không được để trống"
                                },
                                {
                                    type: 'string',
                                    min: 3,
                                    message: "Mật khẩu phải tối thiểu 3 kí tự"
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <button onClick={onSave} className={clsx(styles.btn)}>Đăng nhập</button>
                    </Form>
                </div>
                <div className={clsx(styles.link)}>
                    <Link to=".">Quên mật khẩu</Link>
                    <Link to="../register">Đăng ký</Link>
                </div>
                <p className={clsx(styles.content)}>Hãy là một người phượt có văn hóa và giúp nó trải dài khắp Việt Nam</p>
            </div>
        </div>
    )
}

export default Login