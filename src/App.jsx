import Cart from "./components/cart/Cart";
import Header from "./components/UI/Header";
import Meals from "./components/meals/Meals";
import Checkout from "./components/checkout/Checkout";
import Toast from "./components/UI/Toast";

function App() {
  return (
    <>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
      <Toast />
    </>
  );
}

export default App;
