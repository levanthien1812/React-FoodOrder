import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'
import { useContext } from "react"
import CartContext from "../../store/CartContext"

const HeaderCartButton = () => {
    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0)

    return <button className={classes.button} onClick={cartCtx.onShowCart}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton