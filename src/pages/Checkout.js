import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { logoBlack } from '../assets/index';
import { resetBuyNowProduct } from '../redux/amazonSlice';
import { useAddress } from '../context/userAddressContext';
import AddressForm from './addressForm';
import UserAddresses from './userAddresses';
import PaymentMethod from './paymentMethod';
import OrderSummary from './OrderSummary';


const Checkout = () => {
  const dispatch = useDispatch();
  const { userAddress } = useAddress();
  const [showAddressForm, setShowAddressForm] = useState(userAddress.length === 0);

  return (
    <div className='w-full h-full '>
      {/* header */}
      <div className='relative flex flex-row justify-around items-center pt-[18px] pb-2 mx-5 border-b-[1px] shadow-inner-bottom'>
        <Link to="/">
          <div onClick={() => dispatch(resetBuyNowProduct())} className="cursor-pointer px-2 h-12 flex items-center">
            <img className="w-36 mt-2" src={logoBlack} alt="logo" />
          </div>
        </Link>
        <div className=''>
          <h1 className='text-[28px] font-semibold'>Checkout</h1>
        </div>
      </div>

      {/* addresssForm or userAddress and PaymentMethod */}
      <div className='flex flex-row mx-5 gap-6 mt-3 justify-center '>
        <div className='w-[61%] '>

          {
            showAddressForm || userAddress.length === 0
              ? <AddressForm setShowAddressForm={setShowAddressForm} />
              : <UserAddresses setShowAddressForm={setShowAddressForm} />
          }
          <div className='mt-3 border-b border-gray-500'></div>

          <PaymentMethod />
          <div className='mt-3 border-b border-gray-500'></div>

        </div>

        {/* OrderSummary */}
        <div className='w-[22%] h-full sticky top-3'>
          <OrderSummary />
        </div>

      </div>
    </div>
  )
}

export default Checkout;
