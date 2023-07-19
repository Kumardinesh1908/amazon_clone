import React from 'react';
import Slider from './components/home/slider';
// import Products from './components/home/Products';
import Category from "./components/category/Category";
import ProductsSlider from './components/home/ProductsSlider';

const Home = () => {
  return (
    <div>
      <Slider />
      {/* <Products /> */}
      <Category />
      <ProductsSlider />
    </div>
  )
}

export default Home;
