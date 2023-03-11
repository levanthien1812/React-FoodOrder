import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShown: false,
    items: [],
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        showCart(state, action) {
            state.isShown = action.payload
        },
        addCartItem(state, action) {
            state.totalAmount += action.payload.price * action.payload.amount

            const existingCartItemIndex = state.items.findIndex(
                item => item.id === action.payload.id
            )
            const existingCartItem = state.items[existingCartItemIndex]

            if (existingCartItem) {
                let updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount
                }
                state.items[existingCartItemIndex] = updatedItem
            } else {
                state.items.push(action.payload)
            }
        },
        removeCartItem(state, action) {
            const existingItemIndex = state.items.findIndex(
                item => item.id === action.payload
            )
            const existingItem = state.items[existingItemIndex]

            if (existingItem.amount > 1) {
                let updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount - 1
                }
                state.items[existingItemIndex] = updatedItem
            } else {
                state.items = state.items.filter(item => item.id !== action.payload)
            }

            state.totalAmount -= existingItem.price
        },
        clear(state) {
            state = initialState
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer