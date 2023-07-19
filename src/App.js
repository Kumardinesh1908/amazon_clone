import Header from "./components/header/header";
import HeaderBottom from "./components/header/headerBottom";
import Home from "./Home";
import Footer from "./components/footer/Footer";
// import ErrorPage from "./components/error/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import { productsData } from "./api/api";


// Layout component to combine components for main path("/") of routers which has to be rendered when website opens for the first time 

const Layout = () => {
  return (
    <>
      <Header />
      <HeaderBottom />
      <Outlet />
      <Footer />

    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          loader: productsData,
          element: <Home />,
        },
        // {
        //   path: "/category",
        //   element: <Category />

        // },
      ]
    },

  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
