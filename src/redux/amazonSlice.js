import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  userInfo: null,
};

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    // Products Reducers Start Here
    addToCart: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      
    },
    resetCart : (state)=>{
      state.products=[];
    },
    increaseQuantity : (state,action)=>{
      const product = state.products.find((product)=> product.id === action.payload);
      product.quantity++;
    },
    decreaseQuantity : (state,action)=>{
      const product = state.products.find((product)=> product.id === action.payload);
      if(product.quantity===1){
        product.quantity = 1;
      }else{
      product.quantity--;
      }
    },
    // Products Reducers End Here

    // UserInfo Reducers Start Here
    // User Authentication
    setUserInfo : (state,action)=>{
      state.userInfo = action.payload;
    },
    userSignOut : (state)=>{
      state.userInfo = null;
    },


  },
})

// Action creators are generated for each case reducer function
export const { addToCart,deleteProduct,resetCart,decreaseQuantity,increaseQuantity,setUserInfo,userSignOut} = amazonSlice.actions;

export default amazonSlice.reducer;