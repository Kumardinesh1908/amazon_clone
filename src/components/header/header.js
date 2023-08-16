import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { logo, shopping } from "../../assets";
import { allItems } from "../../constants";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { userSignOut, setUserAuthentication } from "../../redux/amazonSlice";
import { useCart } from "../../context/userCartContext";
import Location from "./location";
import { useLoaderData, useNavigate } from "react-router-dom";


export default function Header() {

    // Initialize Firebase authentication
    const auth = getAuth();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.amazon.products);
    const userInfo = useSelector((state) => state.amazon.userInfo);
    const authenticated = useSelector((state) => state.amazon.isAuthenticated);

    // Access cart total quantity from the context
    const { cartTotalQty } = useCart();

    // Ref for the "All Categories" dropdown
    const allCategoryRef = useRef(null);

    // Effect to close the "All Categories" dropdown when clicking outside
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (allCategoryRef.current && !allCategoryRef.current.contains(e.target)) {
                setShowAll(false);
            }
        })
    }, [allCategoryRef, showAll]);


    const [totalQty, setTotalQty] = useState(0);
    // Calculate total quantity of products in the cart
    useEffect(() => {
        let allQty = 0;
        products.forEach((product) => {
            allQty += product.quantity;
        });
        setTotalQty(allQty);
    }, [products]);

    const data = useLoaderData();
    const productsData = data.data.products;  // getting array of available products
    const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
    const navigate = useNavigate();

    // Function to handle click event when a category is selected
    const handleCategoryClick = (category) => {
        navigate(`/${category}`); // Navigate to the products page with the selected category as a URL parameter
        setShowAll(false);
    };


    // Handle user logout
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(userSignOut());
            dispatch(setUserAuthentication(false));
        }).catch((error) => {
            // An error happened.
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
                <div className="h-10 rounded-md flex flex-grow relative ml-4" ref={allCategoryRef}>
                    <span onClick={() => setShowAll(!showAll)}
                        className="w-14 pl-2 h-full flex items-center justify-center text-xs text-amazon_black cursor-pointer
                      bg-gray-100 hover:bg-gray-300 rounded-tl-md rounded-bl-md duration-300 border-r-[1px] border-gray-300">All
                        <span>
                            <ArrowDropDownIcon />
                        </span>
                    </span>
                    {showAll && (
                        <div>
                            <ul
                                className="absolute top-8 left-0 w-48 h-80 ml-[1px] text-black bg-white 
                                border-[1px] border-gray-400 overflow-y-scroll overflow-x-hidden  flex-col 
                                z-50">
                                {
                                    uniqueCategories.map((category, index) => (
                                        <li className="hover:bg-blue-500 hover:text-white pl-1 text-[#0f1111] text-sm flex flex-col items-start cursor-pointer capitalize" onClick={() => handleCategoryClick(category)}
                                            key={index}>{category}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    )}
                    <input onClick={() => setShowAll(false)}
                        className="h-full text-base text-amazon_black flex-grow  px-2 border-none outline-none   placeholder:text-[#817e7e] font-[400]"
                        type="text" placeholder="Search Amazon.in"
                    />
                    <span onClick={() => setShowAll(false)}
                        className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] text-amazon_black cursor-pointer rounded-tr-md rounded-br-md duration-300">
                        <SearchIcon />
                    </span>
                </div>
                {/* Search ends here */}

                {/* Language starts here */}
                <div className="headerHover ml-4">
                    <img className="w-6 " src="https://cdn-icons-png.flaticon.com/128/6211/6211446.png" alt="india" />
                    <p className="text-sm font-bold ml-[2px]">EN</p>
                </div>
                {/* Language ends here */}

                {/* Sign in starts here */}
                <Link to="/signIn">
                    <div className="headerHover flex flex-col items-start justify-center">
                        {
                            userInfo
                                ? <p className="text-sm font-semibold">Hello, {userInfo.name}</p>
                                : <p className="text-xs font-semibold">Hello, sign in</p>
                        }
                        <p className="text-sm font-bold -mt-1">Accounts & Lists
                            <span>
                                <ArrowDropDownIcon />
                            </span>
                        </p>
                    </div>
                </Link>
                {/* Sign in ends here */}

                {/* Orders starts here */}
                {
                    authenticated
                        ? <div className="headerHover flex flex-col items-start justify-center">
                            <p className="text-xs font-semibold">Returns</p>
                            <p className="text-sm font-bold -mt-1">& Orders</p>
                        </div>
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