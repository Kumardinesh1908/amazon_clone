import React, { useState, useEffect } from "react";
import { logoBlack } from '../../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import { right, down, required, google, facebook } from "../../assets/index";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, linkWithCredential, FacebookAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setUserAuthentication, resetCart, addToOrders, addTocancelOrders, addToreturnOrders } from "../../redux/amazonSlice";
import { db } from '../../firebase/firebase.config';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useCart } from "../../context/userCartContext";
import { useOrders } from "../../context/userOrderContext";

const SignIn = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.amazon.localCartProducts);
    const { updateUserCart } = useCart(); // get the updateUserCart function from custom hook created in userCartContext.js
    const { updateUserOrders } = useOrders(); // get the updateUserOrders function from custom hook created in userOrdersContext.js
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
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

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

    const saveUserDataToFirebase = async (user) => {
        const userDetailsRef = doc(collection(db, 'users', user.email, 'details'), user.uid);
        const userDetailsSnapshot = await getDoc(userDetailsRef);
        if (!userDetailsSnapshot.exists()) {
            await setDoc(userDetailsRef, {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                mobile: user.phoneNumber,
                createdOn: new Date(),
            }, { merge: true });
        };
    };

    const saveLocalCartToFirebase = async (user) => {
        const userCartRef = doc(collection(db, 'users', user.email, 'cart'), user.uid);
        const docSnapshot = await getDoc(userCartRef);
        const firebaseCartItems = docSnapshot.exists() ? docSnapshot.data().cart : [];
        const localCartItems = cartItems;
        localCartItems.forEach((localItem) => {
            const existingItemIndex = firebaseCartItems.findIndex((item) => item.title === localItem.title);
            if (existingItemIndex !== -1) {
                firebaseCartItems[existingItemIndex].quantity += localItem.quantity;
            } else {
                firebaseCartItems.push(localItem);
            }
        });
        await setDoc(userCartRef, { cart: [...firebaseCartItems] }); //Update the Firestore cart with mergedCartItems
        updateUserCart([...firebaseCartItems]); // Update the cart context with the mergedCartItems
        dispatch(resetCart());
    };

    const fetchOrdersFromFirebase = async (user) => {
        const OrdersRef = doc(collection(db, 'users', user.email, 'orders'), user.uid);
        const docSnapshot = await getDoc(OrdersRef);
        const firebaseOrders = docSnapshot.exists() ? docSnapshot.data().orders : [];
        updateUserOrders(firebaseOrders);
        dispatch(addToOrders(firebaseOrders));
    }

    const fetchCancelOrdersFromFirebase = async (user) => {
        const userCancelOrdersRef = doc(collection(db, 'users', user.email, 'cancelOrders'), user.uid);
        const docSnapshot = await getDoc(userCancelOrdersRef);
        const firebaseCancelOrders = docSnapshot.exists() ? docSnapshot.data().cancelOrders : [];
        dispatch(addTocancelOrders(firebaseCancelOrders));
    }

    const fetchReturnOrdersFromFirebase = async (user) => {
        const userReturnOrdersRef = doc(collection(db, 'users', user.email, 'returnOrders'), user.uid);
        const docSnapshot = await getDoc(userReturnOrdersRef);
        const firebaseReturnOrders = docSnapshot.exists() ? docSnapshot.data().returnOrders : [];
        dispatch(addToreturnOrders(firebaseReturnOrders));
    }

    const handleUser = (user) => {
        dispatch(setUserInfo({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL
        }));
        dispatch(setUserAuthentication(true));
        saveUserDataToFirebase(user);
        saveLocalCartToFirebase(user);
        fetchOrdersFromFirebase(user);
        fetchCancelOrdersFromFirebase(user);
        fetchReturnOrdersFromFirebase(user);
        setLoading(false);
        setSuccessMsg("Successfully Logged-in! Welcome back.");
        setTimeout(() => {
            navigate(-1);
        }, 2000);
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
                handleUser(user);
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
            });
        setInputValue("");
        setPasswordValue("");
    }

    const handleGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                handleUser(user);
            })
    }

    const handleFacebook = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                const user = result.user;
                user.emailVerified = true;
                handleUser(user);
            })
            .catch((error) => {
                // Check if the error is due to account linking
                if (error.code === "auth/account-exists-with-different-credential") {
                    const pendingCred = FacebookAuthProvider.credentialFromError(error);
                    const email = error.customData.email;
                    fetchSignInMethodsForEmail(auth, email)
                        .then((methods) => {
                            if (methods[0] === 'google.com') {
                                signInWithPopup(auth, googleProvider)
                                    .then((userCredential) => {
                                        const data = userCredential.user
                                        linkWithCredential(data, pendingCred)
                                            .then((result) => {
                                                const user = result.user;
                                                user.emailVerified = true;
                                                handleUser(user);
                                            });
                                    })
                            }
                            if (methods[0] === 'password') {
                                var password = prompt("Email associated with your Facebook has already account on Amazon. Please enter your Amazon password to link your Facebook account to your Amazon account."); // Replace with your custom password prompt logic.
                                signInWithEmailAndPassword(auth, email, password)
                                    .then((userCredential) => {
                                        const data = userCredential.user
                                        linkWithCredential(data, pendingCred)
                                            .then((result) => {
                                                const user = result.user;
                                                user.emailVerified = true;
                                                handleUser(user);
                                            });
                                    })
                            }
                        });
                };
            });
    }

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
                                : <div>
                                    <div onClick={handleGoogle} className=" cursor-pointer flex flex-row items-center my-3 border-[1px] p-[6px] border-black rounded-md hover:bg-slate-100 active:ring-2 active:ring-offset-1 active:ring-blue-600 active:border-transparent">
                                        <img src={google} alt="google" className="w-5 h-5 mx-5" />
                                        <p className="text-sm font-semibold">Continue with Google</p>
                                    </div>
                                    <div onClick={handleFacebook} className="cursor-pointer flex flex-row items-center  my-3 border-[1px] p-[6px] border-black rounded-md hover:bg-slate-100 active:ring-2 active:ring-offset-1 active:ring-blue-600 active:border-transparent">
                                        <img src={facebook} alt="facebook" className="w-5 mx-5 h-5" />
                                        <p className="text-sm font-semibold">Continue with Facebook</p>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <div className="w-[45%]"><hr /></div>
                                        <p className="text-sm font-semibold">Or</p>
                                        <div className="w-[45%]"><hr /></div>
                                    </div>
                                    <form className='mt-2 mb-3' onSubmit={handleSubmit}>
                                        <label className='text-sm font-semibold'>
                                            Email address
                                            <input type="text" autoComplete="true" value={inputValue} onChange={(e) => {
                                                setInputValue(e.target.value.toString().toLowerCase());
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
                                            <input type="password" autoComplete="true" value={passwordValue} onChange={(e) => {
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
                                </div>
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
        </div>
    )
};

export default SignIn;
