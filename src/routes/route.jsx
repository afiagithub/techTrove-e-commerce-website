import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import Blogs from "../pages/Blogs";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/about',
            element: <About></About>
        },
        {
            path: '/all-products',
            element: <AllProducts></AllProducts>
        },
        {
            path: '/blog',
            element: <Blogs></Blogs>
        }
      ]
    },
]);

export default router;