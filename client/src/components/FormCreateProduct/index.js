import { Form, Input, Select, Row, Col, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import clsx from 'clsx'
import styles from './FormCreateProduct.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { data } from './data'
import { useDispatch, useSelector } from 'react-redux'
import { saveImgProduct } from '../../redux/slices/savedSlice'

const { Option } = Select
const FormCreateProduct = ({ form }) => {
    const dispatch = useDispatch()
    const upImage = useSelector((state) => state.saved.product.url)
    const [image, setImage] = useState([])
    const [category, setCategory] = useState(data.subCategoryData[data.categoryData[0]])
    const [subCategory, setSubCategory] = useState(data.subCategoryData[data.categoryData[0]][0])

    const handleCategoryChange = value => {
        setCategory(data.subCategoryData[value])
        form.setFieldsValue({ subCategory: data.subCategoryData[value][0] })
        // setSubCategory(subCategoryData[value][0])
        // console.log(value)
    }
    const onSubCategoryChange = value => {
        setSubCategory(value)
    }

    useEffect(() => {
        setSubCategory(category[0])
    }, [category])

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

    return (
        <div className={clsx(styles.wrapper)}>
            <Form
                form={form}
                name="productCreate"
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                autoComplete="off"
                labelAlign="left"
            >
                <Row gutter={10}>
                    <Col span={6} className={clsx(styles.imgProduct)}>
                        {
                            upImage && <img src={upImage} alt="imgProduct" />
                        }
                        <div className={clsx(styles.upload)}>
                            <Upload
                                accept="image/*"
                                customRequest={uploadImage}
                                onChange={handleOnChange}
                                listType="text"
                            >
                                {
                                    image.length < 1 && <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                }
                            </Upload>
                        </div>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="namePd"
                            label="T??n s???n ph???m"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name product!',
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Danh m???c ch??nh"
                            initialValue={data.categoryData[0]}
                        >
                            <Select onChange={handleCategoryChange}>
                                {data.categoryData.map(list => (
                                    <Option key={list} value={list}>{list}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="subCategory"
                            label="Danh m???c ph???"
                            initialValue={subCategory}
                        >
                            <Select value={subCategory} onChange={onSubCategoryChange}>
                                {category.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Gi?? ti???n"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="size"
                            label="K??ch c???"
                            initialValue={["S", "M", "L"]}
                        >
                            <Select mode="tags">
                                {data.size.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="color"
                            label="M??u s???c"
                            initialValue={"??en"}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="hatMaterial"
                            label="Ch???t li???u n??n"
                            initialValue={data.hatMaterial[1]}
                        >
                            <Select value="Kh??ng">
                                {data.hatMaterial.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="porousMaterial"
                            label="Ch???t li???u x???p"
                            initialValue={data.porousMaterial[1]}
                        >
                            <Select value="Kh??ng">
                                {data.porousMaterial.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="liningMaterial"
                            label="Ch???t li???u l??t"
                            initialValue={data.liningMaterial[0]}
                        >
                            <Select value="Kh??ng">
                                {data.liningMaterial.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="earCover"
                            label="???p tai"
                            initialValue={data.earCover[0]}
                        >
                            <Select value="Kh??ng">
                                {data.earCover.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="sale"
                            label="Gi???m gi??"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="inventory"
                            label="T???n kho"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="weight"
                            label="Tr???ng l?????ng"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="madeIn"
                            label="Xu???t x???"
                            initialValue={data.madeIn[0]}
                        >
                            <Select value="Kh??ng">
                                {data.madeIn.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="brand"
                            label="Th????ng hi???u"
                            initialValue={data.brand[0]}
                        >
                            <Select value="Kh??ng">
                                {data.brand.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="warranty"
                            label="B???o h??nh"
                            initialValue={"Kh??ng"}
                        >
                            <Select value="Kh??ng">
                                {data.warranty.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="timeChangeError"
                            label="?????i tr??? h??ng"
                            initialValue={"Kh??ng"}
                        >
                            <Select value="Kh??ng">
                                {data.timeChangeError.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="transportFee"
                            label="Giao h??ng th?????ng"
                            initialValue={20000}
                        >
                            <Select value="Kh??ng">
                                {data.transportFee.map(item => (
                                    <Option key={item}>{item !== 0 ? item : "Mi???n ph??"}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="transportFeeFast"
                            label="Giao h??nh nhanh"
                            initialValue={30000}
                        >
                            <Select value="Kh??ng">
                                {data.transportFeeFast.map(item => (
                                    <Option key={item}>{item !== 0 ? 30000 : "Kh??ng"}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="washingHat"
                            label="Gi???t n??n"
                            initialValue={"Kh??ng"}
                        >
                            <Select value="Kh??ng">
                                {data.washingHat.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FormCreateProduct

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