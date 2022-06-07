import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Radio, Select, DatePicker, Upload, message, Row, Col } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons'
import { saveImgUser } from '../redux/slices/savedSlice'
import axios from 'axios'
import clsx from 'clsx'
import styles from '../assets/styles/Register.module.scss'
import moment from 'moment'
import userApi from '../api/userApi'
import { data } from '../api/tinhthanh'

const { Option } = Select
const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const upImage = useSelector((state) => state.saved.user)

    const [nextStep, setNextStep] = useState(false)
    // const [next, setNext] = useState(true)
    const [image, setImage] = useState([])
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')

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

    // Begin: xử lý select địa chỉ
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
    // End: xử lý select địa chỉ

    // Begin: xử lý upload hình ảnh lên cloudianry và lấy về địa chỉ lưu vào BE
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
    // End: xử lý upload hình ảnh

    const handleComplete = async () => {
        try {
            const values = await form.validateFields()
            const birthday = values.birthday
            const apartment = values.apartment
            const ward = values.ward
            const district = values.district
            const city = values.city
            const newValues = {
                ...values,
                username: values.username.trim().toLowerCase(),
                birthday: birthday ? moment(birthday).format() : birthday,
                address: [apartment, ward, district, city].join(', '),
                avatar: upImage.url ? upImage.url : '',
                cloudinaryId: upImage.cloudinaryId ? upImage.cloudinaryId : ''
            }
            await userApi.register(newValues)
            console.log(newValues)

            navigate('../login')
            message.success('Đăng kí thành công')
        } catch (error) {
            message.error('Vui lòng nhập đủ thông tin')
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
                        size="medium"
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
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được bỏ trống"
                                    },
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(new Error('Mật khẩu nhập lại không khớp'))
                                        }
                                    })
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
                                <Row gutter={8}>
                                    <Col span={16}>
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
                                    </Col>
                                    <Col span={8}>
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
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="birthday"
                                            label="Ngày sinh"
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
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
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="city"
                                            label="Thành phố/Tỉnh"
                                        >
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
                                    <Col span={12}>
                                        <Form.Item
                                            name="district"
                                            label="Quận/Huyện"
                                        >
                                            <Select 
                                                value={district ? district.name : null}
                                                onChange={onChangeDistrict}
                                                placeholder="Chọn quận/huyện"
                                            >
                                                {
                                                    city && city.level2s.map(item => (
                                                        <Option key={item.level2_id} value={item.name}>{item.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="ward"
                                            label="Phường/Xã"
                                        >
                                            <Select 
                                                value={ward ?ward.name : null}
                                                onChange={onChangeWard}
                                                placeholder="Chọn xã/phường"
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
                                        <Form.Item
                                            name="apartment"
                                            label={
                                                <>
                                                    Số nhà, tên đường
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
                                    </Col>
                                </Row>
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