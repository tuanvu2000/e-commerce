// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import configReducer from './slices/configSlice'

const store = configureStore({
    reducer: {
        config: configReducer
    }
})

export default store