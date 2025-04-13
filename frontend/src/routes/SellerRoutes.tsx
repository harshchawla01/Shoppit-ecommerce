// // // import React from "react";
// // // import { Route, Routes } from "react-router-dom";
// // // // import HomePage from '../seller/pages/SellerDashboard/HomePage'
// // // import Products from "../seller/pages/Products/Products";
// // // import ProductForm from "../seller/pages/Products/AddProductForm";
// // // import Orders from "../seller/pages/Orders/Orders";
// // // // import Profile from '../seller/pages/Account/Profile'
// // // import UpdateProductForm from "../seller/pages/Products/UpdateProductForm";

// // // const SellerRoutes = () => {
// // //   return (
// // //     <Routes>
// // //       {/* <Route path='/' element={<HomePage />} /> */}
// // //       <Route path="/products" element={<Products />} />
// // //       <Route path="/add-product" element={<ProductForm />} />
// // //       <Route
// // //         path="/update-product/:productId"
// // //         element={<UpdateProductForm />}
// // //       />
// // //       <Route path="/orders" element={<Orders />} />
// // //       {/* <Route path='/invetory' element={<Invetory />} /> */}
// // //       {/* <Route path='/account' element={<Profile />} /> */}
// // //       {/* <Route path='/payment' element={<Payment />} /> */}
// // //       {/* <Route path='/transaction' element={<TransactionTable/>} /> */}
// // //     </Routes>
// // //   );
// // // };

// // // export default SellerRoutes;

// // import React from "react";
// // import { Route, Routes, Navigate } from "react-router-dom";
// // import SellerAccount from "../seller/pages/Account/SellerAccount";
// // import { useAuth } from "../auth/AuthContext";

// // // Protected route component
// // const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
// //   const { isLoggedIn, userInfo } = useAuth();

// //   // Check if user is logged in and has seller role
// //   const isSellerUser =
// //     userInfo?.roles?.includes("seller") || userInfo?.roles?.includes("SELLER");

// //   if (!isLoggedIn || !isSellerUser) {
// //     return <Navigate to="/" replace />;
// //   }

// //   return <>{children}</>;
// // };

// // const SellerRoutes = () => {
// //   return (
// //     <Routes>
// //       <Route
// //         path="/seller/account"
// //         element={
// //           <ProtectedRoute>
// //             <SellerAccount />
// //           </ProtectedRoute>
// //         }
// //       />

// //       {/* You can add other seller routes here in the future */}
// //       <Route
// //         path="/seller"
// //         element={<Navigate to="/seller/account" replace />}
// //       />

// //       {/* Fallback route */}
// //       <Route path="*" element={<Navigate to="/seller" replace />} />
// //     </Routes>
// //   );
// // };

// // export default SellerRoutes;

// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// import SellerAccount from "../seller/pages/Account/SellerAccount";

// // Import other seller pages as you develop them
// // import SellerDashboard from "../seller/pages/Dashboard/SellerDashboard";
// // import SellerOrders from "../seller/pages/Orders/SellerOrders";
// // import SellerProducts from "../seller/pages/Products/SellerProducts";
// // import AddProductForm from "../seller/pages/Products/AddProductForm";

// // Protected route component
// const ProtectedSellerRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn, userInfo } = useAuth();

//   // Check if user is logged in and has seller role
//   const isSellerUser =
//     userInfo?.roles?.includes("client_seller") ||
//     userInfo?.roles?.includes("SELLER");

//   if (!isLoggedIn) {
//     // Not logged in at all, redirect to login page
//     // You can replace this with a dedicated login page for sellers if needed
//     return <Navigate to="/" replace />;
//   }

//   if (!isSellerUser) {
//     // Logged in but not a seller, redirect to customer home
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// const SellerRoutes = () => {
//   return (
//     <Routes>
//       {/* Account route */}
//       <Route
//         path="/seller/account"
//         element={
//           <ProtectedSellerRoute>
//             <SellerAccount />
//           </ProtectedSellerRoute>
//         }
//       />

//       {/* Placeholder routes - uncomment and implement as you develop these pages */}
//       {/*
//       <Route
//         path="/seller/orders"
//         element={
//           <ProtectedSellerRoute>
//             <SellerOrders />
//           </ProtectedSellerRoute>
//         }
//       />

//       <Route
//         path="/seller/products"
//         element={
//           <ProtectedSellerRoute>
//             <SellerProducts />
//           </ProtectedSellerRoute>
//         }
//       />

//       <Route
//         path="/seller/add-product"
//         element={
//           <ProtectedSellerRoute>
//             <AddProductForm />
//           </ProtectedSellerRoute>
//         }
//       />

//       <Route
//         path="/seller"
//         element={
//           <ProtectedSellerRoute>
//             <SellerDashboard />
//           </ProtectedSellerRoute>
//         }
//       />
//       */}

//       {/* For now, redirect all seller routes to account page */}
//       <Route
//         path="/seller/*"
//         element={<Navigate to="/seller/account" replace />}
//       />
//     </Routes>
//   );
// };

// export default SellerRoutes;

// src/routes/SellerRoutes.tsx
import { Route, Navigate } from "react-router-dom";

// Import seller pages
import SellerAccount from "../seller/pages/Account/SellerAccount";
import AddProductForm from "../seller/pages/Products/AddProductForm";

interface SellerRoutesProps {
  isSeller: boolean;
}

const SellerRoutes = ({ isSeller }: SellerRoutesProps) => {
  return (
    <>
      {/* Protected seller routes */}
      <Route
        path="/seller/account"
        element={isSeller ? <SellerAccount /> : <Navigate to="/" replace />}
      />
      <Route
        path="/seller/add-product"
        element={isSeller ? <AddProductForm /> : <Navigate to="/" replace />}
      />
      {/* Add other seller routes with similar protection */}

      {/* Special routes - accessible by non-sellers for registration */}

      {/* Default seller route redirects to account */}
      <Route
        path="/seller"
        element={<Navigate to="/seller/account" replace />}
      />

      {/* Fallback route */}
      <Route
        path="/seller/*"
        element={<Navigate to="/seller/account" replace />}
      />
    </>
  );
};

export default SellerRoutes;
