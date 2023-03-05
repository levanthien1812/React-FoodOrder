import React, {useReducer} from "react"

const initialState = {
    isShown: false,
    items: [],
    totalAmount: 0,
}

const CartContext = React.createContext({
    ...initialState,
    onShowCart: () => { },
    onHideCart: () => { },
    addToCart: item => { },
    removeFromCart: id => { },
})

const cartReducer = (state, action) => {
    if (action.type === 'SHOW_CART') {
        return {
            isShown: action.isShown,
            items: state.items,
            totalAmount: state.totalAmount,
        }
    }

    if (action.type === 'ADD_CART_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        
        let updatedItems
        if (existingCartItem) {
            let updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            isShown: state.isShown,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE_CART_ITEM') {
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.id
        )
        const existingItem = state.items[existingItemIndex]

        let updatedItems
        if (existingItem.amount > 1) {
            let updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        } else {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }

        const updatedTotalAmount = state.totalAmount - existingItem.price
        
        return {
            isShown: state.isShown,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR') {
        return initialState
    }
        
    return initialState
}

export const CartContextProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, initialState)

    const showCartHandler = () => {
        dispatchCart({type: 'SHOW_CART', isShown: true})
    }

    const hideCartHandler = () => {
        dispatchCart({type: 'SHOW_CART', isShown: false})
    }

    const addToCartHandler = item => {
        dispatchCart({type: 'ADD_CART_ITEM', item: item})
    }

    const removeFromCartHandler = id => {
        dispatchCart({type: 'REMOVE_CART_ITEM', id: id})
    }

    const clearCartHandler = () => {
        dispatchCart({type: 'CLEAR'})
    }

    return <CartContext.Provider
        value={{
            items: cartState.items,
            isShown: cartState.isShown,
            totalAmount: cartState.totalAmount,
            onShowCart: showCartHandler,
            onHideCart: hideCartHandler,
            addToCart: addToCartHandler,
            removeFromCart: removeFromCartHandler,
            clearCart: clearCartHandler
    }}>
        {props.children}
    </CartContext.Provider>
}

export default CartContext