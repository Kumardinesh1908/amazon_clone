import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useLoaderData } from 'react-router-dom';
import { star } from "../../assets/index";
import Product from './Product';


const Products = () => {
  const data = useLoaderData();
  const productsData = data.data.products;  // getting array of available products
  const uniqueCategories = Array.from(new Set(productsData.map(product => product.category)));

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [priceRange, setPriceRange] = useState(""); // State for the selected price range
  const [starRange, setStarRange] = useState(""); // State for the selected star range
  const [selectedCategory, setSelectedCategory] = useState(""); // State for the selected category

  const handleCategoryFilter = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    // Combine all active filters
    const activeCategoryFilter = selectedCategory;
    const activePriceRange = priceRange;
    const activeStarRange = starRange;
    // Apply all filters simultaneously
    const filteredProducts = productsData.filter(product => {
      const productCategory = product.category.toLowerCase();
      const productPrice = parseFloat(product.price);
      const productRating = parseFloat(product.rating);
      // Check if the product matches the selected category, price range, and star range
      const categoryFilterMatch = activeCategoryFilter === "" || productCategory === activeCategoryFilter.toLowerCase();
      const priceFilterMatch = !activePriceRange || (productPrice >= parseFloat(activePriceRange.split(" - ")[0].replace(/,/g, ""), 10) &&
        productPrice <= parseFloat(activePriceRange.split(" - ")[1].replace(/,/g, ""), 10));
      const starFilterMatch = !activeStarRange || productRating >= parseFloat(activeStarRange);
      return categoryFilterMatch && priceFilterMatch && starFilterMatch;
    });
    // Set the filtered products
    setFilteredProducts(selectedCategory === "" ? productsData : filteredProducts);
  };


  const handleStarFilter = (selectedRange) => {
    // Determine the array to use for filtering based on the presence of priceRange
    const productsToFilter = priceRange ? filteredProducts : productsData;
    // Apply the star filter
    const starFilteredProducts = productsToFilter.filter(
      product => parseFloat(product.rating) >= selectedRange
    );
    // Update the state based on the presence of priceRange
    if (starRange === selectedRange) {
      setStarRange("");
      if (priceRange) {
        const priceFilteredProducts = productsData.filter(
          product => {
            const productPrice = parseFloat(product.price);
            return productPrice >= parseFloat(priceRange.split(" - ")[0].replace(/,/g, ""), 10) && productPrice <= parseFloat(priceRange.split(" - ")[1].replace(/,/g, ""), 10);
          }
        );
        setFilteredProducts(priceFilteredProducts);
      } else {
        setFilteredProducts(productsData); // Reset the filtered products to show all products
      }
    }
    else {
      setStarRange(selectedRange);
      setFilteredProducts(starFilteredProducts);
    }
  };


  const handlePriceFilter = (selectedRange) => {
    const productsToFilter = starRange ? filteredProducts : productsData;
    if (selectedRange === priceRange) {
      // If the same range is selected again, clear the filter
      setPriceRange("");
      // Reapply star filter if starRange is not empty
      if (starRange) {
        const starFilteredProducts = productsData.filter(
          product => parseFloat(product.rating) >= parseFloat(starRange)
        );
        setFilteredProducts(starFilteredProducts);
      } else {
        setFilteredProducts(productsData); // Reset the filtered products to show all products
      }
    }
    else {
      const [minPrice, maxPrice] = selectedRange.split(" - ");
      const priceFilteredProducts = productsToFilter.filter(
        product => {
          const productPrice = parseFloat(product.price);
          return productPrice >= parseFloat(minPrice.replace(/,/g, ""), 10) && productPrice <= parseFloat(maxPrice.replace(/,/g, ""), 10);
        }
      );
      setPriceRange(selectedRange);
      setFilteredProducts(priceFilteredProducts);
    };
  };

  const [sortOrder, setSortOrder] = useState("default"); // "default", "lowToHigh", "highToLow"
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const applySorting = () => {
      if (sortOrder === "lowToHigh") {
        const sortedProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
        setSortedProducts(sortedProducts);
      } else if (sortOrder === "highToLow") {
        const sortedProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
        setSortedProducts(sortedProducts);
      } else if (sortOrder === "avgReview") {
        const sortedProducts = filteredProducts.slice().sort((a, b) => b.rating - a.rating);
        setSortedProducts(sortedProducts);
      } else {
        setSortedProducts([]); // Reset sortedProducts to empty array
        // Check if any filters are applied, and if not, show all products
        if (!priceRange && !starRange) {
          setFilteredProducts(productsData);
        }
      }
    };
    applySorting();
  }, [sortOrder, filteredProducts, priceRange, starRange, productsData]);

  const handleSortingChange = (e) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);
  };

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
          <div className={`font-medium mb-[1px] cursor-pointer ${selectedCategory === "" ? "text-blue-500" : ""}`}
            onClick={() => handleCategoryFilter("")}
          >
            All
          </div>
          {uniqueCategories.map((category) => (
            <div key={category} className={`font-medium mb-[1px] cursor-pointer capitalize ${selectedCategory === category ? "text-blue-500" : ""}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
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
          <h1>Total : {filteredProducts.length}</h1>
        </div>
        <div className='w-full flex flex-wrap justify-evenly '>

          <Product productsData={sortedProducts.length > 0 ? sortedProducts : filteredProducts} />

        </div>
      </div>

      <ScrollRestoration />
    </div>
  )
}

export default Products;
