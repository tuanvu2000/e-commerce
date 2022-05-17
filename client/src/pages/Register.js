import { useState } from 'react'
import { Form, Input, Button, Radio, DatePicker } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../assets/styles/Register.module.scss'
import avt from '../assets/images/avt.jpg'

const Register = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const [nextStep, setNextStep] = useState(false)

    const handleNextStep = () => {
        setNextStep(true)
    }
    const handleReturnStep = () => {
        setNextStep(false)
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
                <div className={clsx(styles.wrapHeader)}>
                    <div className={clsx(styles.text, { [styles.active]: !nextStep })}>
                        Step 1
                    </div>
                    <div className={clsx(styles.text, { [styles.active]: nextStep })}>
                        Step 2
                    </div>
                </div>
                <h2 className={clsx(styles.title)}>Đăng ký</h2>
                <div className={clsx(styles.form)}>
                    <Form
                        form={form}
                        layout="vertical"
                        labelAlign="left"
                        autoComplete="off"
                    >
                        <div className={clsx(
                            styles.step,
                            { [styles.activeStep]: !nextStep })}
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
                            <Form.Item
                                name="confirmPassword"
                                label="Nhập lại mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống"
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống"
                                    }
                                ]}
                            >
                                <Input type="email" />
                            </Form.Item>
                            <button
                                onClick={handleNextStep}
                                className={clsx(styles.btn, styles.red)}
                            >
                                Tiếp theo
                            </button>
                        </div>
                        <div className={clsx(
                            styles.step,
                            styles.row,
                            styles.required,
                            { [styles.activeStep]: nextStep })}
                        >
                            <div className={clsx(styles.uploadImg)}>
                                <img src={avt} alt="upload-img" />
                            </div>
                            <div className={clsx(styles.content)}>
                                <Form.Item
                                    name="fullName"
                                    label={
                                        <>
                                            Họ và tên
                                            <span className={clsx(styles.label)}>&#8727;</span>
                                        </>
                                    }
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
                                    name="gender"
                                    label="Giới tính"
                                    initialValue={"male"}
                                >
                                    <Radio.Group clasName={clsx(styles.flexRow)}>
                                        <Radio value="male">Nam</Radio>
                                        <Radio value="female">Nữ</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <div className={clsx(styles.wrapInput)}>
                                    <Form.Item
                                        name="birthDay"
                                        label="Ngày sinh"
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item
                                        name="phoneNumber"
                                        label={
                                            <>
                                                Số điện thoại
                                                <span className={clsx(styles.label)}>&#8727;</span>
                                            </>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: "Không được bỏ trống"
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    name="address"
                                    label={
                                        <>
                                            Địa chỉ
                                            <span className={clsx(styles.label)}>&#8727;</span>
                                        </>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: "Không được bỏ trống"
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <div className={clsx(styles.btns)}>
                                    <button
                                        onClick={handleReturnStep}
                                        className={clsx(styles.btn, styles.red)}
                                    >
                                        Quay lại
                                    </button>
                                    <button className={clsx(styles.btn, styles.green)}>Hoàn tất</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register