import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/userCartContext';
import { useAddress } from '../context/userAddressContext';
import { useDispatch, useSelector } from 'react-redux';
import { resetBuyNowProduct } from '../redux/amazonSlice';

const OrderSummary = () => {
  const dispatch = useDispatch();

  // getting product from BuyNow option in ProductDetails
  const product = useSelector((state) => state.amazon.buyNowProduct);
  if (product) {
    var productQty = product.quantity;
    var productPrice = product.price;
    var productTotalPrice = productPrice * productQty;
  }
  // getting all cart products
  const { cartTotalQty, cartTotalPrice } = useCart(); //userCart, updateUserCart,
  const { selectedAddress, selectedPayment } = useAddress();
  console.log(selectedAddress, selectedPayment);

  let deliveryCharges = 0;
  if ((productTotalPrice || cartTotalPrice) < 499) {
    deliveryCharges = 40;
  }

  const [deliveryInfo, setDeliveryInfo] = useState(false);
  const deliveryInfoRef = useRef(null);

  const toggleDeliveryInfo = () => {
    setDeliveryInfo(!deliveryInfo);
  };

  // Function to reset buyNowProduct
  const resetBuyNow = () => {
    dispatch(resetBuyNowProduct());
  };

  useEffect(() => {
    // Add a popstate event listener when the component mounts
    window.addEventListener('popstate', resetBuyNow);
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', resetBuyNow);
    };
  }, [dispatch]);

  return (
    <div>
      <div className=" mx-auto border-[1px] border-gray-400 rounded-lg mt-3">

        <div className=" mt-2 px-[18px]">
          <h3 className=" text-xl font-semibold pt-2 mb-3">Order Summary</h3>
          <div className="flex justify-between mb-[2px] text-sm">
            <p>Total Items:</p>
            <p>{product ? productQty : cartTotalQty}</p>
          </div>
          <div className="flex justify-between mb-[2px] text-sm">
            <p>Total Price:</p>
            <p>₹{product ? productTotalPrice.toFixed(2) : cartTotalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-[2px] text-sm">
            <p>Delivery:</p>
            <p>₹{deliveryCharges}.00</p>
          </div>
          <div className="text-xl font-semibold flex justify-between py-2 border-t border-gray-400 text-red-700">
            <p>Order Total:</p>
            <p>₹{product ? (productTotalPrice + deliveryCharges).toFixed(2) : (cartTotalPrice + deliveryCharges).toFixed(2)}</p>
          </div>

          {selectedAddress &&
            <div >
              <h3 className="border-t border-gray-400 text-lg font-semibold py-2">Selected Address</h3>
              <div className="mb-2 text-sm">
                <p className='font-semibold'>Name : {selectedAddress.name}</p>
                <span>{selectedAddress.address}, {selectedAddress.area}, {selectedAddress.landmark}, {selectedAddress.city}, {selectedAddress.pincode}, {selectedAddress.state}, {selectedAddress.country}</span>
              </div>
            </div>
          }

          {selectedPayment &&
            <div >
              <h3 className="border-t border-gray-400 text-lg font-semibold py-2">Selected Payment Method</h3>
              <div className="mb-2 text-sm">
                <p className='font-semibold capitalize'> {selectedPayment}</p>
              </div>
            </div>
          }


        </div>

        <div className='mx-[18px] border-t border-gray-400'>
          {(selectedAddress && selectedPayment) &&
            <button className="w-full text-center text-sm rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[7px] mt-2 active:ring-2 active:ring-offset-1 active:ring-blue-500">
              Place your order
            </button>
          }
          <p className="text-xs text-gray-600  my-2 text-center">
            By placing your order, you agree to Amazon's
            <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200522700" className='text-blue-500 hover:text-red-500 cursor-pointer'> privacy notice </a>
            and
            <a href="https://www.amazon.in/gp/help/customer/display.html?nodeId=200545940" className='text-blue-500 hover:text-red-500 cursor-pointer'> conditions of use</a>.
          </p>
        </div>



        <div className="flex justify-between border-t border-gray-400 rounded-br-lg rounded-bl-lg bg-gray-200">
          <p onClick={toggleDeliveryInfo} className="pl-[18px] my-4 text-xs tracking-wide text-blue-500 hover:underline hover:text-red-700 hover:cursor-pointer">
            How are delivery costs calculated?
          </p>
        </div>
      </div>

      {
        deliveryInfo &&
        <div ref={deliveryInfoRef} className="border mt-2 w-[400px]">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="px-2 py-1 border text-xs">Shipping Speed</th>
                <th className="px-2 py-1 border text-xs">Prime Members</th>
                <th className="px-2 py-1 border text-xs">Prime Lite Members</th>
                <th className="px-2 py-1 border text-xs">Non-Prime Members</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="px-2 py-1 border text-xs">Same-Day Delivery</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">₹175</td>
                <td className="px-2 py-1 border text-xs">₹175</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border text-xs">One-Day Delivery</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">₹150</td>
                <td className="px-2 py-1 border text-xs">₹150</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-2 py-1 border text-xs">Two-Day Delivery</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">₹120</td>
              </tr>
              <tr>
                <td className="px-2 py-1 border text-xs">No-Rush Delivery</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">N.A</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-2 py-1 border text-xs">Standard Delivery**</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">Free</td>
                <td className="px-2 py-1 border text-xs">₹40</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-gray-600 mt-2 p-2">
            **Standard Delivery charges are free for non-Prime members for orders ₹499 or more.
          </p>
          <div className='flex justify-end relative'>
            <button className='text-sm text-blue-500 hover:text-red-700 absolute -top-5 right-1' onClick={toggleDeliveryInfo}>Close</button>
          </div>
        </div>
      }
    </div>
  )
}

export default OrderSummary;
