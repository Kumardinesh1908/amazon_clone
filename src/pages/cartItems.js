import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { correct } from '../assets/index';
import { deleteProduct, resetCart, increaseQuantity, decreaseQuantity } from '../redux/amazonSlice';
import { Link, useLoaderData, ScrollRestoration } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useCart } from '../context/userCartContext';

const CartItems = () => {
    const data = useLoaderData();
    const productsData = data.data.products;

    const dispatch = useDispatch();
    const products = useSelector((state) => state.amazon.products);
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);


    const { userCart, updateUserCart, cartTotalQty, cartTotalPrice } = useCart();


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
                const setHeight = cartHeight + 8;
                setProductDivHeight(setHeight);
            }
        };
        // Call the function when cart items change
        updateCartHeight();
    }, [products, userCart]);

    const navigate = useNavigate();
    const handleCategoryClick = (category, title) => {
        navigate(`/${category}/${title}`); // Navigate to the products page with the selected category as a URL parameter
    };

    // Function to decrease the quantity of a product in the user's Firebase cart
    const handleDecreaseQuantity = async (productTitle) => {
        // Fetch the user's cart from Firebase
        const userCartRef = doc(collection(db, 'users', userInfo.email, 'cart'), userInfo.id);
        const docSnapshot = await getDoc(userCartRef);
        if (docSnapshot.exists()) {
            const userCartData = docSnapshot.data().cart;
            // Find the index of the product in the cart
            const productIndex = userCartData.findIndex(product => product.title === productTitle);
            if (productIndex !== -1) {
                // Ensure that the quantity doesn't go below 1
                if (userCartData[productIndex].quantity > 1) {
                    userCartData[productIndex].quantity -= 1;
                    // Update the cart data in Firebase
                    await setDoc(userCartRef, { cart: userCartData }, { merge: true });
                    // Update the userCart using the prop function to reflect the change immediately
                    const updatedUserCart = userCart.map(product =>
                        product.title === productTitle
                            ? { ...product, quantity: product.quantity - 1 }
                            : product
                    );
                    updateUserCart(updatedUserCart);
                }
            }
        }
    };

    // Function to increase the quantity of a product in the user's Firebase cart
    const handleIncreaseQuantity = async (productTitle) => {
        // Fetch the user's cart from Firebase
        const userCartRef = doc(collection(db, 'users', userInfo.email, 'cart'), userInfo.id);
        const docSnapshot = await getDoc(userCartRef);
        if (docSnapshot.exists()) {
            const userCartData = docSnapshot.data().cart;
            // Find the index of the product in the cart
            const productIndex = userCartData.findIndex(product => product.title === productTitle);
            if (productIndex !== -1) {
                // Increase the quantity of the product
                userCartData[productIndex].quantity += 1;
                // Update the cart data in Firebase
                await setDoc(userCartRef, { cart: userCartData }, { merge: true });
                // Update the userCart using the prop function to reflect the change immediately
                const updatedUserCart = userCart.map(product =>
                    product.title === productTitle
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
                updateUserCart(updatedUserCart);
            }
        }
    };

    // Function to delete a product from the user's Firebase cart
    const handleDeleteProduct = async (productTitle) => {
        // Reference to the user's cart document in Firestore
        const userCartRef = doc(collection(db, 'users', userInfo.email, 'cart'), userInfo.id);
        // Get a snapshot of the user's cart document
        const docSnapshot = await getDoc(userCartRef);
        // Check if the cart document exists
        if (docSnapshot.exists()) {
            // Get the cart data from the snapshot
            const userCartData = docSnapshot.data().cart;
            // Filter out the product with the specified title from the cart
            const updatedCart = userCartData.filter(product => product.title !== productTitle);
            // Update the cart data in Firestore with the filtered cart
            await updateDoc(userCartRef, { cart: updatedCart });
            // Update the userCart state to reflect the change immediately on the UI
            const updatedUserCart = userCart.filter(product => product.title !== productTitle);
            updateUserCart(updatedUserCart);
        }
    };

    // Function to clear the cartItem
    const handleClearCart = async () => {
        if (authenticated) {
            // If user is signed in and clear the Firebase cart 
            try {
                const userCartRef = doc(collection(db, 'users', userInfo.email, 'cart'), userInfo.id);
                await setDoc(userCartRef, { cart: [] }, { merge: true }); // Clear the cart by setting an empty array
                updateUserCart([]); // Clear the userCart state immediately
            } catch (error) {
                console.error("Error clearing Firebase cart:", error);
            }
        } else {
            // If user is not signed in, only clear the Redux cart
            dispatch(resetCart());
        }
    };

    return (
        <div className='flex flex-row gap-5'>
            <ScrollRestoration />
            <div className=' w-[74%] flex flex-col gap-6 my-10 ml-5' >
                <div className='w-full  bg-white py-7 px-5' >
                    <h1 className='text-3xl font-semibold mb-1'>Shopping Cart</h1>
                    <hr />
                    {userCart.length > 0
                        ?
                        <div ref={cartRef}>
                            {
                                userCart.map((product, index) => (
                                    <div key={index} className='w-full border-b-[1px] border-b-gray-200 p-4 flex gap-6' >
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
                                                    <p onClick={() => handleDecreaseQuantity(product.title)} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>-</p>
                                                    <p className='font-semibold text-[20px]'>&nbsp;{product.quantity}&nbsp;</p>
                                                    <p onClick={() => handleIncreaseQuantity(product.title)} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>+</p>
                                                </div>
                                                <button onClick={() => handleDeleteProduct(product.title)} className='text-blue-600 '>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div ref={cartRef}>
                            {
                                products.map((product, index) => (
                                    <div key={index} className='w-full border-b-[1px] border-b-gray-200 p-4 flex gap-6' >
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
                                                    <p onClick={() => dispatch(decreaseQuantity(product.title))} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>-</p>
                                                    <p className='font-semibold text-[20px]'>&nbsp;{product.quantity}&nbsp;</p>
                                                    <p onClick={() => dispatch(increaseQuantity(product.title))} className='px-2 cursor-pointer bg-gray-200 rounded-md hover:bg-gray-400 duration'>+</p>
                                                </div>
                                                <button onClick={() => dispatch(deleteProduct(product.title))} className='text-blue-600 '>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <div className='flex justify-between  '>
                        <button onClick={() => handleClearCart()}
                            className='w-[200px] border-[1px] bg-gray-100 border-gray-200 py-1 text-sm text-blue-600 rounded-lg
                          text-center p-[4px] mt-1 active:ring-2 active:ring-offset-1 active:ring-blue-600
                         '>Clear Cart</button>
                        <div className='text-[22px] font-medium flex justify-end'>SubTotal ({userCart.length > 0 > 0 ? cartTotalQty : totalQty} items) :&nbsp;
                            <div className='flex justify-center items-center '>
                                <p className='font-medium text-[19px] '>₹&nbsp;</p>
                                <span className='text-[23px] font-bold'>{userCart.length > 0 > 0 ? cartTotalPrice : totalPrice}.00</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-white h-16'>
                </div>
                <p className='text-sm p-5'>
                    The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.
                    Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.
                </p>
            </div>
            <div className=' w-[22%] flex flex-col gap-5 my-10 '>
                <div className='w-full  bg-white py-6 px-5'>
                    <div className='flex flex-row gap-2 '>
                        <img className='w-5 h-5' src={correct} alt="correct" />
                        <span className='text-[13px] text-[#17a34acc]'>Part of your order qualifies for FREE Delivery.
                            <span className='text-gray-500'>Select this option at checkout.</span>
                        </span>
                    </div>
                    <div className='text-[18px] mt-4 font-medium flex justify-start items-center'>SubTotal ({userCart.length > 0 ? cartTotalQty : totalQty} items) :&nbsp;
                        <div className='flex items-center '>
                            <p className='font-medium text-[16px] '>₹&nbsp;</p>
                            <span className='text-[18px] font-bold'>{userCart.length > 0 ? cartTotalPrice : totalPrice}.00</span>
                        </div>
                    </div>
                    {
                        authenticated
                            ? <Link to="/checkout">
                                <button className={`pt-2 w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
                                    Proceed to Buy
                                </button>
                            </Link>
                            : <Link to="/signIn">
                                <button className={`pt-2 w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
                                    Proceed to Buy
                                </button>
                            </Link>
                    }
                    <div className='border-[1px] border-gray-200 mt-4 flex items-center justify-center py-2 '>EMI Available</div>
                </div>
                <div className='w-full  bg-white' >
                    <h1 className='font-semibold mx-3 pt-3 '>Customers who bought other items</h1>
                    <div style={{ height: productDivHeight }} className='bg-white flex flex-col gap-4 py-3 ml-3 custom-scrollbar overflow-y-hidden hover:overflow-y-scroll '>
                        {productsData.map((product, index) => (
                            <div className='flex flex-row gap-2' key={index} >
                                <Link to={`/allProducts/${product.title}`}>
                                    <img className='w-20 h-20' src={product.thumbnail} alt="productImage" />
                                </Link>
                                <div className=''>
                                    <Link to={`/${product.category}/${product.title}`}>
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

export default CartItems;


