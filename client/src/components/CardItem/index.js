import clsx from 'clsx'
import styles from './CardItem.module.scss'
import { Link } from 'react-router-dom'

const CardItem = (props) => {
    const { header, number, url } = props

    return (
        <div className={clsx(styles.wrapper)}>
            <p className={clsx(styles.header)}>
                {header}
            </p>
            <p className={clsx(styles.number)}>
                {number}
            </p>
            <Link to={url} className={clsx(styles.url)}>
                <span>Xem chi tiết</span>
                <i className="fas fa-arrow-right"></i>
            </Link>
        </div>
    )
}

export default CardItem