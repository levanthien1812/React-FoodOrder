import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'
import { useEffect, useState } from "react"
import { cartActions } from "../../store/cart"
import { useSelector, useDispatch } from "react-redux"

const HeaderCartButton = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)

    const numberOfCartItems = items.reduce((currentNum, item) => {
        return currentNum + item.amount
    }, 0)

    const [btnIsBump, setBtnIsBump] = useState(false)

    const btnClasses = `${classes.button} ${btnIsBump ? classes.bump : ''}`

    useEffect(() => {
        setBtnIsBump(true)

        const timer = setTimeout(() => {
            setBtnIsBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [totalAmount])

    const showCartHandler = () => {
        dispatch(cartActions.showCart({
            isShown: true
        }))
    }

    return <button className={btnClasses} onClick={showCartHandler}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton