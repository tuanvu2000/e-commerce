import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        text: ''
    },
    reducers: {
        messageText: (state, action) => {
            state.text = action.payload
        }
    }
})

const { reducer, actions } = messageSlice
export const { messageText } = actions
export default reducer