import { Col, Row, Form, Input, DatePicker, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './InfoAccount.module.scss'
import avt from '../../assets/images/avt.jpg'
import moment from 'moment'

const InfoAccount = ({ data, edit, form }) => {
    const [dataUser, setDataUser] = useState([]);

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
            if (arrName.includes(key)) {
                resData.push({
                    // span: key === 'address' || key === 'email' ? 24 : 8,
                    span: key === 'address' 
                        ? 16
                        : key === 'fullName' || key === 'email'
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
                        : 'text'
                })
                arrResData.push(key)
            }
        }
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
                        : 'text'
                })
            }
            return true
        })
        setDataUser(resData)
    }, [data])

    return (
        <div style={{ marginTop: 30 }}>
            <Form form={form}>
                <Row gutter={30}>
                    <Col span={8}>
                        <div className={clsx(styles.avatar)}>
                            <img src={avt} alt="avatar" />
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className={clsx(styles.wrapBox)}>
                            <div className={clsx(styles.header)}>
                                <i className="fas fa-star"></i>
                            </div>
                            <div className={clsx(styles.content)}>
                                <FormItem 
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

const FormItem = ({styles, dataList, isEdit }) => {
    const formItem = (type, data) => {
        switch (type) {
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

    return (
        <Row gutter={20}>
            {
                dataList.map((item, index) => (
                    <Col span={item.span} key={index} order={item.order}>
                        <div className={clsx(styles.group)}>
                            <span className={clsx(styles.label)}>{item.label}:</span>
                            {
                                isEdit 
                                    ? formItem(item.type, item)
                                    : <div className={clsx(styles.box)}>{changeData(item)}</div>
                            }
                        </div>
                    </Col>
                ))
            }
        </Row>
    )

}