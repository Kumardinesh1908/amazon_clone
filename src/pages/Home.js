import React from 'react';
import Slider from '../components/home/slider';
import Category from "../components/category/Category";
import ProductsSlider from "../components/home/ProductsSlider";
// import ScrollToTop from '../ScrollToTop';
import { ScrollRestoration } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      {/* <ScrollToTop /> */}
      <Slider />
      <Category />
      <ProductsSlider />
      <ScrollRestoration />
    </div>
  )
}

export default Home;
