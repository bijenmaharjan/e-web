import React, { useEffect } from "react";
import Layout from "./components/auth/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/authorization/Login";
import Register from "./pages/authorization/Register";
import CheckAuth from "./components/common/CheckAuth";
import AdminLayout from "./components/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import Adminfeatures from "./pages/admin/features";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import Nopage from "./pages/PageNotFound/Nopage";
import ShoppingLayout from "./components/shopping/Layout";
import ShoppingHome from "./pages/shopping/Home";
import ShoppingCheckout from "./pages/shopping/Checkout";
import ShoppingAccount from "./pages/shopping/Account";
import ShoppingListing from "./pages/shopping/Listing";
import Unauth from "./pages/unauthorized/unauth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authorization-slice/auths";
import { Skeleton } from "./components/UI/skeleton";
import PaypalPage from "./components/shopping/PaypalPage";
import PaypalPaymentSuccess from "./components/shopping/PaypalPaymentSuccess";
import SearchProducts from "./pages/shopping/Search";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log("userDatasApp:", user?.role, isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // const isAuthenticated = true;
  // const user = {
  //   name: "bijen",
  //   role: "admin",
  // };

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<Adminfeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalPage />} />
          <Route path="payment-success" element={<PaypalPaymentSuccess />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<Unauth />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
};

export default App;
