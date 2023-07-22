import React from 'react';
import Slider from '../components/home/slider';
import Category from "../components/category/Category";
import ProductsSlider from "../components/home/ProductsSlider";


const Home = () => {
  return (
    <div>
      <Slider />
      <Category />
      <ProductsSlider />
    </div>
  )
}

export default Home;
