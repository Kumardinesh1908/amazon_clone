import React from 'react'

const PaymentMethod = () => {
    return (
        <div>
            <p className='text-lg font-semibold text-red-700 mt-3'>2 &nbsp; Select a Payment Method</p>
            <div className='w-full flex justify-end'>
                <div className='w-[96%] border-[1px] border-gray-400 rounded-lg mt-1 px-4 py-3'>
                    <p className='text-lg font-semibold border-b border-gray-400'>Payment methods</p>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod;
