import { useContext } from "react";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "../UI/Button";
import useFetch from "../../hooks/useFetch";
import { UserProgressContext } from "../../store/UserProgressContext";

function Checkout() {
  const cartContext = useContext(CartContext);
  const { closeCheckoutModal, userProgress } = useContext(UserProgressContext);

  const {
    isFetching: isSending,
    fetchedData,
    requestError,
    setData,
    clearData,
  } = useFetch("http://localhost:3000/orders", "POST", "");

  const cartTotal = cartContext.meals.reduce(
    (total, meal) => total + meal.quantity * meal.price,
    0
  );

  const submitOrderHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderData = {
      order: {
        items: cartContext.meals,
        customer: Object.fromEntries(formData.entries()),
      },
    };
    cartContext.submitOrder(orderData);
    setData(orderData);
    event.target.reset();
  };

  const handleFinish = () => {
    closeCheckoutModal();
    clearData();
  };

  let actions = <Button>Submit Order</Button>;

  if (isSending) {
    actions = <Button textOnly>Sending order data...</Button>;
  }

  if (fetchedData && !requestError) {
    return (
      <Modal
        open={userProgress === "CHECKOUT"}
        onClose={userProgress === "CHECKOUT" ? handleFinish : null}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={userProgress === "CHECKOUT" ? handleFinish : null}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgress === "CHECKOUT"}
      className="checkout"
      onClose={userProgress === "CHECKOUT" ? closeCheckoutModal : null}
    >
      <form onSubmit={(event) => submitOrderHandler(event)}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <p className="modal-actions">
          <Button
            type="button"
            textOnly
            onClick={userProgress === "CHECKOUT" ? closeCheckoutModal : null}
          >
            Close
          </Button>
          {actions}
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
