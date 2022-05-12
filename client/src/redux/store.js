// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import configReducer from './slices/configSlice'
import savedReducer from './slices/savedSlice'

const store = configureStore({
    reducer: {
        config: configReducer,
        saved: savedReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store