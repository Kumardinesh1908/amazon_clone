import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { correct } from '../assets/index';
import { deleteProduct, resetCart, increaseQuantity, decreaseQuantity } from '../redux/amazonSlice';
import { Link, useLoaderData, ScrollRestoration } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const data = useLoaderData();
    const productsData = data.data.products;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.amazon.products);

    const [totalQty, setTotalQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const cartRef = useRef(null);
    const [productDivHeight, setProductDivHeight] = useState(0);
    useEffect(() => {
        let allPrice = 0;
        let allQty = 0;
        products.forEach((product) => {
            allPrice += product.quantity * product.price;
            allQty += product.quantity;
        });
        setTotalPrice(allPrice);
        setTotalQty(allQty);
        // Function to update cart height
        const updateCartHeight = () => {
            if (cartRef.current) {
                const cartHeight = cartRef.current.clientHeight;
                const setHeight = cartHeight * 0.85;
                setProductDivHeight(setHeight);
            }
        };
        // Call the function when cart items change
        updateCartHeight();
    }, [products]);

    const navigate = useNavigate();
    const handleCategoryClick = (category,title) => {
        navigate(`/${category}/${title}`); // Navigate to the products page with the selected category as a URL parameter
    };

    return (
        <div className='flex flex-row gap-5'>
            <ScrollRestoration />
            <div className=' w-[74%] flex flex-col gap-6 my-10 ml-5' ref={cartRef}> {/* based on the height this div  */}
                <div className='w-full  bg-white py-7 px-5 '>
                    <h1 className='text-3xl font-semibold mb-1'>Shopping Cart</h1>
                    <hr />
                    <div>
                        {
                            products.map((product) => (
                                <div key={product.id} className='w-full border-b-[1px] border-b-gray-200 p-4 flex gap-6'>
                                    <div className='w-1/5 cursor-pointer' onClick={() => handleCategoryClick(product.category,product.title)}>
                                        <img className='w-48 h-48' src={product.thumbnail} alt="productImage" />
                                    </div>
                                    <div className='w-4/5 flex flex-col gap-2 -mt-2'>
                                            <h2 className='text-[23px] font-medium cursor-pointer' onClick={() => handleCategoryClick(product.category,product.title)}>{product.title}</h2>
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
                        <div className='text-[22px] font-medium flex justify-end'>SubTotal ({totalQty} items) :&nbsp;
                            <div className='flex  '>
                                <p className='font-medium text-[19px] '>₹&nbsp;</p>
                                <span className='text-[23px] font-bold'>{totalPrice}.00</span>
                            </div>
                        </div>
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
                    <div className='text-[18px] mt-4 font-medium flex justify-start items-center'>SubTotal ({totalQty} items) :&nbsp;
                        <div className='flex items-center '>
                            <p className='font-medium text-[16px] '>₹&nbsp;</p>
                            <span className='text-[18px] font-bold'>{totalPrice}.00</span>
                        </div>
                    </div>
                    <button className={`pt-2 w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
                        Proceed to Buy
                    </button>
                    <div className='border-[1px] border-gray-200 mt-4 flex items-center justify-center py-2 '>EMI Available</div>
                </div>
                <div className='w-full  bg-white' >
                    <h1 className='font-semibold mx-3 pt-3 '>Customers who bought other items</h1>
                    <div style={{ height: productDivHeight }} className='bg-white flex flex-col gap-4 py-3 ml-3 custom-scrollbar overflow-y-scroll '>
                        {productsData.map((product) => (
                            <div className='flex flex-row gap-2' key={product.id} >
                                <Link to={`/allProducts/${product.title}`}>
                                    <img className='w-20 h-20' src={product.thumbnail} alt="productImage" />
                                </Link>
                                <div className=''>
                                    <Link to={`/allProducts/${product.title}`}>
                                        <p className='text-blue-600 text-xl font-semibold'>{product.title.substring(0, 15)}</p>
                                    </Link>
                                    <p className='text-red-600 text-[20px] font-semibold mt-2'>₹ {product.price}.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
