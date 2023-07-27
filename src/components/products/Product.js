import React from 'react';
import { Link } from 'react-router-dom';
import { star, halfStar, emptyStar, compare, cart, wishlist, details } from "../../assets/index";

const Product = (props) => {
  const {productsData} = props;
  return (
        productsData.map((product) => (
          <div className='w-[30%] my-5 rounded border-[1px] border-gray-200 shadow-none hover:shadow-testShadow duration-200' key={product.id}>
            <div className=" bg-gray-100 border-b-[1px] border-gray-200 flex justify-center items-center cursor-pointer relative group" >
              <img className="w-full h-72" src={product.thumbnail} alt="productImage" />
              <ul className='w-full h-32  bg-gray-100 flex flex-col items-end justify-center gap-2 px-2 absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity  duration-700'>
                <li className='productLi'>Compare <img src={compare} alt="compare" className='w-4 h-4' /></li>
                <li className='productLi'>Add to Cart <img src={cart} alt="cart" className='w-4 h-4' /></li>
                <Link to={`${product.title}`} > <li className='productLi w-full'>View Details <img src={details} alt="details" className='w-4 h-4' /></li></Link>
                <li className='productLi'>Add to WishList <img src={wishlist} alt="wishlist" className='w-4 h-4' /></li>
              </ul>
            </div>
            <div className='p-2 '>
            <Link to={`${product.title}`} > 
            <div>
                <p className="text-lg font-medium cursor-pointer">{product.title}</p>
              </div>
              </Link>
              <div className='my-3'>
                <p>{product.description.substring(0, 50)}...</p>
              </div>
              <div className='flex items-center '>
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <img
                    key={starIndex}
                    className='w-4 h-4'
                    src={starIndex <= product.rating ? star : (starIndex - 0.5 <= product.rating ? halfStar : emptyStar)}
                    alt={`star-${starIndex}`}
                  />
                ))}
                <div className='ml-1 text-blue-500'>{product.rating}</div>
              </div>
              <div className='flex items-center mt-1'>
                <p className='font-medium mb-1'>&nbsp;₹&nbsp;</p>
                <span className='text-[26px] font-medium'>{product.price}</span>
                <span>&nbsp;({product.discountPercentage}% Off)</span>
              </div>
              <button className={`text-lg font-medium w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
              >Add to Cart</button>
            </div>
          </div>
        ))
  )
}

export default Product;
