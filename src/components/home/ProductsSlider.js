import React from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import './scrollbar.css';
import { useRef } from 'react';

const ProductsSlider = () => {
  const products = useLoaderData();
  const productsData = products.data.products;

  const sliderRef = useRef(null);
  const handleScroll = (direction) => {
    if (direction === 'left') {
      sliderRef.current.scrollLeft -= 208;
    } else if (direction === 'right') {
      sliderRef.current.scrollLeft += 208;
    }
  };
  
  return (
    <div className='bg-white w-[97%] mx-auto mt-1 mb-6 pb-3 relative group'>
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

      <div  ref={sliderRef}
        className=" bg-white w-[97%] mx-auto flex flex-row gap-5 custom-scrollbar overflow-x-scroll overflow-y-hidden">
        {
          productsData.map((product, index) => (
            <div key={index}  className='cursor-pointer'
            >
              <Link to={`/allProducts/${product.title}`} >
              <div className="w-52 h-[200px] bg-gray-100 flex flex-shrink-0 justify-center items-center" >
                <img className="w-48 h-48" src={product.thumbnail} alt="productImg" />
              </div>
              <div className='w-52 h-10 mb-1'>
                <p className='text-sm mt-3 '>{product.title}</p>
              </div>
              </Link>
            </div>
          ))
        }
      </div>
      <div className="prev-btn text-[32px] bg-[rgba(245,245,245,0.3)] font-bold text-gray-700 w-12 h-24 ml-5 absolute bottom-[123px] 
      flex justify-center items-center rounded shadow active:shadow-gray-500 active:shadow-sm active:border-[1px] active:border-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700" onClick={() => handleScroll('left')} >
        <button >
          &lt;
        </button>
      </div>
      <div className="prev-btn text-[32px] bg-[rgba(245,245,245,0.3)] font-bold text-gray-700 w-12 h-24  absolute bottom-[123px] left-[95%]
      flex justify-center items-center rounded shadow active:shadow-gray-500 active:shadow-sm active:border-[1px] active:border-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700" onClick={() => handleScroll('right')} >
        <button >
          &gt;
        </button>
      </div>
    </div>
  )
}

export default ProductsSlider;

