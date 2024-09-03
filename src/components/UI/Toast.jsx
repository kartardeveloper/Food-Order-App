import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../../store/CartContext";

let toastClasses;

function Toast() {
  const cartContext = useContext(CartContext);

  if (cartContext.isToastVisible) {
    toastClasses = " toast-visible";
  } else {
    toastClasses = "";
  }

  useEffect(() => {
    const toastTimer = setTimeout(() => {
      cartContext.toastHideHandler();
    }, 2000);

    return () => {
      clearTimeout(toastTimer);
    };
  }, [cartContext.isToastVisible]);

  let meal = cartContext.meals[0];

  return (
    <div className={`toast ${toastClasses}`}>
      <p>
        <strong>{meal?.name}</strong> added to cart.
      </p>
    </div>
  );
}

export default Toast;
