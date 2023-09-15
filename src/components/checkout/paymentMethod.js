// yxyY3BFdEwIuNn8wwH5YgZlr

import React, { useState } from "react";
// import CardDetails from "./cardDetails";
import { useAddress } from '../../context/userAddressContext';
// import { CardElement, useStripe } from "react-stripe-js";

const PaymentMethod = () => {

    const { updateSelectedPayment } = useAddress();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handleSelectPaymentMethod = (event) => {
        setSelectedPaymentMethod(event.target.value);
        updateSelectedPayment(event.target.value);
    };

    return (
        <div>
            <p className="text-lg font-semibold text-red-700 mt-3">2 &nbsp; Select a Payment Method</p>
            <div className="w-full flex justify-end">
                <div className="w-[96%] border-[1px] border-gray-400 rounded-lg mt-1 px-4 py-3">
                    <p className="text-lg font-semibold border-b border-gray-400">Payment methods</p>
                    <div className="flex flex-col gap-4 mt-2 font-semibold">
                        <label className="inline-flex items-center">
                            <input type="radio" name="paymentMethod" value="Credit/Debit Card" onChange={handleSelectPaymentMethod} />
                            <span className="ml-2">Credit or debit card</span>
                        </label>

                        {/* {(selectedPaymentMethod === "Credit/Debit Card") && <CardDetails />} */}

                        <label className="inline-flex items-center">
                            <input type="radio" name="paymentMethod" value="Upi Apps" onChange={handleSelectPaymentMethod} />
                            <span className="ml-2">UPI Apps</span>
                        </label>

                        {/* {(selectedPaymentMethod === "Upi Apps") &&
                            <div className="w-[40%] mx-auto border-[1px] border-gray-400 rounded-lg ">
                                <form className="flex flex-col my-2 gap-2 ml-8 ">
                                    <label className=' flex flex-col gap-2'>
                                        <span> Please enter your UPI ID</span>
                                        <input type="text" value="" onChange={(e) => { }} autoComplete="true" className=' border-[1px] border-[#a6a6a6] rounded p-1 w-56' />
                                    </label>
                                    <button className="w-[86%] text-center text-sm font-normal rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[7px] active:ring-2 active:ring-offset-1 active:ring-blue-500">
                                        Continue
                                    </button>
                                </form>
                            </div>
                        } */}

                        <label className="inline-flex items-center">
                            <input type="radio" name="paymentMethod" value="EMI" onChange={handleSelectPaymentMethod} />
                            <span className="ml-2">EMI</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="paymentMethod" value="cash on Delivery" onChange={handleSelectPaymentMethod} />
                            <span className="ml-2">Cash on Delivery/Pay on Delivery</span>
                        </label>
                        <span className="ml-5 -mt-4 font-normal text-sm">Cash, UPI and Cards accepted.</span>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default PaymentMethod;
