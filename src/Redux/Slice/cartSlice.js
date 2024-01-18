import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity >= 0) {
        if (
          state.cartItems[itemIndex].cartQuantity <
          state.cartItems[itemIndex].quantity
        ) {
          state.cartItems[itemIndex].cartQuantity += 1;
        } else {
          alert("You have already added maximum amount of the product");
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity, discount } = cartItem;
          var itemTotal;
          if (discount) {
            itemTotal = (price - price * (discount / 100)) * cartQuantity;
          } else {
            itemTotal = price * cartQuantity;
          }

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = state.cartItems.length;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      if (state.viewOrderStatus === "success") {
        state.orderData = [];
        state.cartItems = [];
        console.log(state.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("OrderData", JSON.stringify(state.orderData));
      }
    },
    clearCartPayment(state, action) {
      state.orderData = [];
      state.cartItems = [];
      console.log(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("OrderData", JSON.stringify(state.orderData));
    },
  },
});

export const {
  addToCart,
  increaseCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
  clearCartPayment,
} = cartSlice.actions;
export default cartSlice.reducer;
