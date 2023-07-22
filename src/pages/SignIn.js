import React, { useState, useEffect } from "react";
import { logoBlack } from '../assets/index';
import { Link, Outlet } from 'react-router-dom';
import { right, down } from "../assets/index";



const SignIn = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [needHelp, setNeedHelp] = useState(false);

    const handleNeedHelp = () => {
        setNeedHelp(!needHelp);
    };


    const handleNewClickEffect = (e) => {
        e.stopPropagation();
        setIsClicked(true);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.classList.contains("clicked")) {
                setIsClicked(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className='bg-white'>
            <div className='flex flex-col justify-center items-center'>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-[26%] mt-4 border-[1px] rounded-lg'>
                    <div className='my-4 mx-7 '>
                        <span className='text-[28px] font-semibold'>
                            Sign in
                        </span>
                        <div className='my-3'>
                            <label className='text-sm font-semibold'>
                                Email or mobile phone number
                                <input type="text" className='w-full border-[1px] border-[#a6a6a6] rounded p-1' required />
                            </label>
                        </div>
                        <div className='my-3'>
                            <label className='text-sm font-semibold'>
                                Password
                                <input type="password" className='w-full border-[1px] border-[#a6a6a6] rounded p-1' required />
                            </label>
                        </div>

                        <button className={`${isClicked ? "clicked" : ""} text-sm w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px]`}
                            onClick={(e) => { handleNewClickEffect(e) }}>Continue</button>

                        <div className='text-xs tracking-wide mt-5 '>
                            <span className=''>
                                By continuing, you agree to Amazon's
                                <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940' className='text-blue-500 hover:text-red-500 cursor-pointer'> Conditions of Use </a>
                                and
                                <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380' className='text-blue-500 hover:text-red-500 cursor-pointer'> Privacy Notice</a>.
                            </span>
                        </div>
                        <div className='flex items-center gap-2 mt-7 cursor-pointer group ' onClick={handleNeedHelp}>
                            <div className='w-2 h-2 text-gray-200'>
                                {
                                    needHelp ?
                                        <img src={down} alt='down' /> :
                                        <img src={right} alt='right' />
                                }

                            </div>
                            <div className=' text-xs  text-blue-500 group-hover:underline group-hover:text-red-500'>Need help?</div>
                        </div>
                        {
                            needHelp ?
                                (<div className=' text-xs  text-blue-500 cursor-pointer hover:underline hover:text-red-500 ml-4 mt-2 mb-5'>
                                <Link to="forgotPassword">
                                    Forgot password
                                    </Link>
                                    </div>)
                                 : null
                        }
                    </div>
                </div>
                <hr></hr>

                <div className='text-sm text-gray-500 my-4'>
                    New to Amazon?
                </div>


                <div className='w-[26%] text-[12px] font-medium tracking-wide text-center border-[1px] rounded-lg p-[5px] hover:bg-gray-100 mb-7 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500'>
                    <Link to="/createAccount">
                        <div>Create your Amazon account</div>
                    </Link>
                </div>

            </div>
            <div className="flex flex-row text-[11px] gap-4 mx-32 text-white justify-center tracking-wide border-t-[2px] pt-5 my-4">
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940" className='text-blue-500 hover:text-red-500 cursor-pointer'>Conditions of Use</a>
                <a href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380" className='text-blue-500 hover:text-red-500 cursor-pointer'>Privacy Notice</a>
                <p className='text-blue-500 hover:text-red-500 cursor-pointer'>Interest-Based Ads</p>
            </div>
            <div className='text-xs tracking-wider text-black flex justify-center mt-[4px] pb-16'>
                © 1996-2023, Amazon.com, Inc. or its affiliates
            </div>
            <Outlet />
        </div>
    )
};

export default SignIn;
