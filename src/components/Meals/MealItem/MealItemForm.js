import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import {  useRef, useState } from 'react'

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(null)

    const amountInputRef = useRef()

    const submitHandler = event => {
        event.preventDefault()

        const enteredAmount = +(amountInputRef.current.value)

        if (enteredAmount.toString().length === 0 ||
            enteredAmount < 1 ||
            enteredAmount > 5) {
            setAmountIsValid(false)
            return
        }
        setAmountIsValid(true)
        props.onAddToCart(enteredAmount)
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label='Amount' input={{
                ref: amountInputRef,
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {amountIsValid === false && <p>Please enter a valid amount</p>}
        </form>
    )
}

export default MealItemForm