import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import clsx from 'clsx'
import styles from './Loading.module.scss'

const Loading = () => {
    const antIcon = <LoadingOutlined className={clsx(styles.icon)} spin />
    const tip = <p className={clsx(styles.content)}>Đang tải dữ liệu ...</p>
    
    return (
        <Spin 
            indicator={antIcon} 
            tip={tip} 
            size="large" 
            // style={{ display: 'block', marginTop: 100 }}
            className={clsx(styles.loading)}
        />
    )
}

export default Loading