import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  userTnfo: [],
}

export const amazonSlice = createSlice({
  name: 'amazon',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes

    addToCart: (state, action) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart } = amazonSlice.actions;

export default amazonSlice.reducer;