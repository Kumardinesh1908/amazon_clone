import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  localCartProducts: [],
  userInfo: null,
  isAuthenticated: false,
  buyNowProduct: null,
  error: null,
  orders: [],
  cancelOrders: [],
};


export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    // localCartProducts Reducers Start Here
    addToCart: (state, action) => {
      const product = state.localCartProducts.find((product) => product.title === action.payload.title);
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.localCartProducts.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.localCartProducts = state.localCartProducts.filter((product) => product.title !== action.payload);
    },
    resetCart: (state) => {
      state.localCartProducts = [];
    },
    increaseQuantity: (state, action) => {
      const product = state.localCartProducts.find((product) => product.title === action.payload);
      product.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const product = state.localCartProducts.find((product) => product.title === action.payload);
      if (product.quantity === 1) {
        product.quantity = 1;
      } else {
        product.quantity--;
      }
    },

    // UserInfo Reducers Start Here
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },

    // User Authentication Reducers
    setUserAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    // Buy Now Product Reducers
    buyNow: (state, action) => {
      state.buyNowProduct = action.payload;
    },
    resetBuyNowProduct: (state) => {
      state.buyNowProduct = null;
    },

    // Error Reducers
    clearError: (state) => {
      state.error = null;
    },

    // Order Reducers
    addToOrders: (state, action) => {
      state.orders = action.payload;
      //  state.orders.push(action.payload);
    },
    cancelOrder: (state, action) => {
      state.cancelOrders = state.cancelOrders.push(action.payload);
      state.orders = state.orders.filter((product) => product.title !== action.payload);
    },
    resetOrders: (state) => {
      state.orders = [];
    }

  },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteProduct, resetCart, decreaseQuantity, increaseQuantity, setUserInfo, userSignOut, setUserAuthentication, buyNow, resetBuyNowProduct, categoryNotFoundError, clearError, addToOrders, cancelOrder, resetOrders } = amazonSlice.actions;
// addToUserCart, resetUserCart

export default amazonSlice.reducer;