import React, { useState, useEffect } from "react";
import { logoBlack } from '../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import { right, down, required } from "../assets/index";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import ScrollToTop from "../ScrollToTop";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  useDispatch } from 'react-redux';
import { setUserInfo } from "../redux/amazonSlice";

const SignIn = () => {
    const dispatch = useDispatch();

    const auth = getAuth();
    const navigate = useNavigate();

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

    const [warningPassword, setWarningPassword] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [userEmailError, setUserEmailError] = useState("");
    const validate = () => {
        let isValid = true;
        if (inputValue === "") {
            setUserEmailError("Enter your email or mobile number");
            isValid = false;
        }
        if (passwordValue === "") {
            setWarningPassword("Enter your password");
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
        setLoading(true);
        signInWithEmailAndPassword(auth, inputValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setUserInfo({
                    id : user.uid,
                    name : user.displayName,
                    email : user.email,
                    image : user.photoURL
                }))
                setLoading(false);
                setSuccessMsg("Successfully Logged-in! Welcome back.");
                setTimeout(() => {
                    navigate("/");
                    setSuccessMsg("");
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                setLoading(false);
                if (errorCode.includes("auth/invalid-email")) {
                    setUserEmailError("Enter a valid Email");
                }
                if (errorCode.includes("auth/user-not-found")) {
                    setUserEmailError("Invalid Email! User not found.");
                }
                if (errorCode.includes("auth/wrong-password")) {
                    setWarningPassword("There was a problem.Your password is incorrect");
                }
                console.log("Something is up ", errorCode);
            });
        setInputValue("");
        setPasswordValue("");
    }

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    return (
        <div className='bg-white w-full h-full'>
            <div className='flex flex-col justify-center items-center'>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-80 mt-4 border-[1px] rounded-lg'>
                    <div className='my-4 mx-7 '>
                        <span className='text-[28px] font-semibold'>
                            Sign in
                        </span>
                        {
                            successMsg
                                ? <div className=''>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 10, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className='text-base font-semibold text-green-600 border-[1px] my-8 text-center'
                                    >
                                        {successMsg}
                                    </motion.p>
                                </div>
                                : <form className='my-3' onSubmit={handleSubmit}>
                                    <label className='text-sm font-semibold'>
                                        Email or mobile number
                                        <input type="text" value={inputValue} onChange={(e) => {
                                            setInputValue(e.target.value);
                                            setUserEmailError("");
                                        }} className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                                    </label>
                                    {
                                        userEmailError && <div className="flex  items-center  pt-1 pb-2">
                                            <img src={required} className="w-4 h-4 mr-1" alt="warning" />
                                            <div className="text-xs text-[#FF0000]">{userEmailError}</div>
                                        </div>
                                    }
                                    <label className='text-sm font-semibold'>
                                        Password
                                        <input type="password" value={passwordValue} onChange={(e) => {
                                            setPasswordValue(e.target.value);
                                            setWarningPassword("");
                                        }} className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                                    </label>
                                    {
                                        warningPassword && <div className="flex  items-center pt-1 pb-2">
                                            <img src={required} className="w-4 h-4 mr-1" alt="warning" />
                                            <div className="text-xs text-[#FF0000]">{warningPassword}</div>
                                        </div>
                                    }
                                    <button className={`${isClicked ? "clicked" : ""} text-sm my-4 w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px]`}
                                        onClick={(e) => { handleNewClickEffect(e) }}>Continue</button>
                                    {
                                        loading && <div className='flex justify-center'>
                                            <RotatingLines
                                                strokeColor="#febd69"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="50"
                                                visible={true}
                                            />
                                        </div>
                                    }

                                </form>
                        }

                        <div className='text-xs tracking-wide '>
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

                <div className='text-sm text-gray-500 my-4'>
                    New to Amazon?
                </div>


                <div className='w-80 text-[12px] font-medium tracking-wide text-center border-[1px] rounded-lg p-[5px] hover:bg-gray-100 mb-7 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500'>
                    <Link to="/createAccount">
                        <div>Create your Amazon account</div>
                    </Link>
                </div>
            </div>
            <hr className="w-11/12 mx-auto" />
            <div className="flex flex-row text-[11px] gap-4 mx-auto text-white justify-center tracking-wide pt-5 my-4">
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
};

export default SignIn;
