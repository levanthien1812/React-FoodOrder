import classes from './Modal.module.css'
import ReactDOM from 'react-dom'
import { cartActions } from '../../store/cart'
import { useDispatch } from 'react-redux'

const Backdrop = props => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
    const dispatch = useDispatch()

    const hideCartHandler = () => {
        dispatch(cartActions.showCart({
            isShown: false
        }))
    }
    
    return <>
        {ReactDOM.createPortal(<Backdrop onClick={ hideCartHandler } />, document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
            document.getElementById('overlays')
        )}
    </>
}

export default Modal