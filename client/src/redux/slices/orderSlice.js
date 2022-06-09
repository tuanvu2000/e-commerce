import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: [],
        total: 0
    },
    reducers: {
        addOrder: (state, action) => {
            const currentProduct = state.list.find(product => 
                product.id === action.payload.id &&
                product.size === action.payload.size
            )
            if (currentProduct) {
                currentProduct.quantity += action.payload.quantity
            } else {
                state.list.push(action.payload)
            }
            if (state.list.length > 0) {
                state.total = state.list.reduce((total, item) => 
                    total + (item.price * item.quantity)
                , 0)
            }
        },
        removeOrder: (state, action) => {
            state.list.splice(action.payload, 1)
            if (state.list.length >= 0) {
                state.total = state.list.reduce((total, item) => 
                    total + (item.price * item.quantity)
                , 0)
            }
        },
        // decreaseOrder: (state, action) => {
        //     const index = state.list.find(item => item.id === action.payload)

        // }
    }
})

const { reducer, actions } = orderSlice
export const { addOrder, removeOrder } = actions
export default reducer