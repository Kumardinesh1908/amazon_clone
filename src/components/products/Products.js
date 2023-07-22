import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { star, halfStar, emptyStar, compare, cart, wishlist, details } from "../../assets/index";

const Products = () => {
  const data = useLoaderData();
  const productsData = data.data;

  return (
    <div className='w-full relative my-6 flex flex-row bg-white'>
      <div className='w-[18%]  bg-white border-r-2 '>
        <div className='px-5 py-[10px]'>
          <p className='text-[18px] underline font-bold mb-1'>Price</p>
          <p className='font-medium mb-[1px] cursor-pointer'>Under ₹10</p>
          <p className='font-medium mb-[1px] cursor-pointer'>₹10 - ₹100</p>
          <p className='font-medium mb-[1px] cursor-pointer'>₹100 - ₹500</p>
          <p className='font-medium mb-[1px] cursor-pointer'>₹500 - ₹1,000</p>
          <p className='font-medium mb-[1px] cursor-pointer'>Over ₹1,000</p>
        </div>
        <div className='px-5 py-[10px]'>
          <p className='text-[18px] underline font-bold mb-1'>Avg. Customer Review</p>
          <div className='flex items-center font-medium mt-2 mb-1 cursor-pointer'>
            <p>4&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className='flex items-center font-medium mb-1 cursor-pointer'>
            <p>3&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className='flex items-center font-medium mb-1 cursor-pointer'>
            <p>2&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className='flex items-center font-medium mb-1 cursor-pointer'>
            <p>1&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
        </div>
      </div>
      <div className='w-[82%] bg-white'>
        <div className=' flex items-center justify-between mx-7 mt-2 text-[18px] font-bold'>
          <h1>All Products </h1>
          <h1>Total : {productsData.length}</h1>
        </div>
        <div className='w-full flex flex-wrap justify-evenly '>
          {
            productsData.map((product) => (
              <div className='w-[30%] my-5 rounded border-[1px] border-gray-200 shadow-none hover:shadow-testShadow duration-200' key={product.id}>
                <div className=" bg-gray-100 border-b-[1px] border-gray-200 flex justify-center items-center cursor-pointer relative group" >
                  <img className="w-72 h-72" src={product.image} alt="productImage" />
                  <ul className='w-full h-32  bg-gray-100 flex flex-col items-end justify-center gap-2 px-2 absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity  duration-700'>
                    <li className='productLi'>Compare <img src={compare} alt="compare" className='w-4 h-4' /></li>
                    <li className='productLi'>Add to Cart <img src={cart} alt="cart" className='w-4 h-4' /></li>
                    <li className='productLi'>View Details <img src={details} alt="details" className='w-4 h-4' /></li>
                    <li className='productLi'>Add to WishList <img src={wishlist} alt="wishlist" className='w-4 h-4' /></li>
                  </ul>
                </div>
                <div className='p-2 '>
                  <div>
                    <p className="text-lg font-medium cursor-pointer">{product.title.substring(0, 28)}...</p>
                  </div>
                  <div className='my-3'>
                    <p>{product.description.substring(0, 97)}...</p>
                  </div>
                  <div className='flex items-center '>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <img
                        key={starIndex}
                        className='w-4 h-4'
                        src={starIndex <= product.rating.rate ? star : (starIndex - 0.5 <= product.rating.rate ? halfStar : emptyStar)}
                        alt={`star-${starIndex}`}
                      />
                    ))}
                    <div className='ml-1 text-blue-500'>{product.rating.rate}</div>
                  </div>
                  <div className='flex items-center mt-1'>
                    <p className='font-medium mb-1'>&nbsp;₹&nbsp;</p>
                    <span className='text-[26px] font-medium'>{product.price}</span>
                  </div>
                  <button className={`text-lg font-medium w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                  >Add to Cart</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Products;
