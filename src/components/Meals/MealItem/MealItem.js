import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/cart'

const MealItem = (props) => {
    const dispatch = useDispatch()

    const {id, name, price} = props
    const addToCartHandler = (amount) => {
        dispatch(cartActions.addCartItem({ id, name, price, amount }))
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