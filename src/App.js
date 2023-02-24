import { useContext, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContext, { CartContextProvider} from "./store/CartContext";

function App() {
  const cartCtx = useContext(CartContext)

  return (
    <>
      <Header></Header>
      {cartCtx.isShown && <Cart/>}
      <main>
        <Meals></Meals>
      </main>
    </>
  );
}

export default App;
