import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Notification from "./components/UI/Notification";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const ui = useSelector(state => state.ui)

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return  
    }
    if (cart.changed)
      dispatch(sendCartData(cart))

  }, [cart, dispatch])

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  return (
    <>
      {ui.notification && <Notification
        status={ui.notification.status}
        title={ui.notification.title}
        message={ui.notification.message}
      />}
      <Header></Header>
      {ui.cartIsVisible && <Cart />}
      <main>
        <Meals></Meals>
      </main>
    </>
  )
}

export default App;

// Xin chao moi nguoi tui ten la thien