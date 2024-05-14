import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import productReducer from './slices/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
})