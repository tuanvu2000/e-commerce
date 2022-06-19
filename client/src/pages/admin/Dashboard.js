import { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { CardItem, TableOrderNew } from '../../components'
import { TitleContent, Loading, Chart } from '../../components/UI'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from '../../assets/styles/Dashboard.module.scss'
import useTitle from '../../hooks/useTitle'
import orderApi from '../../api/orderApi'

const Dashboard = () => {
    useTitle('Dashboard')
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getApi = async () => {
            const res = await orderApi.sum()
            const resOrder = await orderApi.getNewOrder()
            const newOrder = [] 
            resOrder.map((order, index) => newOrder.push({
                ...order,
                key: index
            }))
            setSummary(res)
            setOrders(newOrder)
            setLoading(false)
        }
        getApi()
    }, [])

    const handleMoney = (number) => {
        const numToString = number.toString();
        const regex = /\B(?=(\d{3})+(?!\d))/g;

        return numToString.replace(regex, '.')
    }

    const cards = [
        <CardItem 
            header="Sản phẩm"
            number={summary ? summary.totalProduct : 0}
            url="product"
        />,
        <CardItem 
            header="Khách hàng"
            number={summary ? summary.totalUser : 0}
            url="account"
        />,
        <CardItem 
            header="Đơn hàng"
            number={summary ? summary.totalOrder : 0}
            url="order"
        />,
        <CardItem 
            header="Tổng doanh thu"
            number={summary ? handleMoney(summary.totalMoney) : 0}
            url="total"
        />
    ]

    // const orders = [
    //     {
    //         key: 1,
    //         maHoaDon: '2504001',
    //         nameUser: 'Hồ Đức Thế Minh',
    //         phoneNumber: '0123456789',
    //         products: [
    //             {
    //                 nameProduct: 'Nón Asia M78 3/4',
    //                 quantityProduct: 2,
    //             }
    //         ],
    //         total: 1253000
    //     },
    //     {
    //         key: 2,
    //         maHoaDon: '2504002',
    //         nameUser: 'Vũ Đình Tuân',
    //         phoneNumber: '0123458149',
    //         products: [
    //             {
    //                 nameProduct: 'Bao tay ROC T2554',
    //                 quantityProduct: 1,
    //             },
    //             {
    //                 nameProduct: 'Nón fullface POC H205',
    //                 quantityProduct: 1,
    //             },
    //             {
    //                 nameProduct: 'Helmet H15',
    //                 quantityProduct: 3,
    //             }
    //         ],
    //         total: 2581000
    //     },
    //     {
    //         key: 3,
    //         maHoaDon: '2504003',
    //         nameUser: 'Nguyễn Văn A',
    //         phoneNumber: '0123456789',
    //         products: [
    //             {
    //                 nameProduct: 'Nón ROC T255',
    //                 quantityProduct: 2,
    //             },
    //             {
    //                 nameProduct: 'Balo PAR A41',
    //                 quantityProduct: 1,
    //             }
    //         ],
    //         total: 1815000
    //     },
    //     {
    //         key: 4,
    //         maHoaDon: '2504003',
    //         nameUser: 'Nguyễn Văn A',
    //         phoneNumber: '0123456789',
    //         products: [
    //             {
    //                 nameProduct: 'Nón ROC T255',
    //                 quantityProduct: 2,
    //             },
    //             {
    //                 nameProduct: 'Balo PAR A41',
    //                 quantityProduct: 1,
    //             }
    //         ],
    //         total: 1815000
    //     },
    //     {
    //         key: 5,
    //         maHoaDon: '2504003',
    //         nameUser: 'Nguyễn Văn A',
    //         phoneNumber: '0123456789',
    //         products: [
    //             {
    //                 nameProduct: 'Nón ROC T255',
    //                 quantityProduct: 2,
    //             },
    //             {
    //                 nameProduct: 'Balo PAR A41',
    //                 quantityProduct: 1,
    //             }
    //         ],
    //         total: 1815000
    //     }
    // ]

    return (
        loading
        ? <Loading />
        :
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
            <Row gutter={24}>
                <Col span={12} style={{ border: '1px solid #9A9A9A', padding: 6, borderRadius: 6, color: '#000'}}>
                    {/* <p style={{ fontWeight: 600, fontSize: 16 }}>Biểu đồ theo doi</p> */}
                    <Chart />
                </Col>
                <Col span={12}>
                    <p style={{ fontWeight: 600, fontSize: 16 }}>Đơn hàng mới</p>
                    <TableOrderNew data={orders} />
                    <Link to='order' className={clsx(styles.link)}>
                        Xem chi tiết
                        <i className="fas fa-angle-double-right"></i>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard