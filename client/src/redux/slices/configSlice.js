import { createSlice } from '@reduxjs/toolkit'

const configSlice = createSlice({
    name: 'config',
    initialState: {
        loading: false,
        open: false
    },
    reducers: {
        openSidebar: (state, action) => {
            state.open = action.payload
        }
    }
})

const { reducer, actions } = configSlice
export const { openSidebar } = actions
export default reducer