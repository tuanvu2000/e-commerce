import React from 'react'
import { Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import styles from './CategoryLink.module.scss'
import { imgList } from './data'

const CategoryLink = () => {
    return (
        <Row style={{ margin: '20px 0'}}>
            {
                imgList.map(item => (
                    <Col span={4} key={item.alt}>
                        <Link to={item.to}>
                            <div className={clsx(styles.wrap)}>
                                <img src={item.src} alt={item.alt} width="100" />
                                <span>{item.alt}</span>
                            </div>
                        </Link>
                    </Col>
                ))
            }
        </Row>
    )
}

export default CategoryLink