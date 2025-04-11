import React, { use, useEffect } from "react";
import Navbar from "./customer/components/Navbar/Navbar";
import { ThemeProvider } from "@mui/material";
import CustomTheme from "./Theme/CustomTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import { Route, Routes } from "react-router-dom";
import Profile from "./customer/pages/Account/Profile";
import AddProductForm from "./seller/pages/Products/AddProductForm";
import SellersTable from "./admin/pages/sellers/SellersTable";
import SellerRegistrationForm from "./seller/pages/SellerInfoForm/SellerInfoForm";
import { fetchProducts } from "./State/fetchProducts";
import { fetchSellerProfile } from "./State/fetchSellerProfile";
// import { useAuth } from "./auth/AuthContext";
import { useAppDispatch } from "./Redux/store";
// import { useDispatch } from "react-redux";

// import "./index.css";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSellerProfile(localStorage.getItem("kc_token")));
  }, [dispatch]);

  return (
    <>
      {/* wrap whole application in the ThemeProvider */}
      <ThemeProvider theme={CustomTheme}>
        <div>
          {/* <Home /> */}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Cart /> */}
          {/* <Checkout /> */}

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<Product />} />
            <Route
              path="/product-details/:categoryId/:name/:productId"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/*" element={<Profile />} />
            <Route path="/seller/addProduct" element={<AddProductForm />} />
            <Route path="/admin/sellersTable" element={<SellersTable />} />
            <Route
              path="/seller/registration-form"
              element={<SellerRegistrationForm />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
