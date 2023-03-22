import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0,
    changed: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items
            state.totalAmount = action.payload.totalAmount
        },
        addCartItem(state, action) {
            state.totalAmount += action.payload.price * action.payload.amount
            state.changed = true

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
            state.changed = true
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
            state.changed = true
            state = initialState
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer

// test push to feature branch, dont mind