import React, { useState } from 'react';
import { logoBlack } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { i, right } from '../assets';
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import ScrollToTop from '../ScrollToTop';
import { getAuth, createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from "firebase/auth";

const CreateAccount = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [nameInput, setNameInput] = useState("");
    const [mobileInput, setMobileInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firebaseError, setFirebaseError] = useState("");

    const validate = () => {
        const reqName = /^[A-Za-z\s]+$/;
        const reqEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const reqMobile = /^[0-9]{10}$/;
        const reqPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        let isValid = true;

        if (!reqName.test(nameInput)) {
            setNameError("Enter your name");
            isValid = false;
        }
        // if (mobileInput === "") {
        //     setEmailError("");
        //     isValid = true;
        // }
        if (mobileInput) {
            if (!reqMobile.test(mobileInput)) {
                setMobileError("Enter your mobile number");
                isValid = false;
            }
        }
        if (!reqEmail.test(emailInput)) {
            setEmailError("Enter a valid email address");
            isValid = false;
        }
        if (!reqPassword.test(passwordInput)) {
            setPasswordError("Enter your password");
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
        createUserWithEmailAndPassword(auth, emailInput, passwordInput)

            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: nameInput,
                    // phoneNumber : mobileInput,
                    // photoURL: "hi",
                });
                const user = userCredential.user;
                console.log(user);
                 sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("verify")
                        // ...
                    });
                setLoading(false);
                setSuccessMsg("Account Created Successfully!");
                setTimeout(() => {
                    navigate("/signIn");
                    setSuccessMsg("");
                }, 3000);
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.includes("auth/email-already-in-use")) {
                    setFirebaseError("Email already in use. Try another one.");
                    setLoading(false);
                }
            });
        setEmailInput("");
        setMobileInput("");
        setNameInput("");
        setPasswordInput("");
    };

    return (
        <div className='bg-white'>
            <div className='flex flex-col w-full h-full justify-center mb-10 items-center'>

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-36 mt-2" src={logoBlack} alt="logo" />
                    </div>
                </Link>

                <div className='w-80 mt-4 border-[0.066rem] rounded-lg'>
                    <div className='my-4 mx-5 '>
                        <span className='text-[28px] font-semibold'>
                            Create Account
                        </span>
                        <form className='my-3' onSubmit={handleSubmit}>
                            <label className='text-sm font-semibold'>
                                Your name
                                <input type="text" placeholder="First and last name" value={nameInput} onChange={(e) => {
                                    setNameInput(e.target.value);
                                    setNameError("");
                                }} className='w-full border-[1px] border-[#a6a6a6] rounded p-1 ' />

                            </label>
                            {
                                nameError && <div className='text-sm text-[#FF0000]'>{nameError}</div>
                            }
                            <label className='text-sm font-semibold mt-3'>
                                Email
                                <input type="text" value={emailInput} onChange={(e) => {
                                    setEmailInput(e.target.value);
                                    setEmailError("");
                                    setFirebaseError("");
                                }} className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />

                            </label>
                            {
                                (emailError || firebaseError) && <div className='text-sm text-[#FF0000]'>{emailError || firebaseError}</div>
                            }
                            <label className='text-sm font-semibold my-3'>
                                Mobile number (Optional)
                                <div className='flex items-center justify-between mt-1'>
                                    <div className='w-[22%] border-[1px] rounded-md border-[#a6a6a6] p-1'>IN +91</div>
                                    <input type="tel" maxLength="10" placeholder="Mobile number" value={mobileInput} onChange={(e) => {
                                        setMobileInput(e.target.value);
                                        setMobileError("");
                                    }} className='w-[74%] border-[1px] border-[#a6a6a6] rounded p-1' />
                                </div>
                            </label>
                            {
                                mobileError && <div className='text-sm text-[#FF0000]  pl-20'>{mobileError}</div>
                            }
                            <label className='text-sm font-semibold mt-3'>
                                Password
                                <input type="password" value={passwordInput} onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    setPasswordError("");
                                }} placeholder="At least 6 characters" className='w-full border-[1px] border-[#a6a6a6] rounded p-1' />
                            </label>
                            {
                                passwordError && <div className='text-sm text-[#FF0000]'>{passwordError}</div>
                            }
                            {!passwordError && <div className='flex items-center justify-start mt-1' >
                                <img src={i} alt='i' className='w-4 h-4' />
                                <span className='text-xs'>Passwords must be at least 6 characters.</span>
                            </div>}
                            <div className='text-[12px] tracking-wide mt-4 '>
                                By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.
                            </div>
                            <button className={`text-sm w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[6px] mt-5 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
                            >Continue</button>
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
                            {
                                successMsg && <div className=''>
                                    <motion.p
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 10, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className='text-base font-semibold text-green-600 border-[1px] px-2 text-center'
                                    >
                                        {successMsg}
                                    </motion.p>
                                </div>
                            }
                        </form>
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
            <hr className="w-11/12 mx-auto" />
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

export default CreateAccount;
