import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { correct } from '../assets/index';
import { deleteProduct, resetCart, increaseQuantity, decreaseQuantity } from '../redux/amazonSlice';
import { Link, useLoaderData } from 'react-router-dom';


const Cart = () => {
    const data = useLoaderData();
    const productsData = data.data.products;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.amazon.products);
    const [totalQty, setTotalQty] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let allPrice = 0;
        products.forEach((product) => {
            allPrice += product.quantity * product.price;
        });
        setTotalPrice(allPrice);
        let allQty = 0;
        products.forEach((product) => {
            allQty += product.quantity;
        });
        setTotalQty(allQty);
    }, [products]);

    const productImagesDivRef = useRef(null);
    // Calculate the height of the parent div's sibling div and set it dynamically
    // useEffect(() => {
    //     if (productImagesDivRef.current) {
    //         // Get the height of the parent div's sibling div
    //         const parentSiblingHeight = productImagesDivRef.current.parentElement.previousSibling.clientHeight;
    //         const height = parentSiblingHeight * 0.8;
    //         // Set the height of the product images div to the height of the parent's sibling
    //         productImagesDivRef.current.style.height = `${height}px`;
    //     }
    // }, [totalQty]);


    return (
        <div className='flex gap-5 w-full h-full bg-gray-200 '>
            {totalQty > 0
                ? <div className='flex flex-row gap-5'>
                    <div className=' w-[74%] flex flex-col gap-6 my-10 ml-5'> {/* based on the height this div  */}
                        <div className='w-full  bg-white py-7 px-5 '>
                            <h1 className='text-3xl font-semibold mb-1'>Shopping Cart</h1>
                            <hr />
                            <div>
                                {
                                    products.map((product) => (
                                        <div key={product.id} className='w-full border-b-[1px] border-b-gray-200 p-4 flex gap-6'>
                                            <div className='w-1/5'>
                                                <img className='w-48 h-48' src={product.thumbnail} alt="productImage" />
                                            </div>
                                            <div className='w-4/5 flex flex-col gap-2 -mt-2'>
                                                <Link to={`/allProducts/${product.title}`} >
                                                    <h2 className='text-[23px] font-medium'>{product.title}</h2>
                                                </Link>
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
                                                        <p onClick={() => dispatch(decreaseQuantity(product.id))} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>-</p>
                                                        <p className='font-semibold text-[20px]'>&nbsp;{product.quantity}&nbsp;</p>
                                                        <p onClick={() => dispatch(increaseQuantity(product.id))} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>+</p>
                                                    </div>
                                                    <button onClick={() => dispatch(deleteProduct(product.id))} className='text-blue-600 '>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='flex justify-between  '>
                                <button onClick={() => dispatch(resetCart())}
                                    className='w-[200px] border-[1px] bg-gray-100 border-gray-200 py-1 text-sm text-blue-600 rounded-lg
                          text-center p-[4px] mt-1 active:ring-2 active:ring-offset-1 active:ring-blue-600
                         '>Clear Cart</button>
                                <p className='text-[22px] font-medium flex justify-end'>SubTotal ({totalQty} items) :&nbsp;
                                    <div className='flex  '>
                                        <p className='font-medium text-[19px] '>₹&nbsp;</p>
                                        <span className='text-[23px] font-bold'>{totalPrice}.00</span>
                                    </div>
                                </p>
                            </div>
                        </div>
                        <div className='w-full bg-white '>
                            <p className='text-sm p-5'>
                                The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.
                                Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.
                            </p>
                        </div>
                    </div>
                    <div className=' w-[22%] flex flex-col gap-5 my-10 '>
                        <div className='w-full  bg-white py-6 px-5'>
                            <div className='flex flex-row gap-2 '>
                                <img className='w-5 h-5' src={correct} alt="correct" />
                                <span className='text-[13px] text-[#17a34acc]'>Part of your order qualifies for FREE Delivery.
                                    <span className='text-gray-500'>Select this option at checkout.</span>
                                </span>
                            </div>
                            <p className='text-[18px] mt-4 font-medium flex justify-start items-center'>SubTotal ({totalQty} items) :&nbsp;
                                <div className='flex items-center '>
                                    <p className='font-medium text-[16px] '>₹&nbsp;</p>
                                    <span className='text-[18px] font-bold'>{totalPrice}.00</span>
                                </div>
                            </p>
                            <button className={`pt-2 w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
                                Proceed to Buy
                            </button>
                            <div className='border-[1px] border-gray-200 mt-4 flex items-center justify-center py-2 '>EMI Available</div>
                        </div>
                        <div className='w-full  bg-white' >
                            <h1 className='font-semibold mx-3 pt-3 '>Customers who bought other items</h1>
                            <div ref={productImagesDivRef} className='w-full h-[370px] bg-white flex flex-col gap-3 py-3 custom-scrollbar overflow-y-scroll'>
                                {productsData.map((product) => (
                                    <Link to={`/allProducts/${product.title}`}>
                                        <div className='w-11/12 mx-auto '>
                                            <img src={product.thumbnail} alt="productImage" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                : <div className='w-full  bg-white py-6 px-5 my-8 mx-5 flex flex-row justify-between items-start'>
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
            }
        </div>
    )
}

export default Cart;
