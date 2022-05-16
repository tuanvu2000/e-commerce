import React from 'react'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../assets/styles/Login.module.scss'

const Login = () => {
    const [form] = Form.useForm()

    return (
        <div className={clsx(styles.wrapper)}>
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
                                    message: "Không được bỏ trống"
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
                                    message: "Không được bỏ trống"
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <button className={clsx(styles.btn)}>Đăng nhập</button>
                    </Form>
                </div>
                <div className={clsx(styles.link)}>
                    <Link to=".">Quên mật khẩu</Link>
                    <Link to=".">Đăng ký</Link>
                </div>
                <p className={clsx(styles.content)}>Hãy là một người phượt có văn hóa và giúp nó trải dài khắp Việt Nam</p>
            </div>
        </div>
    )
}

export default Login