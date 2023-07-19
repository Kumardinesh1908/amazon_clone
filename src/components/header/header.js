import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { logo, location, shopping } from "../../assets";
import { allItems } from "../../constants";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';


export default function Header() {
    const ref = useRef(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowAll(false);
            }
        })
    }, [ref, showAll]);
    return (
        <div className="w-full sticky top-0 z-50">
            <div className="w-full bg-amazon_black text-white px-3 py-[6px] flex items-center">

                {/* logo starts here */}
                <div className="headerHover">
                    <img className="w-24 mt-2" src={logo} alt="logo" />
                </div>
                {/* logo ends here */}

                {/* Delivery starts here */}
                <div className="headerHover">
                    <img className="w-6 h-5 mt-1" src={location} alt="locationIcon" />
                    <p className="text-xs text-lightText font-medium flex flex-col items-start">
                        Hello {" "}
                        <span className="text-sm font-bold -mt-1 text-whiteText">Select your address</span>
                    </p>
                </div>
                {/* Delivery ends here */}

                {/* Search starts here */}
                <div className="h-10 rounded-md flex flex-grow relative ml-4" ref={ref}>
                    <span onClick={() => setShowAll(!showAll)}
                        className="w-14 pl-2 h-full flex items-center justify-center text-xs text-amazon_black
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
                <div className="headerHover flex flex-col items-start justify-center">
                    <p className="text-xs font-semibold">Hello, sign in</p>
                    <p className="text-sm font-bold -mt-1">Accounts & Lists
                        <span>
                            <ArrowDropDownIcon />
                        </span>
                    </p>
                </div>
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
                        <span className="text-base font-semibold p-2 h-6 bg-[#f3a847] text-amazon_black rounded-full absolute left-9 top-0 flex items-center justify-center" >0</span>
                    </p>

                </div>
                {/* Cart ends here */}

            </div>

        </div>
    );
};