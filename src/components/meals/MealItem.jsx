import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting";
import { CartContext } from "../../store/CartContext";
import Button from "../UI/Button";

function MealItem({ meal }) {
  const { name, price, description, image } = meal;
  const mealImage = "http://localhost:3000/" + image;

  const { addMeal } = useContext(CartContext);

  const addToCartHandler = (identifier, meal) => {
    addMeal(identifier, meal);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={mealImage} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <div className="meal-item-actions">
          <Button onClick={() => addToCartHandler("ADDTOCART_BUTTON", meal)}>
            Add to Cart
          </Button>
        </div>
      </article>
    </li>
  );
}

export default MealItem;
