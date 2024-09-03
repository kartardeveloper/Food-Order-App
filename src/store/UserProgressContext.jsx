import { createContext, useReducer } from "react";

const userProgressContextInitialValue = {
  userProgress: "",
  openCartModal: () => {},
  openCheckoutModal: () => {},
  closeCartModal: () => {},
  closeCheckoutModal: () => {},
};

export const UserProgressContext = createContext(
  userProgressContextInitialValue
);

function userProgressReducer(state, action) {
  if (action.type === "OPEN_CART") {
    return { userProgress: "CART" };
  } else if (action.type === "OPEN_CHECKOUT") {
    return { userProgress: "CHECKOUT" };
  } else if (action.type === "CLOSE_CART") {
    return { userProgress: "" };
  } else if (action.type === "CLOSE_CHECKOUT") {
    return { userProgress: "" };
  }
}

export function UserProgressContextProvider({ children }) {
  const [state, dispatch] = useReducer(userProgressReducer, {
    userProgress: "",
  });

  function openCartModal() {
    dispatch({ type: "OPEN_CART" });
  }

  function openCheckoutModal() {
    dispatch({ type: "OPEN_CHECKOUT" });
  }

  function closeCartModal() {
    dispatch({ type: "CLOSE_CART" });
  }

  function closeCheckoutModal() {
    dispatch({ type: "CLOSE_CHECKOUT" });
  }

  const userProgressContextValue = {
    userProgress: state.userProgress,
    openCartModal,
    openCheckoutModal,
    closeCartModal,
    closeCheckoutModal,
  };

  return (
    <UserProgressContext.Provider value={userProgressContextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}
