import { configureStore } from '@reduxjs/toolkit';
import amazonReducer from '../redux/amazonSlice';

export const store = configureStore({
  reducer: {  
    amazon : amazonReducer,
  },
})