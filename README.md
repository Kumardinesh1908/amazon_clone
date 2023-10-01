# Amazon Clone :tv:
The Amazon Clone is a feature-rich, fully functional e-commerce web application developed using React,  Redux Toolkit, Firebase,Tailwind CSS, Framer Motion, and other modern tools to create a seamless and user-friendly shopping environment. It faithfully replicates the shopping experience found on the popular Amazon platform.</br>
</br>
<img src="/screenshots/amazon homepage.png">
</br>
## Features :fire:
:tv:  Product Listings, Product Search and Product Details.</br>
:tv:  Filter based on Rating, Price and Category.</br>
:tv:  Sort based on High Price, Low Price and Rating.</br>
</br>
<img src="/screenshots/Filter page.png"></br>
</br>
:tv:  Add to cart and Buy Now.</br>
</br>
<img src="/screenshots/details page.png"></br>
</br>
:tv:  Cart Page with Quantity increase/decrease, Delete Product and Clear Cart.</br>
</br>
<img src="/screenshots/cart page.png"></br>
</br>
:tv:  User Registration and Login.</br>
</br>
<img src="/screenshots/login page.png"></br>
</br>
:tv:  Save Multiple Addresses.</br>
</br>
<img src="/screenshots/address page.png"></br>
</br>
:tv:  Order History, Cancel and Return Order.</br>
</br>
<img src="/screenshots/orders page.png"></br>
</br>

## Tech Stack :computer:
:bulb: **Front-end** React, Redux Toolkit, Tailwind-CSS, Framer Motion, Loading Spinner</br>
:bulb: **Back-end** Firebase</br>

## Usage :pencil:
:zap:  Visit the live demo or run the app locally.<br>
:zap:  Browse products, add items to your cart, and proceed to checkout.<br>
:zap:  Sign in or create an account for a personalized experience.<br>
:zap:  Enjoy a smooth and intuitive shopping experience!<br>

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
│   │   └── userCartContext.js
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
## Installation :notebook:
1. To install the Amazon Clone, use git:
```
git clone https://github.com/kumardinesh1908/amazon-clone.git
```
To deploy this project, simply open the index.html file in your browser.
2. Install dependencies: 
```
npm install
```
3. Start the development server: 
```
npm start
```

## Live Demo
```
 https://amazon-clone-kumardinesh1908.vercel.app
```

