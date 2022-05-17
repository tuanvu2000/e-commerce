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
            console.log("server res: ", res);
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
                            label="Tên sản phẩm"
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
                            label="Danh mục chính"
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
                            label="Danh mục phụ"
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
                            label="Giá tiền"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="size"
                            label="Kích cỡ"
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
                            label="Màu sắc"
                            initialValue={"Đen"}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="hatMaterial"
                            label="Chất liệu nón"
                            initialValue={data.hatMaterial[1]}
                        >
                            <Select value="Không">
                                {data.hatMaterial.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="porousMaterial"
                            label="Chất liệu xốp"
                            initialValue={data.porousMaterial[0]}
                        >
                            <Select value="Không">
                                {data.porousMaterial.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="liningMaterial"
                            label="Chất liệu lót"
                            initialValue={data.liningMaterial[0]}
                        >
                            <Select value="Không">
                                {data.liningMaterial.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="earCover"
                            label="Ốp tai"
                            initialValue={data.earCover[0]}
                        >
                            <Select value="Không">
                                {data.earCover.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="sale"
                            label="Giảm giá"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="inventory"
                            label="Tồn kho"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="weight"
                            label="Trọng lượng"
                            initialValue={{ number: 0 }}
                        >
                            <PriceInput />
                        </Form.Item>
                        <Form.Item
                            name="madeIn"
                            label="Xuất xứ"
                            initialValue={data.madeIn[0]}
                        >
                            <Select value="Không">
                                {data.madeIn.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="brand"
                            label="Thương hiệu"
                            initialValue={data.brand[0]}
                        >
                            <Select value="Không">
                                {data.brand.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="warranty"
                            label="Bảo hành"
                            initialValue={"Không"}
                        >
                            <Select value="Không">
                                {data.warranty.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="timeChangeError"
                            label="Đổi trả hàng"
                            initialValue={"Không"}
                        >
                            <Select value="Không">
                                {data.timeChangeError.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="transportFee"
                            label="Giao hàng thường"
                            initialValue={20000}
                        >
                            <Select value="Không">
                                {data.transportFee.map(item => (
                                    <Option key={item}>{item !== 0 ? item : "Miễn phí"}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="transportFeeFast"
                            label="Giao hành nhanh"
                            initialValue={30000}
                        >
                            <Select value="Không">
                                {data.transportFeeFast.map(item => (
                                    <Option key={item}>{item !== 0 ? 30000 : "Không"}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="washingHat"
                            label="Giặt nón"
                            initialValue={"Không"}
                        >
                            <Select value="Không">
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