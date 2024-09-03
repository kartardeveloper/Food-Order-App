import { currencyFormatter } from "../../util/formatting";

function CartItem({ meal, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {meal.name} - {meal.quantity} * {currencyFormatter.format(meal.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{meal.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
