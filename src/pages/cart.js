import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollRestoration } from 'react-router-dom';
import EmptyCart from './emptyCart';
import CartItems from './cartItems';


const Cart = () => {
    const products = useSelector((state) => state.amazon.products);
    
    return (
        <div className='flex gap-5 w-full h-full bg-gray-200 '>
            <ScrollRestoration />
            {products.length > 0
                ? <CartItems />
                : <EmptyCart />
             }
        </div>
    )
}

export default Cart;
