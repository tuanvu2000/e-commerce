import { useState, useEffect } from 'react'
import { TableContainer } from '../../components'
import { TitleContent, ButtonCreate } from '../../components/UI'
import useTitle from '../../hooks/useTitle'
import userApi from '../../api/userApi'

const Account = () => {
    useTitle('Account')

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const apiRes = await userApi.getAll()
                const resData = []
                for (let key in apiRes) {
                    resData.push({
                        ...apiRes[key],
                        key: key,
                        stt: parseInt(key) + 1
                    })
                }
                setList(resData)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])
    
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <TitleContent content='Tài khoản khách hàng' />
                <ButtonCreate
                    to='create'
                    action='Thêm'
                    icon='addUser'
                />
            </div>

            <div style={{ margin: 15 }}></div>

            <TableContainer 
                type="account"
                data={list}
                loading={loading}
            />
        </div>
    )
}

export default Account