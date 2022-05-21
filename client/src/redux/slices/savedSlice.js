import { createSlice } from '@reduxjs/toolkit'

const savedSlice = createSlice({
    name: 'saved',
    initialState: {
        product: {},
        user: {}
    },
    reducers: {
        saveImgProduct: (state, action) => {
            state.product = action.payload
        },
        saveImgUser: (state, action) => {
            state.user = action.payload
        }
    }
})

const { reducer, actions } = savedSlice
export const { saveImgProduct, saveImgUser } = actions
export default reducer