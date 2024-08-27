import { configureStore } from '@reduxjs/toolkit'
import eventDetailsReducer from '@/features/eventSlice'

export const store = configureStore({
    reducer: {
        event: eventDetailsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch