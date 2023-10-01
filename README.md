# Amazon Clone :tv:
The Amazon Clone is a feature-rich, fully functional e-commerce web application developed using React,  Redux Toolkit, Firebase,Tailwind CSS, Framer Motion, and other modern tools to create a seamless and user-friendly shopping environment.It faithfully replicates the shopping experience found on the popular Amazon platform.
<img src="/screenshots/amazon homepage.png">

## Features :fire:
:tv: 1. Product Listings, Product Search and Product Details.</br>
:tv: 2. Filter based on Rating, Price and Category.</br>
:tv: 3. Sort based on High Price, Low Price and Rating.</br>
</br>
<img src="/screenshots/Filter page.png">
</br>
:tv: 4. Add to cart and Buy Now.
</br>
<img src="/screenshots/details page.png">
</br>
:tv: 5. Cart Page with Quantity increase/decrease, Delate Product and Clear Cart.</br>
<img src="/screenshots/cart page.png">
</br>
:tv: 6. User Registration and Login.</br>
</br>
<img src="/screenshots/login page.png">
</br>
:tv: 7. Save Multiple Addresses.</br>
</br>
<img src="/screenshots/address page.png">
</br>
:tv: 8. Order History, Cancel and Return Order.</br>
</br>
<img src="/screenshots/orders page.png">
</br>
:tv: 9. Efficiently manage app state with Redux Toolkit.</br>

## Tech Stack :computer:
:bulb: **Front-end** React, Redux Toolkit, Tailwind-CSS, Framer Motion, Loading Spinner</br>
:bulb: **Back-end** Firebase</br>

## Usage :pencil:
:zap: 1. Visit the live demo or run the app locally.<br>
:zap: 2. Browse products, add items to your cart, and proceed to checkout.<br>
:zap: 3. Sign in or create an account for a personalized experience.<br>
:zap: 4. Enjoy a smooth and intuitive shopping experience!<br>

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
## Installation :notebook:
1. To install the Todo List app, use git:
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
Check out the live demo of Amazon Clone: https://amazon-clone-kumardinesh1908.vercel.app

