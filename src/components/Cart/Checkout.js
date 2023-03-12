import classes from './Checkout.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/ui'

const Checkout = props => {
    const dispatch = useDispatch()

    const hideCart = () => {
        dispatch(uiActions.setCartVisibility(false))
    }

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

        onSubmit={values => {
            console.log(values)
            props.onConfirm(values)
        }}
    >
        {
            formik => <Form className={classes.form}>
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
                    <button type='button' onClick={hideCart}>Cancel</button>
                    <button type='submit'>Confirm</button>
                </div>
            
            </Form>
        }
    </Formik>
}

export default Checkout