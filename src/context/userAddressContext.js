// Import required modules and functions
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useSelector } from 'react-redux';

// Create a new context for user address data
const UserAddressContext = createContext();

// Create a provider component that wraps its children with the context
export const UserAddressProvider = ({ children }) => {
    // State to hold the user's address information
    const [userAddress, setUserAddress] = useState([]);

    // Get user info and authentication status from Redux store
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);

    // Function to update the userAddress in the context
    const updateUserAddress = (updatedAddress) => {
        setUserAddress(updatedAddress);
    };

    // Effect to fetch user's address data from Firebase when authentication or user info changes
    useEffect(() => {
        if (authenticated && userInfo) {
            // Function to fetch user's addresses from Firebase
            const getuserAddressesFromFirebase = async (userInfo) => {
                try {
                    // Create a reference to the user's address document in Firebase
                    const userAddressesRef = doc(collection(db, 'users', userInfo.email, 'shippingAddresses'), userInfo.id);

                    // Fetch the document snapshot
                    const docSnapshot = await getDoc(userAddressesRef);

                    // If the document exists, update the userAddress state
                    if (docSnapshot.exists()) {
                        setUserAddress(docSnapshot.data().Addresses);
                    }
                } catch (error) {
                    console.error('Error fetching user address data:', error);
                }
            };
            // Call the function to fetch user's addresses from Firebase
            getuserAddressesFromFirebase(userInfo);
        } else {
            // Reset userAddress state if user is not authenticated
            setUserAddress([]);
        }
    }, [authenticated, userInfo]);

    // state to hold user's selected address
    const [selectedAddress,setSelectedAddress] = useState(null); 

    // Function to update the user Selected Address in the context
    const updateSelectedAddress = (updatedSelectedAddress) => {
        setSelectedAddress(updatedSelectedAddress);

    };

    // Provide the userAddress state and the updateUserAddress function to children components
    return (
        <UserAddressContext.Provider value={{ userAddress, updateUserAddress,selectedAddress,updateSelectedAddress }}>
            {children}
        </UserAddressContext.Provider>
    );
}

// Custom hook to use the user address context in any part of the app
export const useAddress = () => {
    return useContext(UserAddressContext);
};
