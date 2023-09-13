import React,{ useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/header/header";
import HeaderBottom from "./components/header/headerBottom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import ErrorPage from "./components/error/ErrorPage";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "./components/cart/cart";
import { UserCartProvider } from "./context/userCartContext";
import { UserAddressProvider } from "./context/userAddressContext";
import Checkout from "./components/checkout/Checkout";
import { useDispatch,useSelector } from "react-redux";
import { fetchProducts } from "./redux/amazonSlice"; // Import your fetchProducts action


// Layout component to combine components for main path("/") of routers which has to be rendered when website opens for the first time 
const Layout = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <HeaderBottom />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/allProducts",
          children: [
            {
              index: true,
              element: <Products />,
            },
            {
              path: ":title",
              element: <ProductDetails />,
            },
          ]
        },
        {
          path: ':category',
          children: [
            {
              index: true,
              element: <Products />,
            },
            {
              path: ":title",
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/cart",
          element: <Cart />
        },
      ],
    },
    {
      path: "/signIn",
      children: [
        {
          index: true,
          element: <SignIn />
        },
        {
          path: "forgotPassword",
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: "/createAccount",
      element: <CreateAccount />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products when the app loads
  }, []);

  return (

    <UserCartProvider>
      < UserAddressProvider>
        <RouterProvider router={router} />
      </UserAddressProvider>
    </UserCartProvider>

  );
}

export default App;
