import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useAddress } from '../context/userAddressContext';


const UserAddresses = ({ setShowAddressForm }) => {

    // state to hold userInfo from redustoolkit 
    const userInfo = useSelector((state) => state.amazon.userInfo);

    const { userAddress, updateUserAddress, updateSelectedAddress } = useAddress();

    // state to hold the selected address index
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    // Access the selected address details using the index
    const selectedAddress = userAddress[selectedAddressIndex];

    // // Updating selected address in userAddressContext
    // updateSelectedAddress(selectedAddress);

    // Function to find the index of selected address
    const handleAddressSelect = (index) => {
        setSelectedAddressIndex(index);
        // Updating selected address in userAddressContext
        updateSelectedAddress(selectedAddress);
    };

    // function to delete selected address from Firebase
    const deleteAddressFromFirebase = async (addressIndex) => {
        // Reference to the user's Addresses document in Firestore
        const addressesRef = doc(collection(db, 'users', userInfo.email, 'shippingAddresses'), userInfo.id);
        // Get a snapshot of the user's Addresses document
        const docSnapshot = await getDoc(addressesRef);
        // Check if the Addresses document exists
        if (docSnapshot.exists()) {
            // Get the Addresses data from the snapshot
            const addresses = docSnapshot.data().Addresses;
            // Filter out the addresss with the specified index from the Addresses
            const updatedAddresses = addresses.filter((address, index) => index !== addressIndex);
            // Update the Addesses data in Firestore with the filtered address
            await updateDoc(addressesRef, { Addresses: updatedAddresses });
            // Update the selected address to null after deletion
            updateSelectedAddress(null);
            // Update the userAddresses state to reflect the change immediately on the UI
            const updatedUserAddresses = userAddress.filter((address, index) => index !== addressIndex);
            updateUserAddress(updatedUserAddresses);
        }
    };

    return (
        <div >
            <p className='text-lg font-semibold text-red-700'>1 &nbsp; Select a delivery address</p>
            <div className='w-full flex justify-end'>
                <div className='w-[96%] border-[1px] border-gray-400 rounded-lg mt-1 px-4 py-3'>
                    <div className='flex flex-row justify-between border-b border-gray-400'>
                        <p className='text-lg font-semibold '>Your addresses</p>
                        <button onClick={() => { setShowAddressForm(true) }} className='text-lg font-semibold text-blue-500 hover:text-red-700 hover:underline'>Add new address</button>
                    </div>
                    {
                        userAddress.map((address, index) => (
                            <label key={index} className="flex items-start my-5 mx-3">
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    value={index}
                                    onChange={() => handleAddressSelect(index)}
                                    className="mr-1"
                                />
                                <span className="text-sm capitalize -mt-1">
                                    <span className='font-semibold'>{address.name}</span>
                                    <span> {address.address}</span>
                                    <span>, {address.area}</span>
                                    <span>, {address.landmark}</span>
                                    <span>, {address.city} </span>
                                    <span>, {address.pincode}</span>
                                    <span>, State : {address.state}</span>
                                    <span>, Country : {address.country}</span>
                                    <span>, Mobile Number : {address.mobile} &nbsp;</span>
                                    <button onClick={() => deleteAddressFromFirebase(index)} className='text-blue-500 hover:text-red-700 hover:underline'>Delete this address</button>
                                </span>
                            </label>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default UserAddresses;
