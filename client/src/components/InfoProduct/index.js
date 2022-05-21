import { Row, Col, Form, Input, Select, Upload, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './InfoProduct.module.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveImgProduct } from '../../redux/slices/savedSlice'
import { data as arrData} from '../FormCreateProduct/data'
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select
const InfoProdcut = ({ data, edit, form }) => {
    const dispatch = useDispatch()
    const upImage = useSelector((state) => state.saved.product.url)
    const [dataProduct, setDataProduct] = useState([]);
    const [image, setImage] = useState([])

    useEffect(() => {
        const arrName = [
            'namePd',
            'category',
            'subCategory',
            'inventory',
            'price',
            'sale',
            'size',
            'weight',
            'color',
            'hatMaterial',
            'porousMaterial',
            'liningMaterial',
            'earCover',
            'madeIn',
            'brand',
            'warranty',
            'timeChangeError',
            'transportFee',
            'transportFeeFast',
            'washingHat',
        ]
        const arrLabel = {
            namePd: "Tên sản phẩm",
            category: "Danh mục chính",
            subCategory: "Loại sản phẩm",
            price: "Giá tiền",
            size: "Kích cỡ",
            color: "Màu sắc",
            hatMaterial: "Vỏ",
            porousMaterial: "Xốp",
            liningMaterial: "Vải lưới",
            earCover: "Ốp tai",
            sale: "Giảm giá",
            inventory: "Tồn kho",
            weight: "Trọng lượng",
            madeIn: "Xuất xứ",
            brand: "Thương hiệu",
            warranty: "Bảo hành",
            timeChangeError: "Đổi trả hàng",
            transportFee: "Giao hàng thường",
            transportFeeFast: "Giao hàng nhanh",
            washingHat: "Giặt nón",
        }
        const inputText = [
            'namePd',
            'color',
        ]
        const inputNumber = [
            'price',
            'sale',
            'inventory',
            'weight'
        ]
        const resData = []
        // const arrResData = []

        for (let key in data ) {
            if (arrName.includes(key)) {
                resData.push({
                    label: arrLabel[key],
                    name: key,
                    text: data[key],
                    order: arrName.indexOf(key),
                    type: inputText.includes(key) 
                        ? 'text'
                        : inputNumber.includes(key)
                        ? 'number'
                        : key === 'subCategory'
                        ? 'select-mul'
                        : key === 'size'
                        ? 'select-tag'
                        : 'select'
                })
            }
        }
        setDataProduct(resData)
    }, [data])

    // begin edit image product
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
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                formData,
                config
            )
            onSuccess("Ok");
            dispatch(saveImgProduct({
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
        dispatch(saveImgProduct({
            url: '',
            cloudinaryId: ''
        }))
        return {
            fileList: newFileList
        }
    }
    // end edit image product
    

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
                                        ? <img src={upImage} alt="imgProduct" />
                                        : <img src={data.image} alt="imgProduct" />
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
                                : <img src={data.image} alt="avatar" />
                            }
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className={clsx(styles.wrapBox)}>
                            <div className={clsx(styles.content)}>
                                <FormList 
                                    styles={styles}
                                    dataList={dataProduct}
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

export default InfoProdcut

const FormList = ({styles, dataList, isEdit }) => {
    const dataNew = dataList.filter(item => item.name !== 'category')
    const category = dataList.length > 0 
        ? dataList.filter(item => item.name === 'category')[0].text
        : null
    
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
            case 'number':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={{ number: data.text }}
                    >
                        <PriceInput />
                    </Form.Item>
                )
            case 'select':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={data.text}
                    >
                        <Select>
                            {
                                arrData[data.name].map(item => (
                                    <Option key={item}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                )
            case 'select-mul':
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={data.text}
                    >
                        <Select>
                            {
                                data && arrData.subCategoryData[category].map(item => (
                                    <Option key={item}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                )
            case 'select-tag': 
                return (
                    <Form.Item
                        name={data.name}
                        initialValue={data.text.split(', ')}
                    >
                        <Select mode='tags'>
                            {
                                arrData[data.name].map(item => (
                                    <Option key={item}>{item}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                ) 
            default :
                return <div className={clsx(styles.box)}>{data.text}</div>
        }
    }

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        
        return numToString.replace(regex, '.') + ' VNĐ'
    }
    const handleCalcPercent = () => {
        if (dataList.length > 0) {
            const price = dataList.filter(item => item.name === 'price')[0].text
            const sale = dataList.filter(item => item.name === 'sale')[0].text
            const remaining = price - ((price * sale) / 100)
            return handleMoney(remaining)
        }
        return null
    }

    const changeData = (item) => {
        switch (item.name) {
            case 'price':
                return handleMoney(item.text)
            case 'sale':
                return item.text === 0
                    ? item.text + '%'
                    : <>{item.text}% <i>({handleCalcPercent()})</i></>
            case 'weight':
                return item.text + ' gram'
            case 'warranty':
                return item.text
            case 'transportFee':
                return item.text === 0 ? 'Miễn phí' : handleMoney(item.text)
            case 'transportFeeFast':
                return item.text === 0 ? 'Không' : handleMoney(item.text) + ' (2h)'
            default:
                return item.text
        }
    }

    return (
        <Row gutter={4}>
            {
                dataNew.map((item, index) => (
                    <React.Fragment key={index}>
                        <Col span={8} order={item.order} className={clsx(styles.label)}>
                            {item.label}:
                        </Col>
                        <Col span={16} order={item.order}>
                            {
                                isEdit 
                                    ? formItem(item)
                                    : <div className={clsx(styles.box)}>{changeData(item)}</div>
                            }
                        </Col>
                    </React.Fragment>
                ))
            }
        </Row>
    )

}

const PriceInput = ({ value = 0, onChange }) => {
    const [number, setNumber] = useState(0)

    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            ...value,
            ...changedValue,
        })
    }
    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || '0', 10)
        if (Number.isNaN(number)) {
            return
        }
        if (!('number' in value)) {
            setNumber(newNumber)
        }
        triggerChange({
            number: newNumber
        })
    }

    return (
        <Input 
            type="text"
            value={value.number || number}
            onChange={onNumberChange}
        />
    ) 
}