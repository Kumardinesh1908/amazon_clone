import React from 'react';
import Slider from '../components/home/slider';
import Category from "../components/category/Category";
import ProductsSlider from "../components/home/ProductsSlider";
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
