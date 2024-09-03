import { createContext, useReducer } from "react";

const cartContextInitialValue = {
  meals: [],
  addMeal: () => {},
  removeMeal: () => {},
  submitOrder: () => {},
  isToastVisible: false,
  toastHideHandler: () => {},
};

export const CartContext = createContext(cartContextInitialValue);

export function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.payload.meal.id
    );

    const updatedMeals = [...state.meals];

    if (existingMealIndex > -1) {
      const existingMeal = state.meals[existingMealIndex];
      const updatedMeal = {
        ...existingMeal,
        quantity: existingMeal.quantity++,
      };
      updatedMeals[existingMealIndex] = updatedMeal;
    } else {
      updatedMeals.unshift({ quantity: 1, ...action.payload.meal });
    }
    if (action.payload.identifier === "ADDTOCART_BUTTON") {
      return { ...state, meals: updatedMeals, isToastVisible: true };
    } else {
      return { ...state, meals: updatedMeals };
    }
  } else if (action.type === "REMOVE_ITEM") {
    const selectedMealIndex = state.meals.findIndex(
      (meal) => meal.id === action.payload
    );
    const updatedMeals = [...state.meals];
    if (selectedMealIndex > -1) {
      const selectedMeal = state.meals[selectedMealIndex];

      if (selectedMeal.quantity <= 0) {
        const remainedItems = state.meals.filter(
          (meal) => meal.id !== action.payload
        );
        return { ...state, meals: remainedItems };
      } else {
        const selectedMealUpdated = {
          ...selectedMeal,
          quantity: selectedMeal.quantity--,
        };
        updatedMeals[selectedMealIndex] = selectedMealUpdated;
        return { ...state, meals: updatedMeals };
      }
    }
  } else if (action.type === "SUBMIT_ORDER") {
    return {
      meals: [],
    };
  } else if (action.type === "HIDE_TOAST") {
    return {
      ...state,
      isToastVisible: false,
    };
  }
}

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    meals: [],
  });

  function addMeal(identifier, meal) {
    dispatch({
      type: "ADD_ITEM",
      payload: { identifier, meal },
    });
  }

  function removeMeal(mealId) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: mealId,
    });
  }

  function submitOrder(order) {
    dispatch({
      type: "SUBMIT_ORDER",
      payload: order,
    });
  }

  function toastHideHandler() {
    dispatch({
      type: "HIDE_TOAST",
      payload: "",
    });
  }

  const cartContextValue = {
    meals: state.meals,
    addMeal,
    removeMeal,
    submitOrder,
    isToastVisible: state.isToastVisible,
    toastHideHandler,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
