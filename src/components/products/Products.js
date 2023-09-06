import React, { useState } from 'react';
import { ScrollRestoration, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { star } from "../../assets/index";
import Product from './Product';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Products = () => {
  const navigate = useNavigate();

  // Function to handle the category filter
  const handleCategoryClick = (category) => {
    navigate(`/${category}`); // Navigate to the products page with the selected category as a URL parameter
  };

  const allProducts = useSelector((state) => state.amazon.allProducts);  // Get the allProducts from Redux store
  const productsData = allProducts.products;
  console.log(productsData);

  // const data = useLoaderData();
  // const productsData = data.data.products;  // getting array of available products

  const { category } = useParams(); // Get the category parameter from the URL
  // Filter products based on the selected category
  const categoryProducts = category ? productsData.filter((product) => product.category === category): productsData;

  const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));

  const [priceRange, setPriceRange] = useState(""); // State for the selected price range
  const [starRange, setStarRange] = useState(""); // State for the selected star range
  const [sortOrder, setSortOrder] = useState("default"); // "default", "lowToHigh", "highToLow", "avgReview"


  // Function to handle the price range filter
  const handlePriceFilter = (selectedRange) => {
    if (priceRange === selectedRange) {
      // Clicking on the same range again, unselect
      setPriceRange("");
    } else {
      setPriceRange(selectedRange);
    }
  };

  // Filter products based on the selected price range
  const priceFilteredProducts = priceRange
    ? categoryProducts.filter(product => {
      const [min, max] = priceRange.split(" - ").map(str => parseFloat(str.replace(/[^0-9.-]+/g, "")));
      return product.price >= min && product.price <= max;
    })
    : categoryProducts;

  // Function to handle the star rating filter
  const handleStarFilter = (selectedRating) => {
    if (starRange === selectedRating) {
      // Clicking on the same rating again, unselect
      setStarRange("");
    } else {
      setStarRange(selectedRating);
    }
  };

  // Filter products based on the selected star rating
  const starFilteredProducts = starRange
    ? priceFilteredProducts.filter(product => product.rating >= parseFloat(starRange))
    : priceFilteredProducts;

  // Function to handle the sorting change
  const handleSortingChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Sorting logic
  let sortedProducts = [...starFilteredProducts];
  if (sortOrder === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "avgReview") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className='w-full relative my-6 flex flex-row bg-white'>
      <div className='w-[18%]  bg-white border-r-2 '>

        <div className='px-5 py-[10px]'>
          <p className='text-[18px] underline font-bold mb-1'>Price</p>
          <p className={`font-medium mb-[1px] cursor-pointer ${priceRange === "0 - 10" ? "text-blue-500" : ""}`}
            onClick={() => handlePriceFilter("0 - 10")}
          > Under ₹10
          </p>
          <p className={`font-medium mb-[1px] cursor-pointer ${priceRange === "10 - 100" ? "text-blue-500" : ""}`}
            onClick={() => handlePriceFilter("10 - 100")}
          >₹10 - ₹100
          </p>
          <p className={`font-medium mb-[1px] cursor-pointer ${priceRange === "100 - 500" ? "text-blue-500" : ""}`}
            onClick={() => handlePriceFilter("100 - 500")}
          >₹100 - ₹500
          </p>
          <p className={`font-medium mb-[1px] cursor-pointer ${priceRange === "500 - 1,000" ? "text-blue-500" : ""}`}
            onClick={() => handlePriceFilter("500 - 1,000")}
          >₹500 - ₹1,000
          </p>
          <p className={`font-medium mb-[1px] cursor-pointer ${priceRange === "1,000 - 100,000,000" ? "text-blue-500" : ""}`}
            onClick={() => handlePriceFilter("1,000 - 100,000,000")}>
            Over ₹1,000
          </p>
        </div>

        <div className='px-5 py-[10px]'>
          <p className='text-[18px] underline font-bold mb-1'>Avg. Customer Review</p>
          <div className={`flex items-center font-medium mt-2 mb-1 cursor-pointer ${starRange === "4.5" ? "text-blue-500" : ""}`}
            onClick={() => handleStarFilter("4.5")}>
            <p>4.5&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className={`flex items-center font-medium mt-2 mb-1 cursor-pointer ${starRange === "4" ? "text-blue-500" : ""}`}
            onClick={() => handleStarFilter("4")}>
            <p>4&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className={`flex items-center font-medium mt-2 mb-1 cursor-pointer ${starRange === "3" ? "text-blue-500" : ""}`}
            onClick={() => handleStarFilter("3")}>
            <p>3&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className={`flex items-center font-medium mt-2 mb-1 cursor-pointer ${starRange === "2" ? "text-blue-500" : ""}`}
            onClick={() => handleStarFilter("2")}>
            <p>2&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
          <div className={`flex items-center font-medium mt-2 mb-1 cursor-pointer ${starRange === "1" ? "text-blue-500" : ""}`}
            onClick={() => handleStarFilter("1")}>
            <p>1&nbsp; </p><img src={star} alt="star" className='w-4 h-4' /> <p>&nbsp;and Up</p>
          </div>
        </div>

        <div className='px-5 py-[10px] '>
          <p className='text-[18px] underline font-bold mb-1'>Category</p>
          <Link to="/allProducts">
            <div className={`font-medium mb-[1px] cursor-pointer ${!category ? "text-blue-500" : ""}`}>
              All
            </div>
          </Link>
          {uniqueCategories.map((item) => (
            <div key={item} className={`font-medium mb-[1px] cursor-pointer capitalize ${category === item ? "text-blue-500" : ""}`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className='w-[82%] bg-white'>
        <div className=' flex items-center justify-between mx-7 mt-2 text-[18px] font-bold'>
          <h1>Results </h1>
          <select onChange={handleSortingChange} value={sortOrder}>
            <option value="default">Default Sorting</option>
            <option value="lowToHigh">Price : Low to High</option>
            <option value="highToLow">Price : High to Low</option>
            <option value="avgReview">Avg. Customer Review</option>
          </select>
          <h1>Total : {sortedProducts.length}</h1>
        </div>
        <div className='w-full flex flex-wrap justify-evenly '>
          <Product productsData={sortedProducts} />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  )
}
export default Products;