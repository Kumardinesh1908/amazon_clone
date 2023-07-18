import Header from "./components/header/header";
import HeaderBottom from "./components/header/headerBottom";
import Home from "./Home";
import Footer from "./components/footer/Footer";
import ErrorPage from "./components/error/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";
import { productsData } from "./api/api";

// Layout component to combine components for main path("/") of routers which has to be rendered when website opens for the first time 

const Layout=()=>{
  return(
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
      path : "/",
      errorElement : <ErrorPage />,
      element : <Layout />,
      children : [
        {
          index : true,
          loader: productsData,
          element : <Home />,
        },
      ]
    },
    
  ])
  return (
    // <div className="font-amazon-ember">
    //   <Header />
    //   <Slider />
    //   <Footer className="font-sans" />
    // </div>
    <RouterProvider router={router} />
  );
}

export default App;
