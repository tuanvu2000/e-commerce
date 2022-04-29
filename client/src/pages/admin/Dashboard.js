import React from 'react'
import { Row, Col } from 'antd'
import { TitleContent, CardItem, TableOrderNew } from '../../components'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../../assets/styles/Dashboard.module.scss'

const Dashboard = () => {

    const cards = [
        <CardItem 
            header="Sản phẩm"
            number={348}
            url="#"
        />,
        <CardItem 
            header="Khách hàng"
            number={71}
            url="account"
        />,
        <CardItem 
            header="Đơn hàng"
            number={259}
            url="#"
        />,
        <CardItem 
            header="Tổng doanh thu"
            number={'19.131.410 đ'}
            url="#"
        />
    ]

    // const link = [
    //     'product',
    //     'account',
    //     'orer',
    //     'total'
    // ]

    const orders = [
        {
            key: 1,
            maHoaDon: '2504001',
            nameUser: 'Hồ Đức Thế Minh',
            phoneNumber: '0123456789',
            products: [
                {
                    nameProduct: 'Nón Asia M78 3/4',
                    quantityProduct: 2,
                }
            ],
            total: 1253000
        },
        {
            key: 2,
            maHoaDon: '2504002',
            nameUser: 'Vũ Đình Tuân',
            phoneNumber: '0123458149',
            products: [
                {
                    nameProduct: 'Bao tay ROC T2554',
                    quantityProduct: 1,
                },
                {
                    nameProduct: 'Nón fullface POC H205',
                    quantityProduct: 1,
                },
                {
                    nameProduct: 'Helmet H15',
                    quantityProduct: 3,
                }
            ],
            total: 2581000
        },
        {
            key: 3,
            maHoaDon: '2504003',
            nameUser: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            products: [
                {
                    nameProduct: 'Nón ROC T255',
                    quantityProduct: 2,
                },
                {
                    nameProduct: 'Balo PAR A41',
                    quantityProduct: 1,
                }
            ],
            total: 1815000
        }
    ]

    return (
        <div>
            <TitleContent content='bảng điều khiển' />
            <div style={{ margin: '30px 0' }}>
                <Row gutter={64}>
                {
                    cards.map((card, index) => (
                        <Col span={6} key={'Card-'+index}>
                            {card}
                        </Col>
                    ))
                }
                </Row>
            </div>
            <p style={{ fontWeight: 600, fontSize: 16 }}>Đơn hàng mới</p>
            <TableOrderNew data={orders} />
            <Link to='#' className={clsx(styles.link)}>
                Xem chi tiết
                <i className="fas fa-angle-double-right"></i>
            </Link>
        </div>
    )
}

export default Dashboard