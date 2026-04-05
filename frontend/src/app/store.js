import { configureStore } from '@reduxjs/toolkit'
import drugReducer from '../features/drug/drugSlice'

export const store = configureStore({
  reducer: {
    drug: drugReducer
  },
})