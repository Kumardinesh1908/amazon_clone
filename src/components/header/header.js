import React, { useEffect, useState } from "react";
import { logo, shopping } from "../../assets";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { userSignOut, setUserAuthentication, resetOrders, resetCancelOrders, resetReturnOrders } from "../../redux/amazonSlice";
import { useCart } from "../../context/userCartContext";
import Location from "./location";
import Search from "./search";


export default function Header() {

    // Initialize Firebase authentication
    const auth = getAuth();

    const dispatch = useDispatch();
    const localCartProducts = useSelector((state) => state.amazon.localCartProducts);
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);

    // Access cart total quantity from the context
    const { cartTotalQty } = useCart();

    const [totalQty, setTotalQty] = useState(0);
    // Calculate total quantity of localCartProducts in the cart
    useEffect(() => {
        let allQty = 0;
        localCartProducts.forEach((product) => {
            allQty += product.quantity;
        });
        setTotalQty(allQty);
    }, [localCartProducts]);


    // Handle user logout
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(userSignOut());
            dispatch(setUserAuthentication(false));
            dispatch(resetOrders());
            dispatch(resetCancelOrders());
            dispatch(resetReturnOrders());
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="w-full sticky top-0 z-50">
            <div className="w-full bg-amazon_black text-white px-3 py-[8px] flex items-center">

                {/* logo starts here */}
                <Link to="/">
                    <div className="headerHover">
                        <img className="w-24 mt-2" src={logo} alt="logo" />
                    </div>
                </Link>
                {/* logo ends here */}

                {/* DeliveryLocation starts here */}
                <Location />
                {/* DeliveryLocation ends here */}

                {/* Search starts here */}
                <Search />
                {/* Search ends here */}

                {/* Language starts here */}
                <div className="headerHover ml-4">
                    <img className="w-6 " src="https://cdn-icons-png.flaticon.com/128/6211/6211446.png" alt="india" />
                    <p className="text-sm font-bold ml-[2px]">EN</p>
                </div>
                {/* Language ends here */}

                {/* Sign in starts here */}
                {
                    userInfo
                        ? <div className="headerHover flex flex-col items-start justify-center">
                            <p className="text-sm font-semibold">Hello, {userInfo.name}</p>
                            <p className="text-sm font-bold -mt-1">Accounts & Lists
                                <span>
                                    <ArrowDropDownIcon />
                                </span>
                            </p>
                        </div>
                        : <Link to="/signIn">
                            <div className="headerHover flex flex-col items-start justify-center">
                                <p className="text-xs font-semibold">Hello, sign in</p>
                                <p className="text-sm font-bold -mt-1">Accounts & Lists
                                    <span>
                                        <ArrowDropDownIcon />
                                    </span>
                                </p>
                            </div>
                        </Link>
                }

                {/* Sign in ends here */}

                {/* Orders starts here */}
                {
                    authenticated
                        ? <Link to="/orders">
                            <div className="headerHover flex flex-col items-start justify-center">
                                <p className="text-xs font-semibold">Returns</p>
                                <p className="text-sm font-bold -mt-1">& Orders</p>
                            </div>
                        </Link>
                        : <Link to="/signIn">
                            <div className="headerHover flex flex-col items-start justify-center">
                                <p className="text-xs font-semibold">Returns</p>
                                <p className="text-sm font-bold -mt-1">& Orders</p>
                            </div>
                        </Link>
                }
                {/* Orders ends here */}

                {/* Cart starts here */}
                <Link to="/cart">
                    <div className="headerHover flex items-start justify-center relative">
                        <img className="w-12" src={shopping} alt="cart" />
                        <p className="text-sm font-bold mt-5">Cart
                            <span className="text-base font-semibold p-2 h-6 bg-[#f3a847] text-amazon_black rounded-full absolute left-9 top-0 flex items-center justify-center" >
                                {cartTotalQty > 0 ? cartTotalQty : totalQty}
                            </span>
                        </p>
                    </div>
                </Link>
                {/* Cart ends here */}

                {/* Logout starts here */}
                {
                    userInfo && (
                        <div onClick={handleLogout} className="headerHover flex flex-col justify-center items-center relative">
                            <LogoutIcon />
                            <p className="hidden mdl:inline-flex text-sm font-bold">Logout</p>
                        </div>
                    )
                }
                {/* Logout ends here */}
            </div>
        </div>
    );
};