import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

const initialState = {
    id: 0,
    name: '',
    date: '',
    members: [],
    refresh: false,
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        details: (state, action) => {
            state.id = action.payload.id,
            state.name = action.payload.name,
            state.date = action.payload.date,
            state.members = action.payload.members
        },
        refresh: (state, action) => {
            state.refresh = action.payload
            console.log('action.payload', action.payload)
        }
    }
})

export const { details, refresh } = eventSlice.actions
export const selectEventDetails = (state: RootState) => state.event
export default eventSlice.reducer