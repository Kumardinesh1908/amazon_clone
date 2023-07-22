import Header from "./components/header/header";
import HeaderBottom from "./components/header/headerBottom";
import Products from "./components/products/Products";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import ErrorPage from "./components/error/ErrorPage";
import { createBrowserRouter, RouterProvider, Outlet, } from "react-router-dom";
import { productsData } from "./api/api";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";



// Layout component to combine components for main path("/") of routers which has to be rendered when website opens for the first time 
const Layout = () => {
  return (
    <div className="bg-gray-200">
      <Header />
      <HeaderBottom />
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
          loader: productsData,
          element: <Home />,
        }, 
        {
          path: "/allProducts",
          loader: productsData,
          element: <Products />,
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
  ]);
  // useEffect(() => {
  //   // Scroll to the top of the page whenever the route changes
  //   window.scrollTo(0, 0);
  // }, []);
  return (

      <RouterProvider router={router} />

  );
}

export default App;
