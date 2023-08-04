import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ScrollRestoration, useLoaderData,Link } from 'react-router-dom';
import { star, halfStar, emptyStar, offers, delivery, cod, exchange, delivered, transaction } from "../../assets/index";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/amazonSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();

  const data = useLoaderData();
  const productsData = data.data.products; //when productDetails open from products use this data

  const { title } = useParams();

  const product = productsData.find((product) =>
    product.title === title);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Automatically change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setSelectedQuantity(newQuantity);
  };

  const [cartButton, setCartButton] = useState(false);

  if (!product) {
    return <h1>Details of this product available in its category page. please go back to this product's category page then select this product to see its details.</h1>
  }
  return (
    <div className='flex bg-white justify-between'>
      <ScrollRestoration />
      <div className='w-[5%] mt-10 ml-1'>
        {product.images.map((item, index) => (
          <div key={index} className='border-[1px] border-black rounded-lg mb-5'
            onClick={() => handleImageClick(index)}>
            <img src={item} alt="allImages" className='rounded-lg' />
          </div>
        ))}
      </div>

      <div className='w-[38%] mt-4 '><img src={product.images[currentImageIndex]} className='w-full h-[85%]' alt="productImage" /></div>

      <div className='w-[35%] mt-2 ' >
        <h1 className='text-[26px] font-bold'>{product.title}</h1>
        <p className='text-blue-500 capitalize '>Brand : {product.brand}</p>
        <div className='flex border-b-[1px] border-gray-200 pb-1'>
          <span>{product.rating}&nbsp;</span>
          <span className='flex items-center '>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <img
                key={starIndex}
                className='w-4 h-4'
                src={starIndex <= product.rating ? star : (starIndex - 0.5 <= product.rating ? halfStar : emptyStar)}
                alt={`star-${starIndex}`}
              />
            ))}
          </span>
          <span className='text-blue-500 ml-10'>{product.stock} ratings</span>
        </div>
        <div className='border-b-[1px] border-gray-200 pb-2'>
          <div className='flex items-center mt-1'>
            <p className='font-medium mb-1'>&nbsp;₹&nbsp;</p>
            <span className='text-[26px] font-medium'>{product.price}</span>
            <span>&nbsp;({product.discountPercentage}% Off)</span>
          </div>
          <p>No Cost EMI available</p>
        </div>
        <div className='border-b-[1px] border-border-gray-200 pb-4'>
          <div className='flex pt-3 pb-2'>
            <img className="w-7 h-7" src={offers} alt="offers" />
            <span className='ml-5 font-semibold text-lg' >Offers</span>
          </div>
          <div className='flex justify-between'>
            <div className='w-[30%] border-2 border-gray-200 rounded-lg p-2'>
              <p className='font-bold '>No Cost EMI</p>
              <p>EMI interest savings on Amazon Pay ICICI…</p>
            </div>
            <div className='w-[30%] border-2 border-gray-200 rounded-lg p-2'>
              <p className='font-bold '>Bank Offers</p>
              <p>Upto ₹1,750.00 discount on select Credit Cards, HDFC…</p>
            </div>
            <div className='w-[30%] border-2 border-gray-200 rounded-lg p-2'>
              <p className='font-bold '>Partner Offers</p>
              <p>Get GST invoice and save up to 28% on business purchases.</p>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-between border-b-[1px] border-border-gray-200  pt-4 pb-2'>
          <div className='w-[18%] flex flex-col  items-center '>
            <img src={delivery} alt="delivery" className='w-9 h-9' />
            <p className='text-blue-500 text-xs'>Free Delivery</p>
          </div>
          <div className='w-[18%] flex flex-col  items-center '>
            <img src={cod} alt="cod" className='w-9 h-9' />
            <p className='text-blue-500 text-xs'>Pay on Delivery</p>
          </div>
          <div className='w-[18%] flex flex-col  items-center '>
            <img src={exchange} alt="exchange" className='w-9 h-9' />
            <p className='text-blue-500 text-xs text-center'>7 days Replacement</p>
          </div>
          <div className='w-[18%] flex flex-col  items-center justify-center '>
            <img src={delivered} alt="delivered" className='w-9 h-9' />
            <span className='text-blue-500 text-xs'>Amazon Delivered</span>
          </div>
          <div className='w-[18%] flex flex-col  items-center '>
            <img src={transaction} alt="transaction" className='w-9 h-9' />
            <p className='text-blue-500 text-xs'>Secure transaction</p>
          </div>
        </div>
        <div className='pt-2'>
          <span className='font-bold'>About this item</span>
          <div className='ml-2'>{product.description}</div>
        </div>
      </div>

      <div className='w-[20%] h-[430px] border-[0.066rem] border-gray-200 rounded-lg p-5 mt-2 mr-1'>
        <div className='flex items-center mt-1'>
          <span className='text-[26px] font-medium text-red-600'>₹&nbsp;{product.price}</span>
          <span>&nbsp;({product.discountPercentage}% Off)</span>
        </div>
        <span className='text-blue-500'>Delivery&nbsp;</span><span>within Two Days.</span>
        <p className='text-green-600 text-xl font-bold pt-4'>In stock.</p>
        <p className='pt-3'>Sold by <span className='text-blue-500 capitalize '>{product.brand}</span> and <span className='text-blue-500'>Fulfilled by Amazon.</span></p>
        <div className='pt-3'>
          <span>Quantity: </span>
          <select className='border-[1px] border-gray-200 rounded-md ' value={selectedQuantity} onChange={handleQuantityChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        {cartButton
          ? <Link to="/cart">
            <button className={`pt-2 w-full text-center text-blue-600 rounded-2xl  bg-gray-100 border-gray-200 p-[4px] mt-3 active:ring-2     active:ring-offset-1 active:ring-blue-600`}>
                Go to Cart
              </button>
            </Link>
          : <button
            onClick={() => {dispatch(addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              description: product.description,
              category: product.category,
              images: product.images,
              thumbnail: product.thumbnail,
              brand: product.brand,
              quantity: selectedQuantity,
              discountPercentage: product.discountPercentage,
              rating: product.rating,
              stock: product.stock
            }));
            setCartButton(true);
          }}
            className={`pt-2 w-full text-center rounded-2xl bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
            Add to Cart
          </button>}
        <button
          className={`pt-2 w-full text-center rounded-2xl bg-orange-400 hover:bg-orange-500 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
          Buy Now
        </button>
        <p className='text-blue-500 pt-3'>Secure transaction</p>
        <button
          className={`pb-2  w-full text-center rounded-md bg-gray-100 hover:bg-gray-200 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}>
          Add to Wish List
        </button>
      </div>
    </div>
  )
}

export default ProductDetails;
