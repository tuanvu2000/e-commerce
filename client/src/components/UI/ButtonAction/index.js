import { Button } from 'antd'
import clsx from 'clsx'
import styles from './ButtonAction.module.scss'
import { useDispatch } from 'react-redux'
import { saveImgProduct, saveImgUser } from '../../../redux/slices/savedSlice'

const ButtonAction = ({ 
    action, 
    icon, 
    color, 
    onSave, 
    onDelete, 
    onSuccess, 
    onPending, 
    onDrop, 
    type 
}) => {
    const dispatch = useDispatch()
    const arrIcon = {
        add: <i className="fas fa-user-plus"></i>,
        addPd: <i className="fas fa-plus"></i>,
        return: <i className="fas fa-undo"></i>,
        edit: <i className="fas fa-pen"></i>,
        close: <i className="far fa-times-circle"></i>,
        check: <i className="far fa-check-circle"></i>,
        pending: <i className="fas fa-history"></i>
    }
    
    const handleAction = () => {
        if (action === 'Quay lại') {
            window.history.back()
            dispatch(saveImgProduct({
                url: "",
                cloudinaryId: ""
            }))
        }

        if (action === 'Lưu') {
            onSave()
            if (type === 'user') {
                dispatch(saveImgUser({
                    url: '',
                    cloudinaryId: ''
                }))
            }
            if (type === 'product') {
                dispatch(saveImgProduct({
                    url: '',
                    cloudinaryId: ''
                }))
            }
        }

        if (action === 'Hoàn thành') {
            onSuccess()
        }

        if (action === 'Khôi phục') {
            onPending()
        }

        if (action === 'Hủy đơn hàng') {
            onDrop()
        }

        if (action === 'Xóa sản phẩm' || 
        action === 'Xóa tài khoản' || 
        action === 'Xóa đơn hàng') {
            onDelete()
        }
    }

    return (
        <Button
            type='primary'
            icon={arrIcon[icon]}
            onClick={handleAction}
            className={clsx(styles.btn, {
                [styles.blue] : color === 'blue',
                [styles.red] : color === 'red',
                [styles.redInner] : color === 'red-inner',
                [styles.black] : color === 'black',
                [styles.orange] : color === 'orange',
            })}
        >
            {action}
        </Button>
    )
}

export default ButtonAction