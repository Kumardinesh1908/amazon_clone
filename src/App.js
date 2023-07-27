import Header from "./components/header/header";
import HeaderBottom from "./components/header/headerBottom";
import Products from "./components/products/Products";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
// import ErrorPage from "./components/error/ErrorPage";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import { productsData,jeweleryData,smartphonesData,mensData,womensDressData,laptopsData,womensWatchData, womensBagData,womensShoeData,mensWatchesData, groceriesData,homeDecorData,furnitureData,motorcycleData,lightingData,automotiveData,sunglassesData,fragrancesData,skincareData,topsData,mensShoeData } from "./api/api";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import ForgotPassword from "./pages/ForgotPassword";
import ProductDetails from "./components/products/ProductDetails";





// Layout component to combine components for main path("/") of routers which has to be rendered when website opens for the first time 
const Layout = () => {
  return (
    <div className="bg-gray-200">
      <ScrollRestoration />
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
      // errorElement: <ErrorPage />,
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
          path: "/mens-shirts",
          loader : mensData,
          children: [
            {
              index: true,
              loader: mensData,
              element: <Products />
            },
            {
              path: ":title",
              loader: mensData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-dresses",
          loader : womensDressData,
          children: [
            {
              index: true,
              loader: womensDressData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensDressData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-watches",
          loader : womensWatchData,
          children: [
            {
              index: true,
              loader: womensWatchData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensWatchData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-bags",
          loader : womensBagData,
          children: [
            {
              index: true,
              loader: womensBagData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensBagData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-shoes",
          loader : womensShoeData,
          children: [
            {
              index: true,
              loader: womensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader: womensShoeData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/mens-watches",
          loader : mensWatchesData,
          children: [
            {
              index: true,
              loader: mensWatchesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: mensWatchesData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/smartphones",
          loader : smartphonesData,
          children: [
            {
              index: true,
              loader: smartphonesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: smartphonesData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/laptops",
          loader : laptopsData,
          children: [
            {
              index: true,
              loader: laptopsData,
              element: <Products />
            },
            {
              path: ":title",
              loader: laptopsData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/lighting",
          loader : lightingData,
          children: [
            {
              index: true,
              loader: lightingData,
              element: <Products />
            },
            {
              path: ":title",
              loader: lightingData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/automotive",
          loader : automotiveData,
          children: [
            {
              index: true,
              loader: automotiveData,
              element: <Products />
            },
            {
              path: ":title",
              loader: automotiveData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/womens-jewellery",
          loader : jeweleryData,
          children: [
            {
              index: true,
              loader: jeweleryData,
              element: <Products />
            },
            {
              path: ":title",
              loader: jeweleryData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/home-decoration",
          loader : homeDecorData,
          children: [
            {
              index: true,
              loader: homeDecorData,
              element: <Products />
            },
            {
              path: ":title",
              loader: homeDecorData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/furniture",
          loader : furnitureData,
          children: [
            {
              index: true,
              loader: furnitureData,
              element: <Products />
            },
            {
              path: ":title",
              loader: furnitureData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/motorcycle",
          loader : motorcycleData,
          children: [
            {
              index: true,
              loader: motorcycleData,
              element: <Products />
            },
            {
              path: ":title",
              loader: motorcycleData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/groceries",
          loader : groceriesData,
          children: [
            {
              index: true,
              loader: groceriesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: groceriesData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/mens-shoes",
          loader : mensShoeData,
          children: [
            {
              index: true,
              loader: mensShoeData,
              element: <Products />
            },
            {
              path: ":title",
              loader: mensShoeData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/sunglasses",
          loader : sunglassesData,
          children: [
            {
              index: true,
              loader: sunglassesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: sunglassesData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/fragrances",
          loader : sunglassesData,
          children: [
            {
              index: true,
              loader: fragrancesData,
              element: <Products />
            },
            {
              path: ":title",
              loader: fragrancesData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/skincare",
          loader : skincareData,
          children: [
            {
              index: true,
              loader: skincareData,
              element: <Products />
            },
            {
              path: ":title",
              loader: skincareData,
              element: <ProductDetails />,
            },
          ],
        },
        {
          path: "/tops",
          loader : topsData,
          children: [
            {
              index: true,
              loader: topsData,
              element: <Products />
            },
            {
              path: ":title",
              loader: topsData,
              element: <ProductDetails />,
            },
          ],
        },
        // {
        //   path: "/:category",
        //   loader: ({ params }) => productsData(params.category), // Data loader for all product categories
        //   element: <Products />
        // },
        // {
        //   path: "/:category/:title",
        //   loader: productsData, // Data loader for all product categories
        //   element: <ProductDetails />,
        // },
      ],
    },
    {
      path: "/allProducts/:title",
      loader: productsData,
      element: <ProductDetails />,
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
  return (

    <RouterProvider router={router} />

  );
}

export default App;
