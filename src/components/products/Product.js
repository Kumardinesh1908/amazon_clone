import React from 'react';
import { Link } from 'react-router-dom';
import { star, halfStar, emptyStar, compare, cart, wishlist } from "../../assets/index";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/amazonSlice';
import { db } from '../../firebase/firebase.config';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { useCart } from '../../context/userCartContext';



const Product = (props) => {
  const { productsData } = props;

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const authenticated = useSelector((state) => state.amazon.isAuthenticated);

  // Get the userCart and updateUserCart function from the context
  const { userCart, updateUserCart } = useCart();

  // Function to save a product to Firebase cart
  const saveProductToFirsebase = async (product) => {
    const productWithDefaultQuantity = {
      ...product,
      quantity: 1,
    };
    const usersCollectionRef = collection(db, "users");
    const userRef = doc(usersCollectionRef, userInfo.email);
    const userCartRef = collection(userRef, "cart");
    const cartRef = doc(userCartRef, userInfo.id);
    try {
      const snap = await getDoc(cartRef);
      if (snap.exists()) {
        const cart = snap.data().cart || [];
        const existingProductIndex = cart.findIndex(
          (item) => item.title === product.title
        );
        if (existingProductIndex !== -1) {
          // If the product already exists in the cart, increase its quantity
          cart[existingProductIndex].quantity += 1;
        } else {
          // If the product is not in the cart, add it to the cart
          cart.push(productWithDefaultQuantity);
        }
        await setDoc(cartRef, { cart: cart }, { merge: true });
        // Update the user's cart in context to reflect the change
        updateUserCart(cart);
      }
      else {
        await setDoc(cartRef, { cart: [productWithDefaultQuantity] }, { merge: true });
        // Update the user's cart in context to reflect the change immeditely in our website
        updateUserCart([...userCart, productWithDefaultQuantity]);
      }
    } catch (error) {
      console.error('Error saving product to Firebase cart:', error);
    }
  }

  // Function to handle the Add to Cart button click
  const handleButton = async (product) => {
    // If user is not authenticated, add to Redux cart
    if (!authenticated) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        images: product.images,
        thumbnail: product.thumbnail,
        brand: product.brand,
        quantity: 1,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock
      }));
    } else {
      // If user is authenticated, save to Firebase cart
     await saveProductToFirsebase(product);
    }
  };

  return (
    // Map through productsData and render product
    productsData.map((product, index) => (
      <div className='w-[30%] my-5 rounded border-[1px] border-gray-200 shadow-none hover:shadow-testShadow duration-200' key={index}>
        <div className=" bg-gray-100 border-b-[1px] border-gray-200 flex justify-center items-center cursor-pointer relative group" >
          <Link to={`${product.title}`} >
            <img className="w-full h-72" src={product.thumbnail} alt="productImage" />
          </Link>
          <ul className='w-full h-32  bg-gray-100 flex flex-col items-end justify-center gap-2 px-2 absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity  duration-700'>
            <li className='productLi'>Compare <img src={compare} alt="compare" className='w-4 h-4' /></li>
            <li
              onClick={() => handleButton(product)}
              className='productLi'>Add to Cart <img src={cart} alt="cart" className='w-4 h-4' /></li>
            <li className='productLi '>Add to WishList <img src={wishlist} alt="wishlist" className='w-4 h-4' /></li>
          </ul>
        </div>
        <div className='p-2 '>
          <Link to={`${product.title}`} >
            <div>
              <p className="text-lg font-medium cursor-pointer">{product.title}</p>
            </div>
          </Link>
          <div className='my-3'>
            <p>{product.description.substring(0, 50)}...</p>
          </div>
          <div className='flex items-center '>
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <img
                key={starIndex}
                className='w-4 h-4'
                src={starIndex <= product.rating ? star : (starIndex - 0.5 <= product.rating ? halfStar : emptyStar)}
                alt={`star-${starIndex}`}
              />
            ))}
            <div className='ml-1 text-blue-500'>{product.rating}</div>
          </div>
          <div className='flex items-center mt-1'>
            <p className='font-medium mb-1'>&nbsp;₹&nbsp;</p>
            <span className='text-[26px] font-medium'>{product.price}</span>
            <span>&nbsp;({product.discountPercentage}% Off)</span>
          </div>
          <button
            onClick={() => handleButton(product)}
            className={`text-lg font-medium w-full text-center rounded-lg bg-yellow-300 hover:bg-yellow-400 p-[4px] mt-3 shadow active:ring-2 active:ring-offset-1 active:ring-blue-500`}
          >Add to Cart</button>
        </div>
      </div>
    ))
  )
}

export default Product;


