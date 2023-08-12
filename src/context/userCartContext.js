import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useSelector } from 'react-redux';


const UserCartContext = createContext();

export const UserCartProvider = ({ children }) => {
    const [userCart, setUserCart] = useState([]);
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);

    useEffect(() => {
        // You can fetch the user's cart data if authenticated and userInfo is available
        if (authenticated && userInfo) {
            // Function to fetch the user's cart data from Firebase
            const getUserCartFromFirebase = async (userInfo) => {
                try {
                    const userCartRef = doc(collection(db, 'users', userInfo.email, 'cart'), userInfo.id);
                    const docSnapshot = await getDoc(userCartRef);
                    if (docSnapshot.exists()) {
                        setUserCart(docSnapshot.data().cart);
                    }
                } catch (error) {
                    console.error('Error fetching user cart data:', error);
                }
            };
            getUserCartFromFirebase(userInfo);
        } else {
            setUserCart([]); // reset the userCart if user is not authenticated
        }
    }, [authenticated, userInfo]);

    // Function to update the userCart in the cartItem
    const updateUserCart = (updatedCart) => {
        setUserCart(updatedCart);
    };

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        let allPrice = 0;
        let allQty = 0;
          if (userCart.length > 0 && authenticated) {
            userCart.forEach((product) => {
                allPrice += product.quantity * product.price;
                allQty += product.quantity;
            });
            setCartTotalPrice(allPrice);
            setCartTotalQty(allQty);
        }
        else{
            setCartTotalQty(0);
            setCartTotalPrice(0);
        }
    }, [userCart,authenticated]);

    return (
        <UserCartContext.Provider value={{ userCart, updateUserCart,cartTotalQty,cartTotalPrice }}>
            {children}
        </UserCartContext.Provider>
    );
};

// custom hook to use it anywhere in app
export const useCart = () => {
    return useContext(UserCartContext);
};
