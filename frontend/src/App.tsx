// // // import React, { useEffect } from "react";
// // // import { ThemeProvider } from "@mui/material";
// // // import CustomTheme from "./Theme/CustomTheme";
// // // import {
// // //   Routes,
// // //   Route,
// // //   useLocation,
// // //   Navigate,
// // //   useNavigate,
// // // } from "react-router-dom";
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
// // // import SellerAccount from "./seller/pages/Account/SellerAccount";
// // // import AddProductForm from "./seller/pages/Products/AddProductForm";
// // // import UpdateProductForm from "./seller/pages/Products/UpdateProductForm";
// // // import Products from "./seller/pages/Products/Products";
// // // import SignupForm from "./customer/components/auth/SignupForm";

// // // // Import components
// // // import CustomerNavbar from "./customer/components/Navbar/Navbar";
// // // import SellerNavbar from "./seller/components/Navbar/Navbar";
// // // import SellerDrawerList from "./seller/components/SideBar/DrawerList";
// // // import Wishlist from "./customer/pages/Wishlist/Wishlist";

// // // const App = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const dispatch = useAppDispatch();
// // //   const { token, isLoggedIn, isSeller, isCustomer } = useAuth();

// // //   // Fetch seller profile if we have a token and user is a seller
// // //   useEffect(() => {
// // //     if (token && isSeller) {
// // //       dispatch(fetchSellerProfile(token));
// // //     }
// // //   }, [dispatch, token, isSeller]);

// // //   // Role-based redirection after login
// // //   useEffect(() => {
// // //     // Only execute this logic when login state changes
// // //     if (isLoggedIn) {
// // //       const currentPath = location.pathname;

// // //       // Handle seller role
// // //       if (isSeller) {
// // //         // If at seller path already, ensure content loads properly
// // //         if (currentPath.startsWith("/seller")) {
// // //           // If at root seller path, redirect to account
// // //           if (currentPath === "/seller") {
// // //             navigate("/seller/account");
// // //           }
// // //           // Otherwise, stay on current seller path
// // //         } else {
// // //           // If not on seller path but user is seller, redirect to seller account
// // //           navigate("/seller/account");
// // //         }
// // //       }
// // //       // Handle customer role (if not seller or explicitly customer)
// // //       else if (isCustomer || !isSeller) {
// // //         // If on seller path but user is customer, redirect to home
// // //         if (currentPath.startsWith("/seller")) {
// // //           navigate("/");
// // //         }
// // //         // Otherwise, stay on current customer path
// // //       }
// // //     }
// // //   }, [isLoggedIn, isSeller, isCustomer, location.pathname, navigate]);

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
// // //           {/* Add signup route */}
// // //           <Route path="/signup" element={<SignupForm />} />

// // //           {/* Seller protected routes */}
// // //           <Route
// // //             path="/seller/account"
// // //             element={isSeller ? <SellerAccount /> : <Navigate to="/" replace />}
// // //           />
// // //           <Route
// // //             path="/seller/add-product"
// // //             element={
// // //               isSeller ? <AddProductForm /> : <Navigate to="/" replace />
// // //             }
// // //           />
// // //           <Route
// // //             path="/seller/products"
// // //             element={isSeller ? <Products /> : <Navigate to="/" replace />}
// // //           />
// // //           <Route
// // //             path="/seller/update-product/:productId"
// // //             element={
// // //               isSeller ? <UpdateProductForm /> : <Navigate to="/" replace />
// // //             }
// // //           />
// // //           {/* Add other seller routes with similar protection */}

// // //           {/* Default seller route redirects to account */}
// // //           <Route
// // //             path="/seller"
// // //             element={<Navigate to="/seller/account" replace />}
// // //           />

// // //           {/* Customer routes */}
// // //           <Route path="/" element={<Home />} />
// // //           <Route path="/products/:category" element={<Product />} />
// // //           <Route
// // //             path="/product-details/:categoryId/:name/:productId"
// // //             element={<ProductDetails />}
// // //           />
// // //           <Route path="/cart" element={<Cart />} />
// // //           <Route path="/checkout" element={<Checkout />} />
// // //           {/* <Route path="/account/*" element={<Profile />} /> */}

// // //           <Route path="/account/*" element={<Profile />}>
// // //             {/* Add these sub-routes to your Profile component if not already there */}
// // //             <Route path="wishlist" element={<Wishlist />} />
// // //             {/* other account sub-routes */}
// // //           </Route>

// // //           {/* Fallback routes */}
// // //           <Route
// // //             path="/seller/*"
// // //             element={<Navigate to="/seller/account" replace />}
// // //           />
// // //           <Route path="*" element={<Navigate to="/" replace />} />
// // //         </Routes>
// // //       </div>
// // //     </ThemeProvider>
// // //   );
// // // };

// // // export default App;

// // import React, { useEffect } from "react";
// // import { ThemeProvider } from "@mui/material";
// // import CustomTheme from "./Theme/CustomTheme";
// // import {
// //   Routes,
// //   Route,
// //   useLocation,
// //   Navigate,
// //   useNavigate,
// // } from "react-router-dom";
// // import { useAuth } from "./auth/AuthContext";
// // import { useAppDispatch } from "./Redux/store";
// // import { fetchSellerProfile } from "./Redux/Seller/sellerSlice";

// // // Import pages
// // import Home from "./customer/pages/Home/Home";
// // import Product from "./customer/pages/Product/Product";
// // import ProductDetails from "./customer/pages/Product/ProductDetails/ProductDetails";
// // import Cart from "./customer/pages/Cart/Cart";
// // import Checkout from "./customer/pages/Checkout/Checkout";
// // import Profile from "./customer/pages/Account/Profile";
// // import SellerAccount from "./seller/pages/Account/SellerAccount";
// // import AddProductForm from "./seller/pages/Products/AddProductForm";
// // import UpdateProductForm from "./seller/pages/Products/UpdateProductForm";
// // import Products from "./seller/pages/Products/Products";
// // import SignupForm from "./customer/components/auth/SignupForm";

// // // Import components
// // import CustomerNavbar from "./customer/components/Navbar/Navbar";
// // import SellerNavbar from "./seller/components/Navbar/Navbar";
// // import AdminNavbar from "./admin/components/Navbar/Navbar";
// // import SellerDrawerList from "./seller/components/SideBar/DrawerList";
// // import AdminDrawerList from "./admin/components/SideBar/DrawerList";
// // import Wishlist from "./customer/pages/Wishlist/Wishlist";

// // // Import admin pages
// // // import AdminDashboard from "./admin/pages/Dashboard/Dashboard";
// // // import ManageSellers from "./admin/pages/Sellers/ManageSellers";

// // const App = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const dispatch = useAppDispatch();
// //   const { token, isLoggedIn, isSeller, isCustomer, isAdmin } = useAuth();

// //   // Fetch seller profile if we have a token and user is a seller
// //   useEffect(() => {
// //     if (token && isSeller) {
// //       dispatch(fetchSellerProfile(token));
// //     }
// //   }, [dispatch, token, isSeller]);

// //   // Role-based redirection after login
// //   useEffect(() => {
// //     // Only execute this logic when login state changes
// //     if (isLoggedIn) {
// //       const currentPath = location.pathname;

// //       // Handle admin role
// //       if (isAdmin) {
// //         // If at admin path already, ensure content loads properly
// //         if (currentPath.startsWith("/admin")) {
// //           // If at root admin path, redirect to dashboard
// //           if (currentPath === "/admin") {
// //             navigate("/admin/dashboard");
// //           }
// //           // Otherwise, stay on current admin path
// //         } else {
// //           // If not on admin path but user is admin, redirect to admin dashboard
// //           navigate("/admin/dashboard");
// //         }
// //       }
// //       // Handle seller role
// //       else if (isSeller) {
// //         // If at seller path already, ensure content loads properly
// //         if (currentPath.startsWith("/seller")) {
// //           // If at root seller path, redirect to account
// //           if (currentPath === "/seller") {
// //             navigate("/seller/account");
// //           }
// //           // Otherwise, stay on current seller path
// //         } else {
// //           // If not on seller path but user is seller, redirect to seller account
// //           navigate("/seller/account");
// //         }
// //       }
// //       // Handle customer role (if not seller/admin or explicitly customer)
// //       else if (isCustomer || (!isSeller && !isAdmin)) {
// //         // If on seller or admin path but user is customer, redirect to home
// //         if (
// //           currentPath.startsWith("/seller") ||
// //           currentPath.startsWith("/admin")
// //         ) {
// //           navigate("/");
// //         }
// //         // Otherwise, stay on current customer path
// //       }
// //     }
// //   }, [isLoggedIn, isSeller, isCustomer, isAdmin, location.pathname, navigate]);

// //   // Determine which section we're in
// //   const isSellerSection = location.pathname.startsWith("/seller");
// //   const isAdminSection = location.pathname.startsWith("/admin");

// //   return (
// //     <ThemeProvider theme={CustomTheme}>
// //       <div>
// //         {/* Show different navbar based on the section we're in */}
// //         {isAdminSection ? (
// //           <AdminNavbar DrawerList={AdminDrawerList} />
// //         ) : isSellerSection ? (
// //           <SellerNavbar DrawerList={SellerDrawerList} />
// //         ) : (
// //           <CustomerNavbar />
// //         )}

// //         <Routes>
// //           {/* Add signup route */}
// //           <Route path="/signup" element={<SignupForm />} />

// //           {/* Admin protected routes */}
// //           {/* <Route
// //             path="/admin/dashboard"
// //             element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
// //           />
// //           <Route
// //             path="/admin/sellers"
// //             element={isAdmin ? <ManageSellers /> : <Navigate to="/" replace />}
// //           /> */}

// //           {/* Default admin route redirects to dashboard */}
// //           <Route
// //             path="/admin"
// //             element={<Navigate to="/admin/dashboard" replace />}
// //           />

// //           {/* Seller protected routes */}
// //           <Route
// //             path="/seller/account"
// //             element={isSeller ? <SellerAccount /> : <Navigate to="/" replace />}
// //           />
// //           <Route
// //             path="/seller/add-product"
// //             element={
// //               isSeller ? <AddProductForm /> : <Navigate to="/" replace />
// //             }
// //           />
// //           <Route
// //             path="/seller/products"
// //             element={isSeller ? <Products /> : <Navigate to="/" replace />}
// //           />
// //           <Route
// //             path="/seller/update-product/:productId"
// //             element={
// //               isSeller ? <UpdateProductForm /> : <Navigate to="/" replace />
// //             }
// //           />
// //           {/* Add other seller routes with similar protection */}

// //           {/* Default seller route redirects to account */}
// //           <Route
// //             path="/seller"
// //             element={<Navigate to="/seller/account" replace />}
// //           />

// //           {/* Customer routes */}
// //           <Route path="/" element={<Home />} />
// //           <Route path="/products/:category" element={<Product />} />
// //           <Route
// //             path="/product-details/:categoryId/:name/:productId"
// //             element={<ProductDetails />}
// //           />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/checkout" element={<Checkout />} />

// //           <Route path="/account/*" element={<Profile />}>
// //             {/* Add these sub-routes to your Profile component if not already there */}
// //             <Route path="wishlist" element={<Wishlist />} />
// //             {/* other account sub-routes */}
// //           </Route>

// //           {/* Fallback routes */}
// //           <Route
// //             path="/admin/*"
// //             element={<Navigate to="/admin/dashboard" replace />}
// //           />
// //           <Route
// //             path="/seller/*"
// //             element={<Navigate to="/seller/account" replace />}
// //           />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </div>
// //     </ThemeProvider>
// //   );
// // };

// // export default App;

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
// import UpdateProductForm from "./seller/pages/Products/UpdateProductForm";
// import Products from "./seller/pages/Products/Products";
// import SignupForm from "./customer/components/auth/SignupForm";

// // Import components
// import CustomerNavbar from "./customer/components/Navbar/Navbar";
// import SellerNavbar from "./seller/components/Navbar/Navbar";
// import AdminNavbar from "./admin/components/Navbar/Navbar";
// import SellerDrawerList from "./seller/components/SideBar/DrawerList";
// import AdminDrawerList from "./admin/components/SideBar/DrawerList";
// import Wishlist from "./customer/pages/Wishlist/Wishlist";

// // Import admin pages
// // import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
// import AdminDashboard from "./admin/pages/AdminDashboard";
// import SellersList from "./admin/pages/SellerList";
// import CreateSellerForm from "./admin/pages/CreateSellerForm";

// const App = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const { token, isLoggedIn, isSeller, isCustomer, isAdmin } = useAuth();

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

//       // Handle admin role
//       if (isAdmin) {
//         // If at admin path already, ensure content loads properly
//         if (currentPath.startsWith("/admin")) {
//           // If at root admin path, redirect to dashboard
//           if (currentPath === "/admin") {
//             navigate("/admin/dashboard");
//           }
//           // Otherwise, stay on current admin path
//         } else {
//           // If not on admin path but user is admin, redirect to admin dashboard
//           navigate("/admin/dashboard");
//         }
//       }
//       // Handle seller role
//       else if (isSeller) {
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
//       // Handle customer role (if not seller/admin or explicitly customer)
//       else if (isCustomer || (!isSeller && !isAdmin)) {
//         // If on seller or admin path but user is customer, redirect to home
//         if (
//           currentPath.startsWith("/seller") ||
//           currentPath.startsWith("/admin")
//         ) {
//           navigate("/");
//         }
//         // Otherwise, stay on current customer path
//       }
//     }
//   }, [isLoggedIn, isSeller, isCustomer, isAdmin, location.pathname, navigate]);

//   // Determine which section we're in
//   const isSellerSection = location.pathname.startsWith("/seller");
//   const isAdminSection = location.pathname.startsWith("/admin");

//   return (
//     <ThemeProvider theme={CustomTheme}>
//       <div>
//         {/* Show different navbar based on the section we're in */}
//         {isAdminSection ? (
//           <AdminNavbar DrawerList={AdminDrawerList} />
//         ) : isSellerSection ? (
//           <SellerNavbar DrawerList={SellerDrawerList} />
//         ) : (
//           <CustomerNavbar />
//         )}

//         <Routes>
//           {/* Add signup route */}
//           <Route path="/signup" element={<SignupForm />} />

//           {/* Admin protected routes */}
//           <Route
//             path="/admin/sellers"
//             element={isAdmin ? <SellersList /> : <Navigate to="/" replace />}
//           />
//           <Route
//             path="/admin/create-seller"
//             element={
//               isAdmin ? <CreateSellerForm /> : <Navigate to="/" replace />
//             }
//           />
//           <Route
//             path="/admin/users"
//             element={
//               isAdmin ? (
//                 <div>User Management Page</div>
//               ) : (
//                 <Navigate to="/" replace />
//               )
//             }
//           />
//           <Route
//             path="/admin/settings"
//             element={
//               isAdmin ? (
//                 <div>System Settings Page</div>
//               ) : (
//                 <Navigate to="/" replace />
//               )
//             }
//           />

//           {/* Default admin route redirects to dashboard */}
//           <Route
//             path="/admin"
//             element={<Navigate to="/admin/dashboard" replace />}
//           />

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
//           <Route
//             path="/seller/products"
//             element={isSeller ? <Products /> : <Navigate to="/" replace />}
//           />
//           <Route
//             path="/seller/update-product/:productId"
//             element={
//               isSeller ? <UpdateProductForm /> : <Navigate to="/" replace />
//             }
//           />
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

//           <Route path="/account/*" element={<Profile />}>
//             {/* Add these sub-routes to your Profile component if not already there */}
//             <Route path="wishlist" element={<Wishlist />} />
//             {/* other account sub-routes */}
//           </Route>

//           {/* Fallback routes */}
//           <Route
//             path="/admin/*"
//             element={<Navigate to="/admin/dashboard" replace />}
//           />
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
import Products from "./seller/pages/Products/Products";
import SignupForm from "./customer/components/auth/SignupForm";

// Import components
import CustomerNavbar from "./customer/components/Navbar/Navbar";
import SellerNavbar from "./seller/components/Navbar/Navbar";
import AdminNavbar from "./admin/components/Navbar/Navbar";
import SellerDrawerList from "./seller/components/SideBar/DrawerList";
import AdminDrawerList from "./admin/components/SideBar/DrawerList";
import Wishlist from "./customer/pages/Wishlist/Wishlist";

// Import admin pages
import SellersList from "./admin/pages/SellerList";
import CreateSellerForm from "./admin/pages/CreateSellerForm";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, isLoggedIn, isSeller, isCustomer, isAdmin } = useAuth();

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

      // Handle admin role
      if (isAdmin) {
        // If at admin path already, ensure content loads properly
        if (currentPath.startsWith("/admin")) {
          // If at root admin path, redirect to sellers list
          if (currentPath === "/admin") {
            navigate("/admin/sellers");
          }
          // Otherwise, stay on current admin path
        } else {
          // If not on admin path but user is admin, redirect to sellers list
          navigate("/admin/sellers");
        }
      }
      // Handle seller role
      else if (isSeller) {
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
      // Handle customer role (if not seller/admin or explicitly customer)
      else if (isCustomer || (!isSeller && !isAdmin)) {
        // If on seller or admin path but user is customer, redirect to home
        if (
          currentPath.startsWith("/seller") ||
          currentPath.startsWith("/admin")
        ) {
          navigate("/");
        }
        // Otherwise, stay on current customer path
      }
    }
  }, [isLoggedIn, isSeller, isCustomer, isAdmin, location.pathname, navigate]);

  // Determine which section we're in
  const isSellerSection = location.pathname.startsWith("/seller");
  const isAdminSection = location.pathname.startsWith("/admin");

  return (
    <ThemeProvider theme={CustomTheme}>
      <div>
        {/* Show different navbar based on the section we're in */}
        {isAdminSection ? (
          <AdminNavbar DrawerList={AdminDrawerList} />
        ) : isSellerSection ? (
          <SellerNavbar DrawerList={SellerDrawerList} />
        ) : (
          <CustomerNavbar />
        )}

        <Routes>
          {/* Add signup route */}
          <Route path="/signup" element={<SignupForm />} />

          {/* Admin routes */}
          <Route
            path="/admin/sellers"
            element={isAdmin ? <SellersList /> : <Navigate to="/" replace />}
          />
          <Route
            path="/admin/create-seller"
            element={
              isAdmin ? <CreateSellerForm /> : <Navigate to="/" replace />
            }
          />
          {/* <Route
            path="/admin/users"
            element={
              isAdmin ? (
                <div>User Management Page</div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/admin/settings"
            element={
              isAdmin ? (
                <div>System Settings Page</div>
              ) : (
                <Navigate to="/" replace />
              )
            }
          /> */}

          {/* Default admin route redirects to sellers list */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/sellers" replace />}
          />

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

          <Route path="/account/*" element={<Profile />}>
            {/* Add these sub-routes to your Profile component if not already there */}
            <Route path="wishlist" element={<Wishlist />} />
            {/* other account sub-routes */}
          </Route>

          {/* Fallback routes */}
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
    </ThemeProvider>
  );
};

export default App;
