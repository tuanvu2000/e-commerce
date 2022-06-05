import React, { useEffect } from 'react'
import clsx from 'clsx'
import styles from '../../assets/styles/Policy.module.scss'

const MuaHang = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <p>CÁCH THỨC MUA HÀNG</p>
            </div>
            <div className={clsx(styles.content)}>
                <p>Khách hàng có thể đặt hàng bằng những cách sau đây:</p>
                <div>
                    <h3>Cách 1: Đặt trên website</h3>
                    <p>Sau khi chọn lựa sản phẩm ưng ý, khách hàng có thể bấm vào “mua hàng“, khách hàng có thể mua nhiều sản phẩm trong giỏ hàng của mình, sau đó vào nút “thanh toán”  để cập nhật thông tin nhật hàng. Quý khách vui lòng cập nhật đầy đủ và chính xác thông tin nhận hàng để tranh trường hợp sai sót đáng tiếc.</p>
                </div>
                <div>
                    <h3>Cách 2: Đặt trên fanpage</h3>
                    <p>Khách hàng có thể vào Fanpage PHƯỢT CULTURE và inbox PHƯỢT CULTURE thông tin sản phẩm bao gồm “Mã – Màu – Size” cùng với thông tin nhận hàng là “Tên – SĐT – Địa chi nhận hàng”.</p>
                    <p>Sau khi đặt hàng, tổng đài viên sẽ gọi lại cho khách hàng để chốt đơn trước khi tiến hành đóng và giao hàng.</p>
                </div>
                <div>
                    <h3>Cách 3: Gọi tổng đài 1900 3123</h3>
                    <p>Khách hàng có thể gọi về 1900 3123 và đặt hàng một cách nhanh chóng nhất, tổng đài viên sẽ ghi nhận và tiến hành giao hàng ngay cho quý khách.</p>
                    <p>Quý khách có thể tìm hiểu thêm về “Giao hàng – Thanh toán” tại đây</p>
                </div>
            </div>
        </div>
    )
}

export default MuaHang