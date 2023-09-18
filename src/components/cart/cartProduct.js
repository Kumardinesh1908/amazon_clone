import React from 'react'

const CartProduct = ({ product, handleCategoryClick, handleDecreaseQuantity, handleIncreaseQuantity, handleDeleteProduct }) => {
    return (
        <div className='w-full border-b-[1px] border-b-gray-200 p-4 flex gap-6' >
            <div className='w-1/5 cursor-pointer' onClick={() => handleCategoryClick(product.category, product.title)}>
                <img className='w-48 h-48' src={product.thumbnail} alt="productImage" />
            </div>
            <div className='w-4/5 flex flex-col gap-2 -mt-2'>
                <h2 className='text-[23px] font-medium cursor-pointer' onClick={() => handleCategoryClick(product.category, product.title)}>{product.title}</h2>
                <p className=''>{product.description}</p>
                <div className='flex items-center '>
                    <p className='font-medium text-[20px] '>₹&nbsp;</p>
                    <span className='text-[26px] font-medium'>{product.price}.00</span>
                </div>
                <p className='text-green-700'>In stock</p>
                <div className='flex flex-row gap-5'>
                    <p className='capitalize'>Sold by : {product.brand}</p>
                    <p className='border-l-[1px] pl-5 border-gray-200 capitalize'>Category : {product.category}</p>
                </div>
                <div className='flex flex-row justify-between gap-5 mt-2'>
                    <div className='flex items-center justify-center  '>
                        Qty :&nbsp;&nbsp;
                        <p onClick={handleDecreaseQuantity} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>-</p>
                        <p className='font-semibold text-[20px]'>&nbsp;{product.quantity}&nbsp;</p>
                        <p onClick={handleIncreaseQuantity} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>+</p>
                    </div>
                    <button onClick={handleDeleteProduct} className='text-blue-600 '>Delete</button>
                </div>
            </div>
        </div>
    )
}


export default CartProduct