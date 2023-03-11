import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import { useSelector } from "react-redux";

function App() {
  const isShown = useSelector(state => state.cart.isShown)

  return (
    <>
      <Header></Header>
      {isShown && <Cart/>}
      <main>
        <Meals></Meals>
      </main>
    </>
  );
}

export default App;
