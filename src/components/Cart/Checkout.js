import classes from './Checkout.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import CartContext from '../../store/CartContext'
import { useContext } from 'react'

const Checkout = props => {
    const cartCtx = useContext(CartContext)

    return <Formik
        initialValues={{
            name: '',
            street: '',
            postalCode: '',
            city: '',
        }}
        validationSchema={Yup.object({
            name: Yup.string().max(20, 'Must be less than or equal to 20 characters').required('Required'),
            street: Yup.string().required('Required'),
            postalCode: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
        })}

        onSubmit={(value, { setSubmiting }) => {
            console.log('Submitting')
            setSubmiting(false)
        }}
    >
        {formik => <Form className={classes.form}>
            <div className={classes['form-control']}>
                <label htmlFor='name'>Your name</label>
                <Field name='name' type='text' />
                <p className={classes['error-message']}><ErrorMessage name='name'/></p>
            </div>
            
            <div className={classes['form-control']}>
                <label htmlFor='street'>Street</label>
                <Field name='street' type='text' />
                <p className={classes['error-message']}><ErrorMessage name='street' /></p>
            </div>
            
            <div className={classes['form-control']}>
                <label htmlFor='postalCode'>Postal code</label>
                <Field name='postalCode' type='text' />
                <p className={classes['error-message']}><ErrorMessage name='postalCode' /></p>
            </div>
            
            <div className={classes['form-control']}>
                <label htmlFor='city'>City</label>
                <Field name='city' type='text' />
                <p className={classes['error-message']}><ErrorMessage name='city' /></p>
            </div>

            <div className={classes.actions}>
                <button type='button' onClick={cartCtx.onHideCart}>Cancel</button>
                <button type='submit' className={!formik.isValid ? classes['is-submitting'] : ''}>Confirm</button>
            </div>
            
        </Form>}
    </Formik>
}

export default Checkout