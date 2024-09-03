import { useContext } from "react";
import logo from "../../assets/logo.jpg";
import Button from "./Button";
import { CartContext } from "../../store/CartContext";
import { UserProgressContext } from "../../store/UserProgressContext";

function Header() {
  const { meals } = useContext(CartContext);
  const { openCartModal } = useContext(UserProgressContext);

  const itemsCount = meals.length;

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="React Food Restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={openCartModal}>
          Cart ({itemsCount})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
