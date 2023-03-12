import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisible: false, notification: null },
    reducers: {
        setCartVisibility(state, action) {
            state.cartIsVisible = action.payload
        },
        setNotification(state, action) {
            const {status, title, message} = action.payload
            state.notification = {status, title, message}
        } 
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer