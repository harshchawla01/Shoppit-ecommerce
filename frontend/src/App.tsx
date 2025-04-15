import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { useAppDispatch } from "./redux/store";
import { fetchSellerProfile } from "./redux/seller/sellerSlice";

import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Order/Checkout";
import Profile from "./customer/pages/Account/Profile";
import SellerAccount from "./seller/pages/Account/SellerAccount";
import AddProductForm from "./seller/pages/Products/AddProductForm";
import UpdateProductForm from "./seller/pages/Products/UpdateProductForm";
import Products from "./seller/pages/Products/Products";
import SignupForm from "./customer/components/auth/SignupForm";

import CustomerNavbar from "./customer/components/navbar/Navbar";
import SellerNavbar from "./seller/components/Navbar/Navbar";
import AdminNavbar from "./admin/components/Navbar/Navbar";
import SellerDrawerList from "./seller/components/SideBar/DrawerList";

// Import admin pages
import SellersList from "./admin/pages/SellerList";
import CreateSellerForm from "./admin/pages/CreateSellerForm";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, isLoggedIn, isSeller, isCustomer, isAdmin } = useAuth();

  useEffect(() => {
    if (token && isSeller) {
      dispatch(fetchSellerProfile(token));
    }
  }, [dispatch, token, isSeller]);

  useEffect(() => {
    if (isLoggedIn) {
      const currentPath = location.pathname;

      if (isAdmin) {
        if (currentPath.startsWith("/admin")) {
          if (currentPath === "/admin") {
            navigate("/admin/sellers");
          }
        } else {
          navigate("/admin/sellers");
        }
      } else if (isSeller) {
        if (currentPath.startsWith("/seller")) {
          if (currentPath === "/seller") {
            navigate("/seller/account");
          }
        } else {
          navigate("/seller/account");
        }
      } else if (isCustomer || (!isSeller && !isAdmin)) {
        if (
          currentPath.startsWith("/seller") ||
          currentPath.startsWith("/admin")
        ) {
          navigate("/");
        }
      }
    }
  }, [isLoggedIn, isSeller, isCustomer, isAdmin, location.pathname, navigate]);

  const isSellerSection = location.pathname.startsWith("/seller");
  const isAdminSection = location.pathname.startsWith("/admin");

  return (
    // <ThemeProvider theme={CustomTheme}>
    <div>
      {isAdminSection ? (
        <AdminNavbar />
      ) : isSellerSection ? (
        <SellerNavbar DrawerList={SellerDrawerList} />
      ) : (
        <CustomerNavbar />
      )}

      <Routes>
        <Route path="/signup" element={<SignupForm />} />

        {/* Admin routes */}
        <Route
          path="/admin/sellers"
          element={isAdmin ? <SellersList /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin/create-seller"
          element={isAdmin ? <CreateSellerForm /> : <Navigate to="/" replace />}
        />

        <Route
          path="/admin"
          element={<Navigate to="/admin/sellers" replace />}
        />

        {/* Seller routes */}
        <Route
          path="/seller/account"
          element={isSeller ? <SellerAccount /> : <Navigate to="/" replace />}
        />
        <Route
          path="/seller/add-product"
          element={isSeller ? <AddProductForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/seller/products"
          element={isSeller ? <Products /> : <Navigate to="/" replace />}
        />
        <Route
          path="/seller/update-product/:productId"
          element={
            isSeller ? <UpdateProductForm /> : <Navigate to="/" replace />
          }
        />

        <Route
          path="/seller"
          element={<Navigate to="/seller/account" replace />}
        />

        {/* Customer routes */}
        <Route path="/" element={<Home />} />

        {/* For filter */}
        <Route path="/products/:category" element={<Product />} />
        {/* Route to handle search queries */}
        <Route path="/products" element={<Product />} />

        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/account/*" element={<Profile />} />

        {/* Any random route for seller and admin */}
        <Route
          path="/admin/*"
          element={<Navigate to="/admin/sellers" replace />}
        />
        <Route
          path="/seller/*"
          element={<Navigate to="/seller/account" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
    // </ThemeProvider>
  );
};

export default App;
