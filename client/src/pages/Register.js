import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, DatePicker, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { saveImgUser } from '../redux/slices/savedSlice'
import axios from 'axios'
import clsx from 'clsx'
import styles from '../assets/styles/Register.module.scss'
import moment from 'moment'
import userApi from '../api/userApi'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const upImage = useSelector((state) => state.saved.user)

    const [nextStep, setNextStep] = useState(false)
    const [next, setNext] = useState(true)
    const [image, setImage] = useState([])

    useEffect(() => {
        const checkToken = localStorage.getItem('access_token')
        if (checkToken) return navigate('/')
    }, [navigate])

    const handleNextStep = (e) => {
        e.preventDefault();
        setNextStep(true)
    }
    const handleReturnStep = (e) => {
        e.preventDefault();
        setNextStep(false)
    }
    const handleComplete = async () => {
        try {
            const values = await form.validateFields()
            const birthday = values.birthday
            const newValues = {
                ...values,
                username: values.username.trim().toLowerCase(),
                birthday: birthday ? moment(birthday).format() : birthday,
                avatar: upImage.url ? upImage.url : '',
                cloudinaryId: upImage.cloudinaryId ? upImage.cloudinaryId : ''
            }
            const apiRes = await userApi.register(newValues)
            console.log(apiRes)

            navigate('../login')
            message.success('Đăng kí thành công')
        } catch (error) {
            message.error('Vui lòng nhập đủ thông tin')
        }
    }

    const uploadImage = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;

        const formData = new FormData()
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                // setProgress(percent);
                var progress = percent
                if (percent === 100) {
                    setTimeout(() => progress, 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        }
        formData.append("file", file)
        formData.append("folder", 'e-commerce/userImage')
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                formData,
                config
            )
            onSuccess("Ok");
            dispatch(saveImgUser({
                url: res.data.secure_url,
                cloudinaryId: res.data.public_id
            }))
            // console.log("server res: ", res);
        } catch (error) {
            console.log("Eroor: ", error);
            onError({ error });
        }
    }

    const handleOnChange = ({file, fileList, event}) => {
        setImage(fileList)
    }

    const onRemove = (file) => {
        const index = image.indexOf(file)
        const newFileList = image.slice()
        newFileList.splice(index, 1)
        dispatch(saveImgUser({
            url: '',
            cloudinaryId: ''
        }))
        return {
            fileList: newFileList
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
                                {
                                    upImage.url
                                        ? <img src={upImage.url} alt="upload-img" /> 
                                        : (
                                            <div className={clsx(styles.img)}>
                                                <p>
                                                    + Thêm ảnh <br />
                                                    <span>(Không bắt buộc)</span>
                                                </p> 
                                            </div>
                                        )
                                }
                                <div className={clsx(styles.center)}>
                                    <Upload
                                        accept="image/*"
                                        customRequest={uploadImage}
                                        onChange={handleOnChange}
                                        listType="text"
                                        onRemove={onRemove}
                                    >
                                        {
                                            image.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        }
                                    </Upload>
                                </div>
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
                                        name="birthday"
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
                                    <button 
                                        onClick={handleComplete}
                                        className={clsx(styles.btn, styles.green)}
                                    >
                                        Hoàn tất
                                    </button>
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