import React from 'react'
import { Carousel } from 'antd'
import banner1 from '../../../assets/images/banner/banner1.jpg'
import banner2 from '../../../assets/images/banner/banner2.jpg'
import clsx from 'clsx'
import styles from './Silder.module.scss'

const Slider = () => {
    return (
        <div>
            <Carousel autoplay>
                <div className={clsx(styles.slide)}>
                    <img src={banner1} alt="banner1" />
                </div>
                <div className={clsx(styles.slide)}>
                    <img src={banner2} alt="banner2" />
                </div>
            </Carousel>
        </div>
    )
}

export default Slider