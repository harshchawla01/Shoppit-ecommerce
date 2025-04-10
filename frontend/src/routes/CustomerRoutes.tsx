import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../customer/pages/Home/Home";
import Products from "../customer/pages/Products/Products";
import ProductDetails from "../customer/pages/Products/ProductDetails/ProductDetails";
import Cart from "../customer/pages/Cart/Cart";
import Address from "../customer/pages/Checkout/AddressPage";
import Profile from "../customer/pages/Account/Profile";
import Navbar from "../customer/components/Navbar/Navbar";
// import NotFound from "../customer/pages/NotFound/NotFound";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { fetchUserCart } from "../Redux/Customer/CartSlice";
import Wishlist from "../customer/pages/Wishlist/Wishlist";
import { getWishlistByUserId } from "../Redux/Customer/WishlistSlice";
import SearchProducts from "../customer/pages/Search/SearchProducts";

const CustomerRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/chat-bot' element={<ChatBot />} /> */}
        <Route path="/products/:categoryId" element={<Products />} />
        <Route path="/search-products" element={<SearchProducts />} />
        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout/address" element={<Address />} />
        <Route path="/account/*" element={<Profile />} />
      </Routes>
    </>
  );
};

export default CustomerRoutes;
