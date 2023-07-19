import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Products = () => {
  const data = useLoaderData();
  const productsData = data.data;
  console.log(productsData);
  return (
    <div>
      <p>productsData</p>
    </div>
  )
}

export default Products;
