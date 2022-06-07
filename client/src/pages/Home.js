import React from 'react'
import { CategoryLink, ListProduct } from '../components/'
import { Slider } from '../components/UI'
import clsx from 'clsx'
import styles from '../assets/styles/Home.module.scss'

const list = [
    {
        img: require('../assets/images/banner/banner3.png'),
        alt: 'banner 3',
        title: 'Bán chạy',
        data: {
            category: '',
            subCategory: '',
            to: ''
        }
    },
    {
        img: require('../assets/images/banner/banner4.jpg'),
        alt: 'banner 4',
        title: 'Nón 3/4',
        data: {
            category: 'Nón',
            subCategory: 'Nón bảo hiểm 3/4',
            to: 'non-bao-hiem/non-34'
        }
    },
    {
        img: require('../assets/images/banner/banner5.jpg'),
        alt: 'banner 5',
        title: 'Nón fullface',
        data: {
            category: 'Nón',
            subCategory: 'Nón bảo hiểm full-face',
            to: 'non-bao-hiem/non-fullface'
        }
    },
    {
        img: require('../assets/images/banner/banner6.jpg'),
        alt: 'banner 6',
        title: 'Nón nửa đầu',
        data: {
            category: 'Nón',
            subCategory: 'Nón nửa đầu',
            to: 'non-bao-hiem/non-nua-dau'
        }
    },
    {
        img: require('../assets/images/banner/banner7.jpg'),
        alt: 'banner 7',
        title: 'Mũ xe đạp',
        data: {
            category: 'Nón',
            subCategory: 'Mũ xe đạp',
            to: 'non-bao-hiem/mu-xe-dap'
        }
    },
    {
        img: require('../assets/images/banner/banner8.jpg'),
        alt: 'banner 8',
        title: 'Phụ kiện',
        data: {
            category: 'Phụ kiện',
            subCategory: '',
            to: 'phu-kien'
        }
    },
]

const Home = () => {
    return (
        <div>
            <Slider />
            <div className={clsx(styles.wrap)}>
                <CategoryLink />
                <div>
                    {
                        list.map((item, index) => (
                            <div key={index+item.alt}>
                                <img src={item.img} alt={item.alt} />
                                <ListProduct 
                                    category={item.data.category} 
                                    subCategory={item.data.subCategory}
                                    title={item.title}
                                    to={item.data.to}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home