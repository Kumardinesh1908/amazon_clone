import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <div className='w-full  bg-white py-6 px-5 my-8 mx-5 flex flex-row justify-between items-start'>
            <div className='w-[50%] h-[60%]'>
                <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" alt="emptyCart" />
            </div>
            <div className='w-[50%] p-5 pl-8 flex flex-col gap-6'>
                <h1 className='text-[36px] font-semibold'>Your Amazon Cart is empty.</h1>
                <h1 className='text-xl font-semibold '>An empty cart may seem like nothing, but it holds the promise of endless possibilities, waiting to be filled with the treasures of your desires and dreams.</h1>
                <Link to="/allProducts">
                    <div className='ml-[22%] mt-2'>
                        <button className='w-[320px] border-[1px] bg-gray-100 border-gray-200 py-1 text-sm text-blue-600 rounded-lg
                           text-center p-[4px] active:ring-2 active:ring-offset-1 active:ring-blue-600 '>
                            Shop today’s deals</button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default EmptyCart
