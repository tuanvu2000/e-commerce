import { useState, useEffect } from 'react'
import { TitleContent, TableContainer, ButtonCreate } from '../../components'
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

    // const list = [
    //     {
    //         key: 1,
    //         stt: 1,
    //         namePd: "Nón 3/4 KYT Venom Xám Đen Nhám",
    //         typePd: "Nón bảo hiểm 3/4",
    //         brand: "KYT",
    //         price: 1750000,
    //         inventory: 31
    //     },
    //     {
    //         key: 2,
    //         stt: 2,
    //         namePd: "Fullface KYT Falcon Leopard Locatelli",
    //         typePd: "Nón bảo hiểm Fullface",
    //         brand: "PWA",
    //         price: 2210000,
    //         inventory: 158
    //     },
    //     {
    //         key: 3,
    //         stt: 3,
    //         namePd: "Nón Thể thao EMP Vàng Hồng Cam",
    //         typePd: "Nón lưỡi trai",
    //         brand: "EMP",
    //         price: 780000,
    //         inventory: 434
    //     },
    // ]

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='Danh sách sản phẩm' />
                <ButtonCreate
                    to='create'
                    action='Thêm'
                    icon='addProduct'
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