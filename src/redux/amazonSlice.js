import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  userInfo: null,
  isAuthenticated: false,
  buyNowProduct: null,
  allProducts:[],
  error:null,
};

// Action creator to get all products
export const fetchProducts = createAsyncThunk('amazon/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products?limit=100');
  return response.data;
});

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    // Products Reducers Start Here
    addToCart: (state, action) => {
      const product = state.products.find((product) => product.title === action.payload.title);
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.title !== action.payload);
    },
    resetCart: (state) => {
      state.products = [];
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find((product) => product.title === action.payload);
      product.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find((product) => product.title === action.payload);
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

    // User Authentication
    setUserAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    // Buy Now Product Reducers
    buyNow: (state,action)=>{
      state.buyNowProduct = action.payload;
    }, 
    resetBuyNowProduct: (state) => {
      state.buyNowProduct = null;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;          // Set fetched products to products array if action fulfilled
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message; // Set the error message in the state
      });
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, deleteProduct, resetCart, decreaseQuantity, increaseQuantity, setUserInfo, userSignOut, setUserAuthentication,buyNow,resetBuyNowProduct } = amazonSlice.actions;
// addToUserCart, resetUserCart

export default amazonSlice.reducer;