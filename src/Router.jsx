import { createBrowserRouter } from "react-router-dom";
import Catigories from "./Pages/Catigories";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import App from "./App";
import User from "./Pages/User";
import Buyumlar from "./Pages/Buyumlar";
import Prom from "./Pages/Prom";
import Card from "./Pages/Card";
import Wishlist from "./Pages/Wishlist";
import Transaction from "./Pages/Transaction";
import Upload from "./Pages/Upload";
import Default from "./Pages/Default";
import Banner from "./Pages/Banner";

export const Router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement: <div>Bunaqa  sahifa  mavjud  emas </div>,
        children:[
            {
                path:"/",
                element:<User/>
            },
            {
              path:"/login",
              element:<Login/>
            },
            {
                path:"/catigories",
                element:<Catigories/>
            },
           
            {
              path:"/products",
              element:<Product/>
            },
            {
              path:"/orders",
              element:<Buyumlar/>
            },
            {
              path:"/promo",
              element:<Prom/>
            },
            {
              path:"/card",
              element:<Card/>
            },
            {
              path:"/wishlist",
              element:<Wishlist/>
            },
            {
              path:"/transaction",
              element:<Transaction/>
            },
            {
              path:"/upload",
              element:<Upload/>
            },
            {
              path:"/default",
              element:<Default/>
            },
            {
              path:"/banner",
              element:<Banner/>
            },

        ]
        }
    ])