import React from 'react';
import Slider from './slider';
import Category from "./Category";
import ProductsSlider from "./ProductsSlider";
import { ScrollRestoration } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <Slider />
      <Category />
      <ProductsSlider />
      <ScrollRestoration />
    </div>
  )
}

export default Home;
