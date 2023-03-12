import cartSlice from "./cart";
import uiSlice from "./ui"
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        cart: cartSlice,
        ui: uiSlice
    }
})

export default store