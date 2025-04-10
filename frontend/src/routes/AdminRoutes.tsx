import React from "react";
import { Route, Routes } from "react-router-dom";
import SellersTable from "../admin/pages/sellers/SellersTable";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SellersTable />} />
    </Routes>
  );
};

export default AdminRoutes;
