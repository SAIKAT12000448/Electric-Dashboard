import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import AddProducts from "../components/Dashboard/AddProducts";
import Home from "../components/Home";
import Inventory from "../components/Dashboard/Inventory";
import Products from "../components/ui/Products";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
          {
            index: true,
            element: <Home />,
          },
        //   {
        //     path: '/products',
        //     element: <Products />,
        //   },
        //   {
        //     path: '/product-details/:id',
        //     element: <ProductDetails />,
        //   },
        //   {
        //     path: '/checkout',
        //     element: <Checkout />,
        //   },
        ],
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children:[
        {
          index: true,
          path:'addproduct',
          element:<AddProducts />
        },
       {
        path:"inventory",
        element: <Inventory/>
       },
       {
        path:"addproduct/:id",
        element: <AddProducts/>
       },
       ]
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/products',
        element: <Products />,
      },

    ]);


export default routes;