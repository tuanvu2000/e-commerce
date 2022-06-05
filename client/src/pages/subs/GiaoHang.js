import React, { useEffect } from 'react'
import clsx from 'clsx'
import styles from '../../assets/styles/Policy.module.scss'

const GiaoHang = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header)}>
                <p>CHÍNH SÁCH GIAO HÀNG - THANH TOÁN</p>
            </div>
            <div className={clsx(styles.content)}>
                <h2>GIAO HÀNG:</h2>
                <div>
                    <h3>Giao hàng miễn phí:</h3>
                    <p>PHƯỢT CULTURE hỗ trợ giao hàng miễn phí đến tất cả khách hàng ở mọi nơi trên mọi miền tổ quốc với hóa đơn từ 500,000 vnđ trở lên. Đây là chính sách mang tính đột phá mà PHƯỢT CULTURE đã cam kết nổ lực hoàn thiện và phát triển lấy khách hàng làm trọng tâm trong suốt nhiều năm qua.</p>
                </div>
                <div>
                    <h3>Giao hàng có phí:</h3>
                    <p>Với hóa đơn dưới 500,000 vnđ, PHƯỢT CULTURE sẽ hỗ trợ phí giao hàng và Khách hàng chỉ cần trả thêm 30,000 vnđ/đơn.</p>
                </div>
                <div>
                    <h3>Giao hàng nhanh 3h:</h3>
                    <p>Ngoài ra, PHƯỢT CULTURE còn có dịch vụ giao hàng nhanh trong vòng 2-3 giờ sẽ nhận được hàng với đơn hàng nội thành ở TP. Hồ Chí Minh (trừ Củ Chi, Nhà Bè và Cần Giờ), khách hàng chỉ cần trả thêm 20,000 vnđ sẽ được sử dụng dịch vụ này. Dịch vụ này áp dụng với hóa đơn từ 500,000 vnđ trở lên.</p>
                </div>
                <h2>THANH TOÁN:</h2>
                <div>
                    <h3>Thanh toán COD:</h3>
                    <p>Khách hàng có thể chọn hình thức giao hàng COD tức nhận hàng trước rồi thanh toán. PHƯỢT CULTURE cam kết khách hàng có thể kiểm tra hàng hóa trước khi nhận hàng. Chính vì vậy khách hàng hoàn toàn có thể yên tâm sản phẩm chính xác như mình đặt. PHƯỢT CULTURE cam kết 100% sản phẩm chất lượng, chính hãng, đúng màu, đúng size, đúng như hình trên website, fanpage,.</p>
                    <p>Nếu khách hàng cảm thấy không hài lòng về sản phẩm được nhận hoặc không đúng như quảng cáo. Khách hàng có quyền từ chối nhận hàng và không tốn bất kỳ chi phí nào.</p>
                </div>
                <div>
                    <h3>Thanh toán trước:</h3>
                    <p>Khách hàng có thể thanh toán trước đơn hàng của mình bằng cách chuyển khoản vào số tài khoản dưới đây:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>SỐ TÀI KHOẢN</th>
                                <th>TÊN TÀI KHOẢN</th>
                                <th>NGÂN HÀNG</th>
                                <th>CHI NHÁNH</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>221964977</td>
                                <td>HỒ ĐỨC THẾ MINH</td>
                                <td>VPBANK</td>
                                <td>QUẬN 1</td>
                            </tr>
                            <tr>
                                <td>19036427221011</td>
                                <td>VŨ ĐÌNH TUÂN</td>
                                <td>TECHCOMBANK</td>
                                <td>TP.HCM</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Trường hợp đơn hàng từ 1 triệu đồng trở lên, khách hàng vui lòng thanh toán trước để PHƯỢT CULTURE tiến hành giao hàng.</p>
                    <p>Khách hàng vui lòng kiểm tra sản phẩm khi nhận hàng, sau khi khách hàng đã nhận hàng, PHƯỢT CULTURE có hỗ trợ chính sách đổi mới sản phẩm, PHƯỢT CULTURE không hoàn tiền khi đã mua hàng.</p>

                </div>
            </div>
        </div>
    )
}

export default GiaoHang