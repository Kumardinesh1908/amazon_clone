
# Amazon Clone
The Amazon Clone is a feature-rich, fully functional e-commerce web application developed using cutting-edge technologies. It faithfully replicates the shopping experience found on the popular Amazon platform. This project leverages React, Tailwind CSS, Redux Toolkit, Firebase, Framer Motion, and other modern tools to create a seamless and user-friendly shopping environment.

## Features
- **Product Listings:** Browse a wide range of products with detailed descriptions and prices.
- **User Authentication:** Sign in with your Amazon account or create a new one.
- **Add to Cart:** Easily add products to your cart for a seamless shopping experience.
- **Real-Time Updates:** See live updates to your cart and totals as you shop.
- **Secure Checkout:** Safely complete your purchase with payment processing.
- **Loading Spinner:** Enjoy smooth user interactions with loading spinners for enhanced UX.
- **Responsive Design:** The app is optimized for various screen sizes and devices.
- **Animations:** Engage with stunning animations and transitions powered by Framer Motion.
- **Redux State Management:** Efficiently manage app state with Redux Toolkit.
- **Firebase Integration:** Harness the power of Firebase to store and retrieve data with Firestore, Firebase's real-time NoSQL database. Firebase Authentication ensures secure user registration and login.

## Technologies Used
- React
- Tailwind CSS
- Redux Toolkit
- Framer Motion

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

