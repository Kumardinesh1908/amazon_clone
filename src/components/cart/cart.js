import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollRestoration } from 'react-router-dom';
import EmptyCart from './emptyCart';
import CartItems from './cartItems';
import { useCart } from '../../context/userCartContext';

const Cart = () => {
    // Get the list of localCartProducts from the Redux store
    const localCartProducts = useSelector((state) => state.amazon.localCartProducts);

    // Use the useCart hook to access the userCart data
    const { userCart } = useCart();

    return (
        <div className='flex gap-5 w-full h-full bg-gray-200 '>
            <ScrollRestoration />
             {/* Check if there are localCartProducts in the Redux store or user Firebasecart */}
            {
                localCartProducts.length > 0 || userCart.length > 0
                    ? (<CartItems />)
                    : (<EmptyCart />)
            }
        </div>
    )
}

export default Cart;

