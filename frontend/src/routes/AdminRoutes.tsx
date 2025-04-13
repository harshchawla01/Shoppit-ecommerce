// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import SellersTable from "../admin/pages/sellers/SellersTable";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<SellersTable />} />
//     </Routes>
//   );
// };

// export default AdminRoutes;

// src/routes/AdminRoutes.tsx
import { Route, Navigate } from "react-router-dom";

// Import admin pages
import SellersTable from "../admin/pages/sellers/SellersTable";

interface AdminRoutesProps {
  isAdmin: boolean;
}

const AdminRoutes = ({ isAdmin }: AdminRoutesProps) => {
  return (
    <>
      {/* Protected admin routes */}
      <Route
        path="/admin/sellersTable"
        element={isAdmin ? <SellersTable /> : <Navigate to="/" replace />}
      />
      {/* Add other admin routes with similar protection */}

      {/* Default admin route */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/sellersTable" replace />}
      />

      {/* Fallback route */}
      <Route
        path="/admin/*"
        element={<Navigate to="/admin/sellersTable" replace />}
      />
    </>
  );
};

export default AdminRoutes;
