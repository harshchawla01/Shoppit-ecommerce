// // // // import React, { use, useEffect } from "react";
// // // // // import Navbar from "./customer/components/Navbar/Navbar";
// // // // import { ThemeProvider } from "@mui/material";
// // // // import CustomTheme from "./Theme/CustomTheme";
// // // // import Home from "./customer/pages/Home/Home";
// // // // import Product from "./customer/pages/Product/Product";
// // // // import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
// // // // import Cart from "./customer/pages/Cart/Cart";
// // // // import Checkout from "./customer/pages/Checkout/Checkout";
// // // // import { Route, Routes, useNavigate } from "react-router-dom";
// // // // import Profile from "./customer/pages/Account/Profile";
// // // // import AddProductForm from "./seller/pages/Products/AddProductForm";
// // // // import SellersTable from "./admin/pages/sellers/SellersTable";
// // // // import SellerRegistrationForm from "./seller/pages/SellerInfoForm/SellerInfoForm";
// // // // import { fetchProducts } from "./State/fetchProducts";
// // // // import { fetchSellerProfile } from "./State/fetchSellerProfile";
// // // // // import { useAuth } from "./auth/AuthContext";
// // // // import { useAppDispatch, useAppSelector } from "./Redux/store";
// // // // import Navbar from "./seller/components/Navbar/Navbar";
// // // // import SellerRoutes from "./routes/SellerRoutes";
// // // // // import { useDispatch } from "react-redux";

// // // // // import "./index.css";

// // // // const App = () => {
// // // //   // const dispatch = useAppDispatch();
// // // //   // useEffect(() => {
// // // //   //   dispatch(fetchSellerProfile(localStorage.getItem("kc_token")));
// // // //   // }, [dispatch]);

// // // //   // const seller = useAppSelector((store) => store.sellers);
// // // //   // const navigate = useNavigate();

// // // //   // useEffect(() => {
// // // //   //   if (seller.profile) navigate("/seller");
// // // //   // }, [seller.profile]);

// // // //   return (
// // // //     <>
// // // //       <ThemeProvider theme={CustomTheme}>
// // // //         <div>
// // // //           {/* Navbar from seller */}
// // // //           <Navbar />
// // // //           <SellerRoutes />

// // // //           {/* <Navbar /> */}
// // // //           {/* <Routes>
// // // //             <Route path="/" element={<Home />} />
// // // //             <Route path="/products/:category" element={<Product />} />
// // // //             <Route
// // // //               path="/product-details/:categoryId/:name/:productId"
// // // //               element={<ProductDetails />}
// // // //             />
// // // //             <Route path="/cart" element={<Cart />} />
// // // //             <Route path="/checkout" element={<Checkout />} />
// // // //             <Route path="/account/*" element={<Profile />} />
// // // //             <Route path="/seller/addProduct" element={<AddProductForm />} />
// // // //             <Route path="/admin/sellersTable" element={<SellersTable />} />
// // // //             <Route
// // // //               path="/seller/registration-form"
// // // //               element={<SellerRegistrationForm />}
// // // //             />
// // // //           </Routes> */}
// // // //         </div>
// // // //       </ThemeProvider>
// // // //     </>
// // // //   );
// // // // };

// // // // export default App;

// // // import React, { useEffect } from "react";
// // // import { ThemeProvider } from "@mui/material";
// // // import CustomTheme from "./Theme/CustomTheme";
// // // import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// // // import { useAuth } from "./auth/AuthContext";
// // // import { useAppDispatch } from "./Redux/store";
// // // import { fetchSellerProfile } from "./Redux/Seller/sellerSlice";

// // // // Import pages
// // // import Home from "./customer/pages/Home/Home";
// // // import Product from "./customer/pages/Product/Product";
// // // import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
// // // import Cart from "./customer/pages/Cart/Cart";
// // // import Checkout from "./customer/pages/Checkout/Checkout";
// // // import Profile from "./customer/pages/Account/Profile";
// // // import AddProductForm from "./seller/pages/Products/AddProductForm";
// // // import SellersTable from "./admin/pages/sellers/SellersTable";
// // // import SellerRegistrationForm from "./seller/pages/SellerInfoForm/SellerInfoForm";

// // // // Import components
// // // import CustomerNavbar from "./customer/components/Navbar/Navbar";
// // // import SellerNavbar from "./seller/components/Navbar/Navbar";
// // // import SellerDrawerList from "./seller/components/SideBar/DrawerList";

// // // // Import routes
// // // import SellerRoutes from "./routes/SellerRoutes";

// // // const App = () => {
// // //   const location = useLocation();
// // //   const dispatch = useAppDispatch();
// // //   const { token, isLoggedIn } = useAuth();

// // //   // Fetch seller profile if we have a token
// // //   useEffect(() => {
// // //     if (token) {
// // //       dispatch(fetchSellerProfile(token));
// // //     }
// // //   }, [dispatch, token]);

// // //   // Determine if we're in the seller section
// // //   const isSellerSection = location.pathname.startsWith("/seller");

// // //   return (
// // //     <ThemeProvider theme={CustomTheme}>
// // //       <div>
// // //         {/* Show different navbar based on the section we're in */}
// // //         {isSellerSection ? (
// // //           <SellerNavbar DrawerList={SellerDrawerList} />
// // //         ) : (
// // //           <CustomerNavbar />
// // //         )}

// // //         <Routes>
// // //           {/* Seller routes */}
// // //           <Route path="/seller/*" element={<SellerRoutes />} />

// // //           {/* Customer routes */}
// // //           <Route path="/" element={<Home />} />
// // //           <Route path="/products/:category" element={<Product />} />
// // //           <Route
// // //             path="/product-details/:categoryId/:name/:productId"
// // //             element={<ProductDetails />}
// // //           />
// // //           <Route path="/cart" element={<Cart />} />
// // //           <Route path="/checkout" element={<Checkout />} />
// // //           <Route path="/account/*" element={<Profile />} />

// // //           {/* Admin routes */}
// // //           {/* <Route path="/admin/sellersTable" element={<SellersTable />} /> */}

// // //           {/* Special routes */}
// // //           {/* <Route
// // //             path="/seller/registration-form"
// // //             element={<SellerRegistrationForm />}
// // //           /> */}

// // //           {/* Fallback route */}
// // //           <Route path="*" element={<Navigate to="/" replace />} />
// // //         </Routes>
// // //       </div>
// // //     </ThemeProvider>
// // //   );
// // // };

// // // export default App;

// import React, { useEffect } from "react";
// import { ThemeProvider } from "@mui/material";
// import CustomTheme from "./Theme/CustomTheme";
// import {
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { useAuth } from "./auth/AuthContext";
// import { useAppDispatch } from "./Redux/store";
// import { fetchSellerProfile } from "./Redux/Seller/sellerSlice";

// // Import pages
// import Home from "./customer/pages/Home/Home";
// import Product from "./customer/pages/Product/Product";
// import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
// import Cart from "./customer/pages/Cart/Cart";
// import Checkout from "./customer/pages/Checkout/Checkout";
// import Profile from "./customer/pages/Account/Profile";
// import SellerAccount from "./seller/pages/Account/SellerAccount";
// import AddProductForm from "./seller/pages/Products/AddProductForm";
// import SellersTable from "./admin/pages/sellers/SellersTable";

// // Import components
// import CustomerNavbar from "./customer/components/Navbar/Navbar";
// import SellerNavbar from "./seller/components/Navbar/Navbar";
// import SellerDrawerList from "./seller/components/SideBar/DrawerList";
// import UpdateProductForm from "./seller/pages/Products/UpdateProductForm";

// const App = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { token, isLoggedIn, isSeller, isCustomer } = useAuth();

//   // Fetch seller profile if we have a token and user is a seller
//   useEffect(() => {
//     if (token && isSeller) {
//       dispatch(fetchSellerProfile(token));
//     }
//   }, [dispatch, token, isSeller]);

//   // Role-based redirection after login
//   useEffect(() => {
//     // Only execute this logic when login state changes
//     if (isLoggedIn) {
//       const currentPath = location.pathname;

//       // Handle seller role
//       if (isSeller) {
//         // If at seller path already, ensure content loads properly
//         if (currentPath.startsWith("/seller")) {
//           // If at root seller path, redirect to account
//           if (currentPath === "/seller") {
//             navigate("/seller/account");
//           }
//           // Otherwise, stay on current seller path
//         } else {
//           // If not on seller path but user is seller, redirect to seller account
//           navigate("/seller/account");
//         }
//       }
//       // Handle customer role (if not seller or explicitly customer)
//       else if (isCustomer || !isSeller) {
//         // If on seller path but user is customer, redirect to home
//         if (currentPath.startsWith("/seller")) {
//           navigate("/");
//         }
//         // Otherwise, stay on current customer path
//       }
//     }
//   }, [isLoggedIn, isSeller, isCustomer, location.pathname, navigate]);

//   // Determine if we're in the seller section
//   const isSellerSection = location.pathname.startsWith("/seller");

//   return (
//     <ThemeProvider theme={CustomTheme}>
//       <div>
//         {/* Show different navbar based on the section we're in */}
//         {isSellerSection ? (
//           <SellerNavbar DrawerList={SellerDrawerList} />
//         ) : (
//           <CustomerNavbar />
//         )}

//         <Routes>
//           {/* Seller protected routes */}
//           <Route
//             path="/seller/account"
//             element={isSeller ? <SellerAccount /> : <Navigate to="/" replace />}
//           />
//           <Route
//             path="/seller/add-product"
//             element={
//               isSeller ? <AddProductForm /> : <Navigate to="/" replace />
//             }
//           />
//           {/* <Route
//             path="/seller/update-product"
//             element={
//               isSeller ? <UpdateProductForm /> : <Navigate to="/" replace />
//             }
//           /> */}
//           {/* Add other seller routes with similar protection */}

//           {/* Default seller route redirects to account */}
//           <Route
//             path="/seller"
//             element={<Navigate to="/seller/account" replace />}
//           />

//           {/* Customer routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/products/:category" element={<Product />} />
//           <Route
//             path="/product-details/:categoryId/:name/:productId"
//             element={<ProductDetails />}
//           />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/account/*" element={<Profile />} />

//           {/* Admin routes */}
//           <Route path="/admin/sellersTable" element={<SellersTable />} />

//           {/* Fallback routes */}
//           <Route
//             path="/seller/*"
//             element={<Navigate to="/seller/account" replace />}
//           />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import CustomTheme from "./Theme/CustomTheme";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { useAppDispatch } from "./Redux/store";
import { fetchSellerProfile } from "./Redux/Seller/sellerSlice";

// Import pages
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Profile from "./customer/pages/Account/Profile";
import SellerAccount from "./seller/pages/Account/SellerAccount";
import AddProductForm from "./seller/pages/Products/AddProductForm";
import UpdateProductForm from "./seller/pages/Products/UpdateProductForm";
import Products from "./seller/pages/Products/Products"; // Assuming you have this component
import SellersTable from "./admin/pages/sellers/SellersTable";

// Import components
import CustomerNavbar from "./customer/components/Navbar/Navbar";
import SellerNavbar from "./seller/components/Navbar/Navbar";
import SellerDrawerList from "./seller/components/SideBar/DrawerList";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, isLoggedIn, isSeller, isCustomer } = useAuth();

  // Fetch seller profile if we have a token and user is a seller
  useEffect(() => {
    if (token && isSeller) {
      dispatch(fetchSellerProfile(token));
    }
  }, [dispatch, token, isSeller]);

  // Role-based redirection after login
  useEffect(() => {
    // Only execute this logic when login state changes
    if (isLoggedIn) {
      const currentPath = location.pathname;

      // Handle seller role
      if (isSeller) {
        // If at seller path already, ensure content loads properly
        if (currentPath.startsWith("/seller")) {
          // If at root seller path, redirect to account
          if (currentPath === "/seller") {
            navigate("/seller/account");
          }
          // Otherwise, stay on current seller path
        } else {
          // If not on seller path but user is seller, redirect to seller account
          navigate("/seller/account");
        }
      }
      // Handle customer role (if not seller or explicitly customer)
      else if (isCustomer || !isSeller) {
        // If on seller path but user is customer, redirect to home
        if (currentPath.startsWith("/seller")) {
          navigate("/");
        }
        // Otherwise, stay on current customer path
      }
    }
  }, [isLoggedIn, isSeller, isCustomer, location.pathname, navigate]);

  // Determine if we're in the seller section
  const isSellerSection = location.pathname.startsWith("/seller");

  return (
    <ThemeProvider theme={CustomTheme}>
      <div>
        {/* Show different navbar based on the section we're in */}
        {isSellerSection ? (
          <SellerNavbar DrawerList={SellerDrawerList} />
        ) : (
          <CustomerNavbar />
        )}

        <Routes>
          {/* Seller protected routes */}
          <Route
            path="/seller/account"
            element={isSeller ? <SellerAccount /> : <Navigate to="/" replace />}
          />
          <Route
            path="/seller/add-product"
            element={
              isSeller ? <AddProductForm /> : <Navigate to="/" replace />
            }
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
          {/* Add other seller routes with similar protection */}

          {/* Default seller route redirects to account */}
          <Route
            path="/seller"
            element={<Navigate to="/seller/account" replace />}
          />

          {/* Customer routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Profile />} />

          {/* Admin routes */}
          <Route path="/admin/sellersTable" element={<SellersTable />} />

          {/* Fallback routes */}
          <Route
            path="/seller/*"
            element={<Navigate to="/seller/account" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
