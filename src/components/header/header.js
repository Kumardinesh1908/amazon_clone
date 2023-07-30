import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { logo, location, shopping, required } from "../../assets";
import { allItems } from "../../constants";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';



export default function Header() {

    const products = useSelector((state)=>state.amazon.products);
    console.log(products);

    const allCategoryRef = useRef(null);
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (allCategoryRef.current && !allCategoryRef.current.contains(e.target)) {
                setShowAll(false);
            }
        })
    }, [allCategoryRef, showAll]);

    const [selectedLocation, setSelectedLocation] = useState(false);
    const locationRef = useRef(null);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(locationRef.current)) {
                setSelectedLocation(false);
                setWarning(false);
            };
        })
    }, [locationRef])


    const [userZipCode, setUserZipCode] = useState('');
    const [locationData, setLocationData] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [warning, setWarning] = useState(false);
    async function fetchLocationData() {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${userZipCode}`);
        if (response.data[0].PostOffice != null) {
            setLocationData(response.data);
            setWarning(false);
        } 
    }
    const handleApply = () => {
        if (locationData) {
            setSelectedLocation(false);
            setLocationName(locationData);
            setLocationData(null)
            setWarning(false);
        } else {
            setWarning(true);
        }
    };
    const handleSumit = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleApply();
        }
    };
    useEffect(() => {
        if (userZipCode.length === 6) {
            fetchLocationData();
        }
    }, [userZipCode]);


    return (
        <div className="w-full sticky top-0 z-50">
            <div className="w-full bg-amazon_black text-white px-3 py-[6px] flex items-center">

                {/* logo starts here */}
                <Link to="/">
                    <div className="headerHover">
                        <img className="w-24 mt-2" src={logo} alt="logo" />
                    </div>
                </Link>
                {/* logo ends here */}

                {/* Delivery starts here */}
                <div className="headerHover" onClick={() => setSelectedLocation(!selectedLocation)}>
                    <img className="w-6 h-5 mt-1" src={location} alt="locationIcon" />
                    <p className="text-xs text-lightText font-medium flex flex-col items-start">
                        {locationName ? 'Deliver to' : 'Hello'}
                        <span className="text-sm font-bold -mt-1 text-whiteText">
                            {locationName ? <p>{locationName[0].PostOffice[0].District} {locationName[0].PostOffice[0].Pincode}</p> : 'Select your address'}
                        </span>
                    </p>
                </div>
                {selectedLocation &&
                    <div className='w-screen h-screen text-black fixed z-50 top-0 left-0  bg-amazon_black bg-opacity-50 flex items-center justify-center' >
                        <div ref={locationRef} className=" w-[320px] bg-white rounded-lg">
                            <div className="w-full h-[30%] rounded-tr-lg rounded-tl-lg  bg-gray-100 border-b-[0.066rem] border-gray-200 p-4 font-bold">
                                Choose your location
                            </div>
                            <div className="w-full h-[70%] p-4" >
                                <p className="text-xs text-gray-400">Enter an Indian pincode to see product availability and delivery options for your location.</p>
                                <div className="flex justify-center" >
                                    <input type="text" pattern="[0-9]{6}" placeholder="Enter a 6-digit ZIP code" className="w-[65%] mt-5 border-[1px] border-[#a6a6a6] rounded p-1 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500"
                                        onChange={(e) => setUserZipCode(e.target.value)}
                                        onKeyDown={handleSumit}
                                    />
                                    <button className="w-[33%] border-[0.066rem] mt-5 border-gray-200 rounded-lg p-2 ml-2 cursor-pointer"
                                        onClick={() => { fetchLocationData(); handleApply(); }}>Apply</button>
                                </div>
                            </div>
                            {
                                warning && <div className="flex  items-center pl-4 -mt-3 pb-2">
                                    <img src={required} className="w-4 h-4" alt="warning" />
                                    <div className="text-zsm text-[#FF0000]">Please enter a valid pincode</div>
                                </div>
                            }
                        </div>
                    </div>
                }
                {/* Delivery ends here */}

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
                                className="absolute top-8 left-0 w-48 h-96 ml-[1px] text-black bg-white 
                                border-[1px] border-gray-400 overflow-y-scroll overflow-x-hidden  flex-col 
                                z-50">
                                {
                                    allItems.map((item) => (
                                        <li className="hover:bg-blue-500 hover:text-white pl-1 text-[#0f1111] text-sm flex flex-col items-start cursor-pointer"
                                            key={item._id}>{item.title}</li>
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
                <Link to="/signIn" preventScrollReset={true}>
                    <div className="headerHover flex flex-col items-start justify-center">
                        <p className="text-xs font-semibold">Hello, sign in</p>
                        <p className="text-sm font-bold -mt-1">Accounts & Lists
                            <span>
                                <ArrowDropDownIcon />
                            </span>
                        </p>
                    </div>
                </Link>
                {/* Sign in ends here */}

                {/* Orders starts here */}
                <div className="headerHover flex flex-col items-start justify-center">
                    <p className="text-xs font-semibold">Returns</p>
                    <p className="text-sm font-bold -mt-1">& Orders</p>
                </div>
                {/* Orders ends here */}

                {/* Cart starts here */}
                <div className="headerHover flex items-start justify-center relative">
                    <img className="w-12" src={shopping} alt="cart" />
                    <p className="text-sm font-bold mt-5">Cart
                        <span className="text-base font-semibold p-2 h-6 bg-[#f3a847] text-amazon_black rounded-full absolute left-9 top-0 flex items-center justify-center" >
                            {products.length > 0 ? products.length : 0}
                        </span>
                    </p>

                </div>
                {/* Cart ends here */}

            </div>

        </div>
    );
};