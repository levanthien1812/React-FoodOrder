import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'
import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/CartContext"

const HeaderCartButton = () => {
    const cartCtx = useContext(CartContext)

    const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0)

    const [btnIsBump, setBtnIsBump] = useState(false)

    const btnClasses = `${classes.button} ${btnIsBump? classes.bump : ''}`

    const { totalAmount } = cartCtx
    useEffect(() => {
        setBtnIsBump(true)

        const timer = setTimeout(() => {
            setBtnIsBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [totalAmount])

    return <button className={btnClasses} onClick={cartCtx.onShowCart}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton