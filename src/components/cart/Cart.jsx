import { useContext } from "react";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import { UserProgressContext } from "../../store/UserProgressContext";

function Cart() {
  const cartContext = useContext(CartContext);
  const { openCheckoutModal, closeCartModal, userProgress } =
    useContext(UserProgressContext);

  const subtotal = cartContext.meals.reduce(
    (previousTotal, meal) => previousTotal + meal.price * meal.quantity,
    0
  );

  const cartItemsCount = cartContext.meals.length;

  return (
    <Modal
      open={userProgress === "CART"}
      className="cart"
      onClose={userProgress === "CART" ? closeCartModal : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartContext.meals.map((meal) => {
          return (
            <CartItem
              key={meal.id}
              meal={meal}
              onIncrease={() =>
                cartContext.addMeal("INCREASE_ITEM_QUANTITY", meal)
              }
              onDecrease={() => cartContext.removeMeal(meal.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(subtotal)}</p>
      <p className="modal-actions">
        <Button
          textOnly
          onClick={userProgress === "CART" ? closeCartModal : null}
        >
          Close
        </Button>
        {cartItemsCount > 0 && (
          <Button onClick={openCheckoutModal}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
