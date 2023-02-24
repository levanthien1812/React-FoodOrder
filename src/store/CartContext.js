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
        const itemToDeleteIndex = state.items.findIndex(item => item.id === action.id)
        const itemToDelete = state.items[itemToDeleteIndex]
        let updatedItems
        if (itemToDelete.amount > 1) {
            let updatedItem = { ...itemToDelete, amount: itemToDelete.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[itemToDeleteIndex] = updatedItem
        } else {
            updatedItems = state.items.filter(item => item.id !== action.id)
        }

        const updatedTotalAmount = state.totalAmount - itemToDelete.price
        
        return {
            isShown: state.isShown,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
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

    return <CartContext.Provider
        value={{
            items: cartState.items,
            isShown: cartState.isShown,
            totalAmount: cartState.totalAmount,
            onShowCart: showCartHandler,
            onHideCart: hideCartHandler,
            addToCart: addToCartHandler,
            removeFromCart: removeFromCartHandler,
    }}>
        {props.children}
    </CartContext.Provider>
}

export default CartContext