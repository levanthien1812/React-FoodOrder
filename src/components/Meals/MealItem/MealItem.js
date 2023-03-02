import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/CartContext'
import { useContext } from 'react'

const MealItem = (props) => {
    const cartCtx = useContext(CartContext)

    const {id, name, price} = props
    const addToCartHandler = (amount) => {
        cartCtx.addToCart({ id, name, price, amount })
    }

    return (
        <li className={classes.meal} >
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem