import classes from './Modal.module.css'
import ReactDOM from 'react-dom'
import CartContext from '../../store/CartContext'
import { useContext } from 'react'

const Backdrop = props => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
    const cartCtx = useContext(CartContext)
    return <>
        {ReactDOM.createPortal(<Backdrop onClick={ cartCtx.onHideCart } />, document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
            document.getElementById('overlays')
        )}
    </>
}

export default Modal