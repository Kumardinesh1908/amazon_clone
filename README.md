
# Amazon Clone
The Amazon Clone is a feature-rich, fully functional e-commerce web application developed using cutting-edge technologies. It faithfully replicates the shopping experience found on the popular Amazon platform. This project leverages React, Tailwind CSS, Redux Toolkit, Firebase, Framer Motion, and other modern tools to create a seamless and user-friendly shopping environment.

## Features
- **Product Listings:** Explore a vast array of products with comprehensive details, including high-quality images, detailed descriptions, prices, and customer rating, making it easy to make informed choices.
- **Product Search:** Effortlessly find your desired items by using intuitive search functionality, allowing you to discover products via keywords, names, or even barcodes.
- **User Registration and Login:** Create a personalized shopping experience by registering an account, where you can save preferences, track orders, and access exclusive offers.
- **Add, Delete, and Edit Cart:** Seamlessly manage your shopping cart, allowing you to add, remove, or adjust the quantity of items as you shop, ensuring a hassle-free checkout process.
- **Filter based on Rating, Price, and Category:** Enhance your shopping efficiency by applying filters to refine search results, making it simple to find products that match your specific criteria.
- **Sort based on High, Low, and Rating:** Tailor your shopping experience by sorting products based on various parameters such as price (high to low or low to high) and customer ratings.
- **Order History, Cancel, and Return Order:** Keep track of your past orders, and if necessary, easily manage order cancellations and returns, ensuring a stress-free shopping journey..
- **Save Multiple Addresses:** Enjoy the convenience of saving multiple shipping addresses for different locations, such as home, work, or gift destinations.
- **Responsive Design:** Experience a user-friendly interface that adapts seamlessly to various devices, ensuring a consistent and visually pleasing shopping experience on smartphones, tablets, and computers.
- **Firebase Integration:** Harness the power of Firebase to store and retrieve data with Firestore, Firebase's real-time NoSQL database. Firebase Authentication ensures secure user registration and login.

## Technologies Used
- React
- Tailwind CSS
- Redux Toolkit
- Firebase
- Framer Motion
- Loading Spinner

## Folder Structure
```
amazon-clone/
├── node_modules/
├── public/
│   ├── index.html
│   └── ... (other public assets)
├── src/
│   ├── api/
│   │   └── api.js
│   ├── assets/
│   │   └── index.js
│   ├── components/
│   │   ├── cart/
│   │   │   ├── cart.js
│   │   │   ├── cartItems.js
│   │   │   ├── cartProduct.js
│   │   │   └── emptyCart.js
│   │   ├── checkout/
│   │   │   ├── addressForm.js
│   │   │   ├── cardDetails.js
│   │   │   ├── checkout.js
│   │   │   ├── OrderSummary.js
│   │   │   ├── PaymentMethods.js
│   │   │   └── userAddresses.js
│   │   ├── error/
│   │   │   └── error.js
│   │   ├── footer/
│   │   │   ├── footer.js
│   │   │   ├── footerTop.js
│   │   │   ├── footerMiddle.js
│   │   │   ├── footerMiddleList.js
│   │   │   └── footerBottom.js
│   │   ├── header/
│   │   │   ├── header.js
│   │   │   ├── headerBottom.js
│   │   │   ├── location.js
│   │   │   ├── search.js
│   │   │   └── sideNavContent.js
│   │   ├── home/
│   │   │   ├── Category.js
│   │   │   ├── Home.js
│   │   │   ├── ProductsSlider.js
│   │   │   ├── scrollBar.css
│   │   │   └── slider.js
│   │   ├── login/
│   │   │   ├── createAccount.js
│   │   │   ├── forgotPassword.js
│   │   │   └── signIn.js
│   │   ├── orders/
│   │   │   ├── orderDetails.js
│   │   │   └── Orders.js
│   │   └── products/
│   │       ├── Product.js
│   │       ├── ProductDetails.js
│   │       └── Products.js
│   ├── constants/
│   │   └── index.js
│   ├── contexts/
│   │   ├── userAddressContext.js
│   │   ├── userCartContext.js
│   │   └── userAddressContext.js
│   ├── firebase/
│   │   └── firebase.config.js
│   ├── redux/
│   │   ├── amazonSlice.js
│   │   └── store.js
│   ├── app.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
└── README.md
```

## Installation
1. Clone this repository: `git clone https://github.com/kumardinesh1908/amazon-clone.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage
1. Visit the live demo or run the app locally.
2. Browse products, add items to your cart, and proceed to checkout.
3. Sign in or create an account for a personalized experience.
4. Enjoy a smooth and intuitive shopping experience!

## Demo
Check out the live demo (https://amazon-clone-kumardinesh1908.vercel.app).
