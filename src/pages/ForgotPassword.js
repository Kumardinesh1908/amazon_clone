import React,{useState} from 'react';
import { logoBlack } from '../assets';
import { Link } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';

const ForgotPassword = () => {

    const [input,setInput] = useState("");
    const [error,setError] = useState("");
    const validate=()=>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobilePattern = /^[0-9]{10}$/;
        if(!emailPattern.test(input) && !mobilePattern.test(input)){
             setError("We're sorry. We weren't able to identify you given the information provided.")
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        validate();
        setInput("");
    }
    return (
        <div className='bg-white'>
            <div className='flex flex-col justify-center items-center '>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-80 mt-4 border-[1px] rounded-lg '>
                    <div className='my-4 mx-5 '>
                        <span className='text-[28px] font-semibold'>
                            Password assistance
                        </span>
                        <div className='text-[13px] font-medium tracking-wide mt-2 '>
                            Enter the email address or mobile phone number associated with your Amazon account.
                        </div>
                        <form onSubmit={handleSubmit} className='my-3'>
                            <label className='text-sm font-semibold'>
                                Email or mobile phone number
                                <input type="text" value={input} onChange={(e)=>{setInput(e.target.value);setError('')}} className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                            </label>
                            <button className={`text-sm w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px] mt-4 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                            >Continue</button>
                        </form>
                        {
                            error && <div className='text-xs text-[#FF0000]'>{error}</div>
                        }
                    </div>
                </div>
                <div className='w-80 mt-2 text-md leading-5 pl-3 font-medium'>Has your email address or mobile phone number changed?</div>
                <div className='w-80 text-sm  mx-auto mt-1 pl-3 mb-8 '>
                If you no longer use the e-mail address associated with your Amazon account, you may contact Customer Service for help restoring access to your account.
                </div>

            </div>
            <hr className='w-11/12 mx-auto' />
            <div className="flex flex-row text-[11px] gap-4 mx-auto mt-10 text-white justify-center tracking-wide  pt-5">
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

export default ForgotPassword;
