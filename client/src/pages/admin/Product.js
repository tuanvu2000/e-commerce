import { useState, useEffect } from 'react'
import { TableContainer } from '../../components'
import { TitleContent, ButtonCreate } from '../../components/UI'
import useTitle from '../../hooks/useTitle'
import productApi from '../../api/productApi'

const Product = () => {
    useTitle('Product')

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const apiRes = await productApi.getAll()
                const resData = []
                for (let key in apiRes) {
                    resData.push({
                        ...apiRes[key],
                        key: key,
                        stt: parseInt(key) + 1
                    })
                }
                setLoading(false)
                setList(resData)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='Danh sách sản phẩm' />
                <ButtonCreate
                    to='create'
                    action='Thêm'
                    icon='add'
                />
            </div>
            <div style={{ margin: 15 }}></div>

            <TableContainer 
                type="product"
                data={list}
                loading={loading}
            />
        </div>
    )
}

export default Product