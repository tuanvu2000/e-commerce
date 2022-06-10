import React from 'react'
import clsx from 'clsx'
import styles from '../../assets/styles/Policy.module.scss'
import { CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons'

const BanHang = () => {
    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.header, styles.horizontal)}>
                <p>CHÍNH SÁCH BÁN HÀNG 2022</p>
            </div>
            <div className={clsx(styles.quality)}>
                <div>
                    <SafetyCertificateOutlined />
                    <h3>CHÍNH SÁCH TUYỆT VỜI</h3>
                    <p>Tự tin là cửa hàng nón bảo hiểm chuyên nghiệp nhất</p>
                </div>
                <div>
                    <SafetyCertificateOutlined />
                    <h3>KHÁCH HÀNG AN TÂM</h3>
                    <p>Tự hào với 96,5% khách hàng hài lòng ở PHƯỢT CULTURE</p>
                </div>
                <div>
                    <SafetyCertificateOutlined />
                    <h3>PHÁT TRIỂN BỀN VỮNG</h3>
                    <p>Tự động nâng cao và phát triển nhiều giá trị mới cho khách hàng</p>
                </div>
            </div>
            <div className={clsx(styles.policies)}>
                <div>
                    <div className={clsx(styles.text)}>
                        <h2>GIẶT NÓN MIỄN PHÍ</h2>
                        <p>PHƯỢT CULTURE tự tin là cửa hàng nón bảo hiểm đầu tiên và duy nhất tự nghiên cứu và phát triển nên máy móc để giặt nón bảo hiểm tự động miễn phí 6 tháng để phục vụ khách hàng.</p>
                        <p>Nếu khách không mua tại PHƯỢT CULTURE có nhu cầu giặt thì PHƯỢT CULTURE có nhận và chi phí như sau:</p>
                        <ul>
                            <li>Nón nửa đầu: 30,000 đ</li>
                            <li>Nón 3/4: 50,000 đ</li>
                            <li>Nón fullface: 70,000 đ</li>
                        </ul>
                        <p>Thời gian hoàn thành: 24h từ lúc nhận nón.</p>
                    </div>
                    <div className={clsx(styles.icon, styles.iRight)}>
                        <CheckCircleOutlined />
                    </div>
                </div>
                <div>
                    <div className={clsx(styles.text, styles.last)}>
                        <h2>GIAO HÀNG MIỄN PHÍ</h2>
                        <p>PHƯỢT CULTURE hỗ trợ giao hàng miễn phí đến tất cả khách hàng ở mọi nơi trên mọi miền tổ quốc với hóa đơn từ 650,000 vnđ trở lên. Đây là chính sách mang tính đột phá mà PHƯỢT CULTURE đã cam kết nỗ lực hoàn thiện và phát triển lấy khách hàng làm trọng tâm trong suốt nhiều năm qua.</p>
                        <p>Với hóa đơn dưới 650,000 vnđ, PHƯỢT CULTURE sẽ hỗ trợ phí giao hàng và khách hàng chỉ cần trả thêm 20,000 – 30,000 vnđ đối với đơn ở thành phố Hồ Chí Minh, và 50,000 vnđ với đơn hàng ở ngoài thành phố Hồ Chí Minh.</p>
                        <p>Ngoài ra, PHƯỢT CULTURE còn có dịch vụ GIAO HÀNG NHANH trong vòng 3 giờ sẽ nhận được hàng với đơn hàng nội thành ở TP. Hồ Chí Minh (trừ Củ Chi, Nhà Bè và Cần Giờ), khách hàng chỉ cần trả 30,000 vnđ sẽ được sử dụng dịch vụ này. Dịch vụ này áp dụng với hóa đơn từ 650,000 vnđ trở lên. </p>
                    </div>
                    <div className={clsx(styles.icon, styles.iLeft)}>
                        <CheckCircleOutlined />
                    </div>
                </div>
                <div>
                    <div className={clsx(styles.text)}>
                        <h2>BẢO HÀNH 365 NGÀY</h2>
                        <p>Đến với PHƯỢT CULTURE, khách hàng hoàn toàn an tâm với chính sách bảo hành 365 ngày. PHƯỢT CULTURE bảo hành viền nón, khóa nón, và lót nón. Các bộ phận như vỏ nón Nón Trùm không bảo hành theo chính sách của hãng.</p>
                        <p>Lưu ý:</p>
                        <ul>
                            <li>PHƯỢT CULTURE chỉ bảo hành nón bảo hiểm, PHƯỢT CULTURE không bảo hành phụ kiện.</li>
                            <li>PHƯỢT CULTURE không bảo hành đối với sản phẩm thanh lý (sale 30% trở lên)</li>
                        </ul>
                    </div>
                    <div className={clsx(styles.icon, styles.iRight)}>
                        <CheckCircleOutlined />
                    </div>
                </div>
                <div>
                    <div className={clsx(styles.text, styles.last)}>
                        <h2>ĐỔI MỚI 7 NGÀY</h2>
                        <p>PHƯỢT CULTURE đổi mới sản phẩm nón bảo hiểm nếu lỗi kỹ thuật từ nhà máy, nên khách hàng hoàn toàn an tâm sử dụng. Đối với sản phẩm phụ kiện, PHƯỢT CULTURE đổi mới sản phẩm trong 2 ngày. Khách hàng có thể đổi bất kỳ cửa hàng nào gần nhất. Khách hàng vui lòng thanh toán khoản chênh lệch giữa sản phẩm mới đổi với sản phẩm cũ có chênh lệch. PHƯỢT CULTURE hỗ trợ đổi mới sản phẩm sang sản phẩm khách với tổng hóa đơn mới cao hơn hoặc bằng tổng hóa đơn cũ.</p>
                        <ul>
                            <li>Điều kiện đổi mới là sản phẩm còn mới nguyên, chưa sử dụng, nón không trầy xước, hư hại, cũ, còn nguyên thùng, túi rút, seal kính.</li>
                            <li>Khách hàng chịu các chi phí về đổi sản phẩm như phí giao hàng,.. </li>
                        </ul>
                    </div>
                    <div className={clsx(styles.icon, styles.iLeft)}>
                        <CheckCircleOutlined />
                    </div>
                </div>
                <div>
                    <div className={clsx(styles.call)}>
                        <p>
                            MỌI QUAN TÂM VÀ HỎI ĐÁP XIN GỌI 
                            <span> 1900 3123</span>
                        </p>
                        <p>Tổng đài 1900 3123 hoạt động từ 8h – 22h hàng ngày xin được giải đáp các quan tâm mua sắm và hỏi đáp từ khách hàng. Nón Trùm luôn nỗ lực mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BanHang