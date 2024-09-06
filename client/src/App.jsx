import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Auth_Layout from "./components/Auth/Auth_Layout";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import AdminLayout from "./components/Admin/Admin_Layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProducts from "./pages/admin/products";
import AdminOrders from "./pages/admin/orders";
import AdminFeatures from "./pages/admin/features";
import ShopLayout from "./components/Shop/Shop_Layout";
import NotFound from "./components/Not-Found";
import ShopHome from "./pages/shop/home";
import Listing from "./pages/shop/listing";
import Checkout from "./pages/shop/checkout";
import Account from "./pages/shop/account";
import UnAuthorized from "./pages/unAuthorized";
import AuthCheck from "./components/Auth_Check";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { user_Check_Auth_Action } from "./store/auth_Slice";
import Loader from "./components/Loading";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(user_Check_Auth_Action());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthCheck isAuthenticated={isAuthenticated} user={user}>
          <Layout />
        </AuthCheck>
      ),
      children: [
        // AUTH NESTED ROUTE
        {
          path: "/auth",
          element: <Auth_Layout />,
          children: [
            {
              path: "/auth/signIn",
              element: <SignIn />,
            },
            {
              path: "/auth/signUp",
              element: <SignUp />,
            },
          ],
        },
        // ADMIN ROUTE
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            {
              path: "/admin/dashboard",
              element: <AdminDashboard />,
            },
            {
              path: "/admin/products",
              element: <AdminProducts />,
            },
            {
              path: "/admin/orders",
              element: <AdminOrders />,
            },
            {
              path: "/admin/features",
              element: <AdminFeatures />,
            },
          ],
        },
        // SHOP ROUTE
        {
          path: "/shop",
          element: <ShopLayout />,
          children: [
            { path: "/shop/home", element: <ShopHome /> },
            { path: "/shop/listing", element: <Listing /> },
            { path: "/shop/checkout", element: <Checkout /> },
            { path: "/shop/account", element: <Account /> },
          ],
        },
        // NOT FOUND ROUTE
        {
          path: "*",
          element: <NotFound />,
        },

        // UNAUTHORIZED
        {
          path: "/UnAuthorized",
          element: <UnAuthorized />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
