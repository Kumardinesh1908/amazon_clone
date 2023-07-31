import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  userTnfo: [],
}

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
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
    handleQuantity : (state,action)=>{
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,deleteProduct,resetCart,decreaseQuantity,increaseQuantity} = amazonSlice.actions;

export default amazonSlice.reducer;