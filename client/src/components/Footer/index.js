import React from 'react'
import { Row, Col } from 'antd'
import { FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Footer.module.scss'
import paymentImg from '../../assets/images/payment.webp'

const Footer = () => {
    return (
        <div className={clsx(styles.wrapper)}>
            <Row style={{ margin: '24px 0'}}>
                <Col span={8} className={clsx(styles.contact)}>
                    <h2>PHƯỢT CULTURE</h2>
                    <h3>Kênh thông tin của chúng tôi</h3>
                    <div className={clsx(styles.social)}>
                        <Link to="."><FacebookFilled /></Link>
                        <Link to="."><InstagramFilled /></Link>
                        <Link to="."><YoutubeFilled /></Link>
                    </div>
                    <h3>Chấp nhận thanh toán</h3>
                    <img src={paymentImg} alt="payment" />
                </Col>
                <Col span={8} className={clsx(styles.list)}>
                    <h3>Thông tin</h3>
                    <span></span>
                    <ul>
                        <li><Link to="policy/ban-hang">Chính sách bán hàng</Link></li>
                        <li><Link to="policy/ban-hang">Giặt nón miễn phí</Link></li>
                        <li><Link to="policy/ban-hang">Chính sách bảo hành, đổi mới</Link></li>
                        <li><Link to="policy/mua-hang">Cách thức mua hàng</Link></li>
                        <li><Link to="policy/giao-hang">Giao hàng - Thanh toán</Link></li>
                        <li><Link to="policy/bao-ve">Chính sách bảo vệ thông tin cá nhân</Link></li>
                    </ul>
                </Col>
                <Col span={8} className={clsx(styles.list)}>
                    <h3>Liên hệ</h3>
                    <span></span>
                    <ul>
                        <li><span>Mua hàng: 1900 3132</span></li>
                        <li><span>Zalo tư vấn: 0797771074</span></li>
                        <li><span>Mua sỉ: 0913 913 913 - nppminhho.com</span></li>
                        <li><span>Phản ánh dịch vụ: 1900 3123</span></li>
                        <li><span>Email: info@phuotculture.vn</span></li>
                        <li><span>Giờ mở cửa: 08:00 - 22:00</span></li>
                    </ul>
                </Col>
            </Row>
            <p className={clsx(styles.copyright)}>
                Copyright 2022 © <b>phuotculture.netlify.app - Design & SEO By Phượt Culture</b>
            </p>
        </div>
    )
}

export default Footer