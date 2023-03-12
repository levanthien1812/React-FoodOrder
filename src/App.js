import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Notification from "./components/UI/Notification";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./store/ui";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const ui = useSelector(state => state.ui)

  useEffect(() => {
    const updateCart = async () => {
      dispatch(uiActions.setNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }))

      const response = await fetch('https://react-http-34d7e-default-rtdb.asia-southeast1.firebasedatabase.app/Cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart)
        })
      
      if (!response.ok) {
        dispatch(uiActions.setNotification({
          status: 'error',
          title: 'Error',
          message: 'Sending cart data failed!'
        }))
      }

      dispatch(uiActions.setNotification({
        status: 'success',
        title: 'Success!',
        message: 'Send cart data successfully!'
      }))
    }

    updateCart().catch(error => {
      alert(error.message)
    })

  }, [cart, dispatch])

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
