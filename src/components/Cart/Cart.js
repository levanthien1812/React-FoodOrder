import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartContext from '../../store/CartContext'
import { useContext } from 'react'
import CartItem from './CartItem'

const Cart = () => {
    const cartCtx = useContext(CartContext)

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
            item => {
                const removeHandler = (id) => {
                    cartCtx.removeFromCart(id)
                }

                const addHandler = (item) => {
                    cartCtx.addToCart({...item, amount: 1})
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
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>${ cartCtx.totalAmount.toFixed(2) }</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={cartCtx.onHideCart}>Close</button>
            <button className={classes['button']}>Order</button>
        </div>
    </Modal>
}

export default Cart