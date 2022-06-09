import { Col, Row, Form, Input, DatePicker, Radio, Cascader, Upload, Button } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import styles from './InfoAccount.module.scss'
import moment from 'moment'
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons';
import { saveImgUser } from '../../redux/slices/savedSlice'
import { data as citys } from '../../api/tinhthanh'
import noAvatar from '../../assets/images/no-photo.jpg'

// const noAvatar = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
const InfoAccount = ({ data, edit, form, theme }) => {
    const dispatch = useDispatch()
    const upImage = useSelector((state) => state.saved.user.url)
    const [dataUser, setDataUser] = useState([]);
    const [image, setImage] = useState([])

    useEffect(() => {
        const resData = []
        const arrResData = []
        // const arrName = ['fullName', 'birthday', 'gender', 'username', 'phoneNumber', 'address', 'email']
        const arrName = ['username', 'birthday', 'gender', 'fullName', 'email', 'address', 'phoneNumber']
        const arrLabel = {
            fullName: 'Họ và tên',
            birthday: 'Ngày sinh',
            gender: 'Giới tính',
            username: 'Tên tài khoản',
            phoneNumber: 'Số điện thoại',
            address: 'Địa chỉ',
            email: 'Email',
        }
        for (let key in data) {
            if (typeof data[key] === 'object') {
                for (let keyChil in data[key]) {
                    if (keyChil === 'username' || keyChil === 'email') {
                        resData.push({
                            span: keyChil === 'username' ? 8 : 12,
                            label: arrLabel[keyChil],
                            name: keyChil,
                            text: data[key][keyChil],
                            order: arrName.indexOf(keyChil),
                            type: key === 'disabled',
                            
                        })
                        arrResData.push(keyChil)
                    }
                }
            }
            if (arrName.includes(key)) {
                resData.push({
                    span: key === 'address' 
                        ? 16
                        : key === 'fullName'
                        ? 12
                        : 8, 
                    label: arrLabel[key],
                    name: key,
                    text: data[key],
                    order: arrName.indexOf(key),
                    type: key === 'birthday' 
                        ? 'date'
                        : key === 'gender'
                        ? 'radio'
                        : key === 'address'
                        ? 'disabled'
                        : 'text'
                })
                arrResData.push(key)
            }
        }
        const wardType = ['Phường', 'Thị trấn', 'Xã']
        const findWard = wardType.filter(item => data.address.search(item) !== -1)
        const findWardId = data.address.search(findWard)
        const city = data.address.slice(findWardId)
        const apartment = data.address.slice(0, findWardId - 2)
        resData.push({
            span: 16,
            label: 'Thành phố',
            name: 'city',
            text: city,
            order: 8,
            type: 'cascader'
        })
        resData.push({
            span: 8,
            label: 'Số nhà',
            name: 'apartment',
            text: apartment,
            order: 9,
            type: 'text'
        })

        arrName.filter((el) => {
            if (!arrResData.includes(el)) {
                resData.push({
                    span: el === 'address' 
                        ? 16
                        : el === 'fullName' || el === 'email'
                        ? 12
                        : 8, 
                    label: arrLabel[el],
                    name: el,
                    text: '',
                    order: arrName.indexOf(el),
                    type: el === 'birthday' 
                        ? 'date'
                        : el === 'gender'
                        ? 'radio'
                        : el === 'email' || el === 'username' || el === 'address'
                        ? 'disabled'
                        : 'text'
                })
            }
            return true
        })
        setDataUser(resData)
    }, [data])

    // begin edit image user
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
    // end edit image user
    // console.log(data.avatar)
    return (
        <div style={{ marginTop: 30 }}>
            <Form form={form}>
                <Row gutter={30}>
                    <Col span={8}>
                        <div className={clsx(styles.avatar)}>
                            {
                                edit
                                ? <>
                                    {
                                        upImage 
                                        ? <img src={upImage} alt="img user" />
                                        : <img src={data.avatar ? data.avatar : noAvatar} alt="img user" />
                                    }
                                    <div className={clsx(styles.upload)}>
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
                                </>
                                : data.avatar 
                                ? <img src={data.avatar} alt="avatar" />
                                : <img src={noAvatar} alt="aaa" />
                            }
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className={clsx(styles.wrapBox, styles[theme])}>
                            <div className={clsx(styles.header)}>
                                <i className="fas fa-star"></i>
                            </div>
                            <div className={clsx(styles.content)}>
                                <FormList 
                                    styles={styles}
                                    dataList={dataUser}
                                    isEdit={edit}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default InfoAccount

const FormList = ({styles, dataList, isEdit }) => {
    const [options, setOptions] = useState()

    useEffect(() => {
        const formatArr = []
        citys.forEach((item) => {
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

    const formItem = (data) => {
        switch (data.type) {
            case 'text':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={data.text}
                    >
                        <Input />
                    </Form.Item>
                )
            case 'date':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={data.text ? moment(data.text) : ''}
                    >
                        <DatePicker format='DD/MM/YYYY' />
                    </Form.Item>
                )
            case 'radio':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue='male'
                    >
                        <Radio.Group>
                            <Radio value="male">Nam</Radio>
                            <Radio value="female">Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>
                )
            case 'cascader':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={data.text.split(', ').reverse()}
                    >
                        <Cascader options={options} />
                    </Form.Item>
                )
            default :
                return <div className={clsx(styles.box)}>{data.text}</div>
        }

    }

    const changeData = (item) => {
        switch (item.name) {
            case 'birthday':
                return item.text === '' 
                    ? null 
                    : moment(item.text).format('DD/MM/YYYY')
            case 'gender':
                return item.text === 'male' 
                    ? 'Nam' 
                    : 'Nữ'
            default:
                return item.text
        }
    }

    // const onChange = (value) => {
    //     console.log(value);
    // };

    return (
        <Row gutter={20}>
            {
                dataList.map((item, index) => (
                    <Col 
                        span={item.span} 
                        key={index} 
                        order={item.order}
                        className={{ [styles.none]: isEdit ? false : item.name === 'city' || item.name === 'apartment' }}
                    >
                        <div className={clsx(styles.group)}>
                            <span className={clsx(styles.label)}>{item.label}:</span>
                            {
                                isEdit 
                                    ? formItem(item)
                                    : <div className={clsx(styles.box)}>{changeData(item)}</div>
                            }
                        </div>
                    </Col>
                ))
            }
        </Row>
    )

}