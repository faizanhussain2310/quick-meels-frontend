import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
        // price: existingCartItem.price + action.item.price,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // const cartItems = {
    //   items: updatedItems,
    // };
    // const token = localStorage.getItem("item");
    // const response = await fetch("http://localhost:8080/feed/add-to-cart", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + token,
    //   },
    //   body: JSON.stringify(cartItems),
    // });
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // const cartItems = {
    //   items: updatedItems,
    // };

    // const token = localStorage.getItem("item");
    // const response = await fetch("http://localhost:8080/feed/add-to-cart", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + token,
    //   },
    //   body: JSON.stringify(cartItems),
    // });

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    // const token = localStorage.getItem("item");
    // const cartItems = {
    //   items: [],
    // };
    // const response = await fetch("http://localhost:8080/feed/add-to-cart", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + token,
    //   },
    //   body: JSON.stringify(cartItems),
    // });

    return defaultCartState;
  }

  if (action.type === "REPLACE") {
    return {
      items: action.items,
      totalAmount: action.totalAmount,
    };
  }
  // const token = localStorage.getItem("item");
  // if (token) {
  //   const response = await fetch("http://localhost:8080/feed/add-to-cart", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": "Bearer " + token,
  //     },
  //   });
  //   const { items, totalAmount } = response.json();
  //   return {
  //     items: items,
  //     totalAmount: totalAmount,
  //   };
  // }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  };

  const replaceCartHandler = (items, totalAmount) => {
    dispatchCartState({ type: "REPLACE", items, totalAmount });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    replaceCart: replaceCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
