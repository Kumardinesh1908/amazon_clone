import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useSelector } from 'react-redux';


const UserOrdersContext = createContext();

export const UserOrdersProvider = ({ children }) => {
    const [userOrders, setUserOrders] = useState([]);
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);

    useEffect(() => {
        // You can fetch the user's Orders data if authenticated and userInfo is available
        if (authenticated && userInfo) {
            // Function to fetch the user's Orders data from Firebase
            const getUserOrdersFromFirebase = async (userInfo) => {
                try {
                    const userOrdersRef = doc(collection(db, 'users', userInfo.email, 'orders'), userInfo.id);
                    const docSnapshot = await getDoc(userOrdersRef);
                    if (docSnapshot.exists()) {
                        setUserOrders(docSnapshot.data().orders);
                    } else {
                        setUserOrders([]); // reset the userOrders if the user is not authenticated
                    }
                } catch (error) {
                    console.error('Error fetching user Orders data:', error);
                }
            };
            getUserOrdersFromFirebase(userInfo);
        } else {
            setUserOrders([]); // reset the userOrders if user is not authenticated
        }
    }, [authenticated, userInfo]);

    // Function to update the userOrders
    const updateUserOrders = (updatedOrders) => {
        setUserOrders(updatedOrders);
    };

    return (
        <UserOrdersContext.Provider value={{ userOrders, updateUserOrders }}>
            {children}
        </UserOrdersContext.Provider>
    );
};

// custom hook to use it anywhere in app
export const useOrders = () => {
    return useContext(UserOrdersContext);
};
