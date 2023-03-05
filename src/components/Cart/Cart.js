import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/CartContext'
import { useContext, useState } from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'
import { HashLoader } from 'react-spinners'

const Cart = () => {
    const cartCtx = useContext(CartContext)
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [doneSubmit, setDoneSubmit] = useState(false)

    const orderHandler = () => {
        if (cartCtx.items.length === 0) {
            setIsCheckout(false)
        } else {
            setIsCheckout(!isCheckout)
        }
    }

    const checkoutConfirmHandler = async values => {
        setIsSubmitting(true)
        const response = await fetch('https://react-http-34d7e-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json', {
            method: 'POST',
            body: JSON.stringify({
                orderItems: cartCtx.items,
                userData: Object.keys(values).map(key => values[key])
            }),
        })
        if (response.ok) {
            setIsSubmitting(false)
            setDoneSubmit(true)
            cartCtx.clearCart()
        }
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
            item => {
                const removeHandler = (id) => {
                    cartCtx.removeFromCart(id)
                }

                const addHandler = (item) => {
                    cartCtx.addToCart({ ...item, amount: 1 })
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
                {cartCtx.items.length === 0 && <p className={classes['cart-empty-message']}>Your cart is empty</p>}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>${cartCtx.totalAmount.toFixed(2)}</span>
                </div>
                {isCheckout && !isSubmitting &&
                    <Checkout onConfirm={checkoutConfirmHandler} isSubmitting={isSubmitting} />}
                {isSubmitting && <div className={classes.loading}>
                    <HashLoader color="#36d7b7"></HashLoader>
                    <p>Processing...</p>
                </div>}
                {!isCheckout &&
                    <div className={classes.actions}>
                        <button className={classes['button-alt']} onClick={cartCtx.onHideCart}> Close </button>
                        <button className={classes['button']} onClick={orderHandler}>Order</button>
                    </div>
                }
            </>
        }
        {doneSubmit &&
            <>
                <p>Your order was created!</p>
                <button className={classes['close-btn']} onClick={cartCtx.onHideCart}>Close</button>
            </>
        }
    </Modal>
}

export default Cart