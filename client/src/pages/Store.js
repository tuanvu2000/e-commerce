import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb, Select, Row, Pagination, Empty  } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { Loading } from '../components/UI'
import clsx from 'clsx'
import styles from '../assets/styles/Store.module.scss'
import productApi from '../api/productApi'
import { CardProduct } from '../components'

const Store = () => {
    const location = useLocation()
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [path, setPath] = useState([])
    const [sort, setSort] = useState('max')
    const [params, setParams] = useState({
        page: 1,
        pageSize: 12,
        type: 'category',
        value: 'non-bao-hiem',
        sort: '-price'
    })
    
    useEffect(() => {
        const pathname = window.location.pathname
        const title = pathname.split('/')
        const arrayType = {
            'non-bao-hiem': 'Nón bảo hiểm',
            'phu-kien': 'Phụ kiện',
            'thuong-hieu': 'Thương hiệu',
            'non-34': 'Nón 3/4',
            'non-fullface': 'Nón fullface',
            'mu-xe-dap': 'Mũ xe đạp',
            'non-nua-dau': 'Nón nửa đầu',
            'non-tre-em': 'Nón trẻ em',
            'kinh': 'Kính',
            'gang-tay': 'Găng tay',
            'other': 'Khác',
        }
        const subCategory = [
            'non-34', 
            'non-fullface', 
            'non-nua-dau', 
            'mu-xe-dap', 
            'non-tre-em',
            'kinh', 
            'gang-tay', 
            'other'
        ]
        // const phuKien = ['kinh', 'gang-tay', 'other']
        if (title.length === 2) {
            setPath([
                {
                    title: arrayType[title[1]],
                    to: title[1]
                }
            ])
        }
        if (title.length === 3) {
            setPath([
                {
                    title: arrayType[title[1]],
                    to: title[1],
                },
                {
                    title: arrayType[title[2]],
                    to: title[2],
                    type: subCategory.includes(title[2]) 
                        ? 'subCategory'
                        : 'brand'
                }
            ])
        }
        setSort('max')
    },[location])

    useEffect(() => {
        setLoading(true)
        const changeData = {
            max: '-price',
            min: 'price',
            date: '-createdAt',
            popular: '-quantitySell'
        }
        const getApi = async () => {
            if (path.length === 1) {
                const res = await productApi.getListType({
                    ...params,
                    type: 'category',
                    value: path[0].to,
                    sort: changeData[sort]
                })
                setData(res)
                setLoading(false)
            }
            if (path.length === 2) {
                const res = await productApi.getListType({
                    ...params,
                    type: path[1].type,
                    value: path[1].to,
                    sort: changeData[sort]
                })
                setData(res)
                setLoading(false)
            }
            window.scrollTo(0, 0)
        }
        getApi()
    }, [params, path, sort])


    const handleSort = (value) => {
        setSort(value)
    }

    return (
        loading 
        ? <Loading />
        : <div>
            <div className={clsx(styles.pageHeader)}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    {
                        path.length === 1 &&
                        <Breadcrumb.Item>
                            <span>{path[0].title}</span>
                        </Breadcrumb.Item>
                    }
                    {
                        path.length === 2 &&
                        <>
                            <Breadcrumb.Item>
                                <Link to={`/${path[0].to}`}>
                                    <span>{path[0].title}</span>
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <span>{path[1].title}</span>
                            </Breadcrumb.Item>
                        </>
                    }
                </Breadcrumb>
                <span>{`Hiển thị ${data.pageStart}-${data.pageEnd} của ${data.total} sản phẩm`}</span>
                <Select style={{ width: 260 }} value={sort} onChange={handleSort}>
                    <Select.Option value="popularity">Thứ tự mức độ phổ biến</Select.Option>
                    <Select.Option value="date">Mới nhất</Select.Option>
                    <Select.Option value="min">Thứ tự theo giá: Thấp đến cao</Select.Option>
                    <Select.Option value="max">Thứ tự theo giá: Cao đến thấp</Select.Option>
                </Select>
            </div>
            {
                data.products.length > 0
                ? <div className={clsx(styles.wrapper)}>
                    <Row gutter={[32, 16]}>
                        {
                            data.products.map(product => (
                                <React.Fragment key={product._id}>
                                    <CardProduct product={product} />
                                </React.Fragment>
                            ))
                        }
                    </Row>
                    <div className={clsx(styles.pagination)}>
                        <Pagination
                            total={data.total}
                            // showSizeChanger={true}
                            defaultCurrent={params.page}
                            defaultPageSize={params.pageSize}
                            pageSizeOptions={['12', '20', '32']}
                            onChange={(page, pageSize) => {
                                setParams({
                                    ...params, 
                                    page: page,
                                    pageSize: pageSize
                                })
                            }}
                        />
                    </div>
                </div>
                : <div className={clsx(styles.noneProducts)}>
                    <p>Không có dữ liệu cho loại sản phẩm này !</p>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div> 
            }
        </div>
    )
}

export default Store