import { cartActions } from "./cart"
import { uiActions } from "./ui"

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.setNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://react-http-34d7e-default-rtdb.asia-southeast1.firebasedatabase.app/Cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalAmount: cart.totalAmount
                })
            })

            if (!response.ok) {
                throw new Error('Send cart data failed!')
            }
        }

        try {
            await sendRequest()

            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Send cart data successfully!'
            }))
        } catch (error) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error',
                message: 'Send cart data failed!'
            }))
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-34d7e-default-rtdb.asia-southeast1.firebasedatabase.app/Cart.json')

            if (!response.ok) {
                throw new Error("Fetch data failed!")
            }

            const data = await response.json()

            return data;
        }

        try {
            const data = await fetchData()
            dispatch(cartActions.replaceCart({
                items: data.items || [],
                totalAmount: data.totalAmount
            }))
        } catch (error) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error',
                message: 'Fetch cart data failed!'
            }))
        }
    }
}