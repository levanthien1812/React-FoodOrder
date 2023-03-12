import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import { useState } from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'
import { HashLoader } from 'react-spinners'
import { cartActions } from '../../store/cart'
import { uiActions } from '../../store/ui'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [doneSubmit, setDoneSubmit] = useState(false)

    const orderHandler = () => {
        setIsCheckout(cart.items.length !== 0)
    }

    const checkoutConfirmHandler = async values => {
        setIsSubmitting(true)
        const response = await fetch('https://react-http-34d7e-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json', {
            method: 'POST',
            body: JSON.stringify({
                orderItems: cart.items,
                userData: Object.keys(values).map(key => values[key])
            }),
        })
        if (response.ok) {
            setIsSubmitting(false)
            setDoneSubmit(true)
            dispatch(cartActions.clear())
        }
    }

    const hideCart = () => {
        dispatch(uiActions.setCartVisibility(false))
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cart.items.map(
            item => {
                const removeHandler = (id) => {
                    dispatch(cartActions.removeCartItem(id))
                }

                const addHandler = (item) => {
                    dispatch(cartActions.addCartItem({ ...item, amount: 1 }))
                }

                return <CartItem
                    key={item.id}
                    id={item.id}
                    price={item.price}
                    name={item.name}
                    amount={item.amount}
                    onRemove={removeHandler.bind(null, item.id)}
                    onAdd={addHandler.bind(null, item)}
                ></CartItem>
            }
        )}
    </ul>

    return <Modal>
        {!doneSubmit &&
            <>
                {cartItems}
                {cart.items.length === 0 && <p className={classes['cart-empty-message']}>Your cart is empty</p>}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>${cart.totalAmount.toFixed(2)}</span>
                </div>
                {isCheckout && !isSubmitting &&
                    <Checkout onConfirm={checkoutConfirmHandler} isSubmitting={isSubmitting} />}
                {isSubmitting && <div className={classes.loading}>
                    <HashLoader color="#36d7b7"></HashLoader>
                    <p>Processing...</p>
                </div>}
                {!isCheckout &&
                    <div className={classes.actions}>
                        <button className={classes['button-alt']} onClick={hideCart}> Close </button>
                        <button className={classes['button']} onClick={orderHandler}>Order</button>
                    </div>
                }
            </>
        }
        {doneSubmit &&
            <>
                <p>Your order was created!</p>
                <button className={classes['close-btn']} onClick={cart.onHideCart}>Close</button>
            </>
        }
    </Modal>
}

export default Cart