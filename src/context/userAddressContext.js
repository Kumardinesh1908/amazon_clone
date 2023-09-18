// Import required modules and functions
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useSelector } from 'react-redux';

const UserAddressContext = createContext(); // Create a new context for user address data

// Create a provider component that wraps its children with the context
export const UserAddressProvider = ({ children }) => {
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);

    const [userAddress, setUserAddress] = useState([]); // State to hold the user's address information
    const updateUserAddress = (updatedAddress) => {  // Function to update the userAddress in the context
        setUserAddress(updatedAddress);
    };

    const [selectedAddress, setSelectedAddress] = useState(null); // state to hold user's selected address 
    const updateSelectedAddress = (updatedSelectedAddress) => { // Function to update the user Selected Address in the context
        setSelectedAddress(updatedSelectedAddress);
    };

    const [selectedPayment, setSelectedPayment] = useState(""); // state to hold user's payment method
    const updateSelectedPayment = (updatedSelectedPayment) => { // function to update user's payment method in the context
        setSelectedPayment(updatedSelectedPayment);
    };

    // Effect to fetch user's address data from Firebase when authentication or user info changes
    useEffect(() => {
        if (authenticated && userInfo) {
            const getuserAddressesFromFirebase = async (userInfo) => {
                const userAddressesRef = doc(collection(db, 'users', userInfo.email, 'shippingAddresses'), userInfo.id);
                const docSnapshot = await getDoc(userAddressesRef);
                if (docSnapshot.exists()) {
                    setUserAddress(docSnapshot.data().Addresses);
                }
            };
            getuserAddressesFromFirebase(userInfo); // Call the function to fetch user's addresses from Firebase
        } else {
            setUserAddress([]); // Reset userAddress state if user is not authenticated
        }
    }, [authenticated, userInfo]);

    return (
        // Provide states and update functions to children components
        <UserAddressContext.Provider
            value={{
                userAddress, updateUserAddress,
                selectedAddress, updateSelectedAddress,
                selectedPayment, updateSelectedPayment
            }}
        >
            {children}
        </UserAddressContext.Provider>
    );
}

// Custom hook to use the user address context in any part of the app
export const useAddress = () => {
    return useContext(UserAddressContext);
};
