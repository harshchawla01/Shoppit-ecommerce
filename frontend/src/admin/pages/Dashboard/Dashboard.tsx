import React, { useEffect, useState } from "react";
import AdminRoutes from "../../../routes/AdminRoutes";
// import DrawerList from './DrawerList'
import Navbar from "../../../admin seller/components/navbar/Navbar";
import AdminDrawerList from "../../components/DrawerList";
import { Alert, Snackbar } from "@mui/material";
import { useAppSelector } from "../../../Redux/store";

const AdminDashboard = () => {
  const { admin } = useAppSelector((store) => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar DrawerList={AdminDrawerList} />
        <section className="lg:flex lg:h-[90vh]">
          <div className="hidden lg:block h-full">
            <AdminDrawerList />
          </div>
          <div className="p-10 w-full lg:w-[80%]  overflow-y-auto">
            <AdminRoutes />
          </div>
        </section>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={deal.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {deal.error
            ? deal.error
            : deal.dealCreated
            ? "Deal created successfully"
            : deal.dealUpdated
            ? "deal updated successfully"
            : admin.categoryUpdated
            ? "Category Updated successfully"
            : ""}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminDashboard;
