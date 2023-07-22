import React from 'react';
import { logoBlack } from '../assets';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <div className='bg-white'>
            <div className='flex flex-col justify-center items-center '>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-[26%] mt-4 border-[1px] rounded-lg '>
                    <div className='my-4 mx-5 '>
                        <span className='text-[28px] font-semibold'>
                            Password assistance
                        </span>
                        <div className='text-[13px] font-medium tracking-wide mt-2 '>
                            Enter the email address or mobile phone number associated with your Amazon account.
                        </div>
                        <div className='my-3'>
                            <label className='text-sm font-semibold'>
                                Email or mobile phone number
                                <input type="text" className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                            </label>
                        </div>

                        <button className={`text-sm w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px] mt-4 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                        >Continue</button>

                    </div>
                </div>
                <div className='w-[26%] mt-2 text-[17px] font-medium'>Has your email address or mobile phone number changed?</div>
                <div className='w-[26%] text-[13px] font-medium tracking-wide mt-1 mb-8 '>
                If you no longer use the e-mail address associated with your Amazon account, you may contact Customer Service for help restoring access to your account.
                </div>

            </div>
            <div className="flex flex-row text-[11px] gap-4 mx-32 mt-10 text-white justify-center tracking-wide border-t-[2px] pt-5">
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940" className='text-blue-500 hover:text-red-500 cursor-pointer'>Conditions of Use</a>
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380" className='text-blue-500 hover:text-red-500 cursor-pointer'>Privacy Notice</a>
                <p className='text-blue-500 hover:text-red-500 cursor-pointer'>Interest-Based Ads</p>
            </div>
            <div className='text-xs tracking-wider text-black flex justify-center mt-[4px] pb-16'>
                © 1996-2023, Amazon.com, Inc. or its affiliates
            </div>

        </div>
    )
}

export default ForgotPassword;
