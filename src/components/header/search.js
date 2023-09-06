import React, { useEffect, useState } from "react";
import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useLoaderData, useNavigate } from "react-router-dom";


const Search = () => {

    const allCategoryRef = useRef(null);// Ref for the "All Categories" dropdown
    const searchRef = useRef(null);// Ref for the "All Categories" dropdown

    const [showSearch, setShowSearch] = useState(false);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        })
    }, [searchRef,showSearch]);
    
    // Effect to close the "All Categories" dropdown when clicking outside
    const [showAll, setShowAll] = useState(false);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (allCategoryRef.current && !allCategoryRef.current.contains(e.target)) {
                setShowAll(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        })
    }, [allCategoryRef, showAll,searchRef,showSearch]);

    const data = useLoaderData();
    const productsData = data.data.products;  // getting array of available products
    const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));
    const navigate = useNavigate();

    // Function to handle click event when a category is selected
    const handleCategoryClick = (category) => {
        navigate(`/${category}`); // Navigate to the products page with the selected category as a URL parameter
        setShowAll(false);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

    const fetchAutocompleteSuggestions = (input) => {
        const suggestions = productsData.filter(product =>
            product.title.toLowerCase().includes(input.toLowerCase())
        );
        return suggestions.map(product => product.title);
    }

    const updateAutocompleteSuggestions = (input) => {
        if (input.length > 0) {
            setShowSearch(true);
            const suggestions = fetchAutocompleteSuggestions(input);
            setAutocompleteSuggestions(suggestions);
        }
    };

    useEffect(() => {
        updateAutocompleteSuggestions(searchTerm);
    }, [searchTerm]);

    const handleSearch = () => {
        const selectedProduct = productsData.find(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (selectedProduct) {
            navigate(`/allProducts/${selectedProduct.title}`);
        }
    };

    return (
        <div className="h-10 rounded-md flex flex-grow relative ml-4" ref={allCategoryRef}>
            <span onClick={() => setShowAll(!showAll)}
                className="w-14 pl-2 h-full flex items-center justify-center text-xs text-amazon_black cursor-pointer
                      bg-gray-100 hover:bg-gray-300 rounded-tl-md rounded-bl-md duration-300 border-r-[1px] border-gray-300"
            >All
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
            <div className="flex flex-col w-full  ">
                <input onClick={() => { setShowAll(false); }} onChange={(e) => setSearchTerm(e.target.value)}
                    className=" text-base text-amazon_black flex-grow h-full px-2 border-none outline-none   placeholder:text-[#817e7e] font-[400] py-3"
                    type="text" placeholder="Search Amazon.in" value={searchTerm}
                />
                {showSearch && searchTerm && (
                    <div ref={searchRef}>
                        <ul
                            className="h-auto max-h-80 ml-[1px] text-black bg-white 
                        border-[1px] border-gray-400 custom-scrollbar overflow-y-hidden hover:overflow-y-scroll  flex-col 
                        z-50">
                            {
                                autocompleteSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="hover:bg-blue-500 hover:text-white p-2 text-[#0f1111] text-sm flex flex-col items-start cursor-pointer capitalize"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setShowSearch(false)
                                            navigate(`/allProducts/${suggestion}`);
                                            setAutocompleteSuggestions([]);
                                        }}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
            <span onClick={() => { handleSearch(); setShowAll(false); }}
                className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] text-amazon_black cursor-pointer rounded-tr-md rounded-br-md duration-300">
                <SearchIcon />
            </span>

        </div>
    )
}

export default Search;