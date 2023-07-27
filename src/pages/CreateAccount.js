import React from 'react';
import { logoBlack } from '../assets';
import { Link } from 'react-router-dom';
import { i, right } from '../assets';
import ScrollToTop from '../ScrollToTop';

const CreateAccount = () => {
    return (
        <div className='bg-white'>
            <div className='flex flex-col justify-center items-center'>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-[26%] mt-4 border-[1px] rounded-lg'>
                    <div className='my-4 mx-5 '>
                        <span className='text-[28px] font-semibold'>
                            Create Account
                        </span>
                        <div className='my-3'>
                            <label className='text-sm font-semibold'>
                                Your name
                                <input type="text" placeholder="First and last name" className='w-full border-[1px] border-[#a6a6a6] rounded p-1 ' />
                            </label>
                        </div>
                        <div className='my-3'>
                            <label className='text-sm font-semibold'>
                                Mobile number
                                <div className='flex items-center justify-between mt-1'>
                                    <div className='w-[22%] border-[1px] rounded-md border-[#a6a6a6] p-1'>IN +91</div>
                                    <input type="tel" placeholder="Mobile number" className='w-[74%] border-[1px] border-[#a6a6a6] rounded p-1' />
                                </div>
                            </label>
                        </div>
                        <div className='my-3'>
                            <label className='text-sm font-semibold'>
                                Email (Optional)
                                <input type="email" className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                            </label>
                        </div>
                        <div className='mt-3'>
                            <label className='text-sm font-semibold'>
                                Password
                                <input type="password" placeholder="At least 6 characters" className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                            </label>
                            <div className='flex items-center justify-start mt-1' >
                                <img src={i} alt='i' className='w-4 h-4' />
                                <span className='text-xs'>Passwords must be at least 6 characters.</span>
                            </div>
                        </div>
                        <div className='text-[12px] tracking-wide mt-4 '>
                            By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.
                        </div>

                        <button className={`text-sm w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px] mt-5 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                        >Continue</button>

                        <div className='flex items-center gap-2 mt-7 '>
                            <div className=' text-xs'>
                                Already have an account?&nbsp;
                                <Link to="/signIn" >
                                    <span className='text-blue-500 hover:underline hover:text-red-500 cursor-pointer'>
                                        Sign in
                                    </span>
                                </Link>
                            </div>
                            <div className='w-[6px] h-[6px] mt-1'>
                                <img src={right} alt='right' />
                            </div>
                        </div>

                        <div className='text-xs tracking-wide mt-5 '>
                            <span className=''>
                                By creating an account or logging in, you agree to Amazon’s
                                <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940' className='text-blue-500 hover:text-red-500 cursor-pointer'> Conditions of Use </a>
                                and
                                <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380' className='text-blue-500 hover:text-red-500 cursor-pointer'> Privacy Notice</a>.
                            </span>
                        </div>

                    </div>
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
            <ScrollToTop />
        </div>
    )
}

export default CreateAccount
