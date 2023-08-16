import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import { productsData } from "./api/api";
import Header from "./components/header/header";
import HeaderBottom from "./components/header/headerBottom";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import ErrorPage from "./components/error/ErrorPage";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "../src/pages/cart";
import { UserCartProvider } from "./context/userCartContext";
import { UserAddressProvider } from "./context/userAddressContext";
import Checkout from "../src/pages/Checkout";

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
      loader: productsData,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          loader: productsData,
          element: <Home />,
        },
        {
          path: "/allProducts",
          loader: productsData,
          children: [
            {
              index: true,
              loader: productsData,
              element: <Products />
            },
            {
              path: ":title",
              loader: productsData,
              element: <ProductDetails />,
            },
          ]
        },
        {
          path: ':category',
          children: [
            {
              index: true,
              loader: productsData,
              element: <Products />,
            },
            {
              path: ":title",
              loader: productsData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/cart",
          loader: productsData,
          element: <Cart />
        },
      ],
    },
    // {
    //   path: "/allProducts/:title",
    //   loader: productsData,
    //   element: <ProductDetails />,
    // },
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

  return (

    <UserCartProvider>
      < UserAddressProvider>
        <RouterProvider router={router} />
      </UserAddressProvider>
    </UserCartProvider>

  );
}

export default App;

