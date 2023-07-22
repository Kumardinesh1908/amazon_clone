import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import './scrollbar.css';
import { useState,useRef } from 'react';

const ProductsSlider = () => {
  const products = useLoaderData();
  const productsData = products.data;
  console.log(productsData);
  const [translateValue, setTranslateValue] = useState(0);

  const productRef = useRef(null);

  const handlePrev = () => {
    // const productWidth = productRef.current.offsetWidth;
    setTranslateValue((prevValue) => prevValue + 22);
  };

  const handleNext = () => {
    // const productWidth = productRef.current.offsetWidth;
    // console.log(productWidth);
    setTranslateValue((prevValue) => prevValue - 22);
  };

  return (
    <div className='bg-white w-[97%] mx-auto my-6 pb-3 relative'>
      <div className='py-4'>
        <span className='text-[21px] font-bold ml-5'>
          Today’s Deals
        </span>
        <Link to="/allProducts">
          <span className='text-sm text-cyan-700 hover:text-red-400 font-semibold ml-5 cursor-pointer'>
          See all products
        </span>
        </Link>
      </div>

      <div
        className=" content-container ref={productRef} bg-white w-[97%] mx-auto flex flex-row gap-5 custom-scrollbar overflow-x-scroll overflow-y-hidden "
        
      >
        {
          productsData.map((product, index) => (
            <div key={index} ref={productRef} className='cursor-pointer'
            style={{ transform: `translateX(${translateValue}rem)` }}>
              <div className="w-52 h-[200px] bg-gray-100 flex flex-shrink-0 justify-center items-center" >
                <img className="w-48 h-48" src={product.image} alt="productImg" />
              </div>
              <div className='w-52 h-10 mb-1'>
                <p className='text-sm mt-3 '>{product.title}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="prev-btn text-[32px] bg-[rgba(245,245,245,0.3)] font-bold text-gray-700 w-12 h-24 ml-5 absolute bottom-[123px] 
      flex justify-center items-center rounded shadow active:shadow-gray-500 active:shadow-sm active:border-[1px] active:border-cyan-200" onClick={handlePrev}>
        <button >
          &lt;
        </button>
      </div>

      <div className="prev-btn text-[32px] bg-[rgba(245,245,245,0.3)] font-bold text-gray-700 w-12 h-24  absolute bottom-[123px] left-[95%]
      flex justify-center items-center rounded shadow active:shadow-gray-500 active:shadow-sm active:border-[1px] active:border-cyan-200" onClick={handleNext}>
        <button >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default ProductsSlider;

