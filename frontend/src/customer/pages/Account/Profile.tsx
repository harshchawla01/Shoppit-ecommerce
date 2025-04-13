import { Alert, Divider, Snackbar } from "@mui/material";
// import path from 'path'
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Order from "./Order";
import UserDetails from "./UserDetails";
import OrderDetails from "./OrderDetails";
import Wishlist from "../Wishlist/Wishlist";
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store'
// import { performLogout } from '../../../Redux Toolkit/Customer/AuthSlice'

const menu = [
  { name: "Wishlist", path: "/account/wishlist" },
  { name: "Orders", path: "/account/orders" },
  { name: "Profile", path: "/account/profile" },
  { name: "Logout", path: "/" },
];
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useAppDispatch()
  // const { user,orders } = useAppSelector(store => store)
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  // const handleLogout = () => {
  //     dispatch(performLogout())
  //     navigate("/")
  // }

  const handleClick = (item: any) => {
    // if (item.name === "Logout") {
    //     handleLogout()
    // }
    // else
    navigate(`${item.path}`);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // useEffect(() => {
  //     if (user.profileUpdated || orders.orderCanceled || user.error) {
  //         setOpenSnackbar(true);
  //     }
  // }, [user.profileUpdated,orders.orderCanceled]);
  return (
    <div className="px-5 lg:px-52 min-h-screen mt-10 ">
      <div>
        <h1 className="text-xl font-bold pb-5">
          {/* {user.user?.fullName} */}
          Harsh
        </h1>
      </div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
        <div className="col-span-1 lg:border-r lg:pr-5 py-5 h-full  flex flex-row flex-wrap lg:flex-col gap-3">
          {menu.map((item, index) => (
            <div
              // onClick={() => handleClick(item)}
              className={`${menu.length - 1 !== index ? "border-b" : ""} ${
                item.path == location.pathname
                  ? "bg-primary-color text-white"
                  : ""
              } px-5 py-3 rounded-md hover:bg-teal-500 hover:text-white cursor-pointer `}
            >
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 lg:pl-5 py-5">
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Order />} />

            <Route
              path="/orders/:orderId/:orderItemId"
              element={<OrderDetails />}
            />
            <Route path="/profile" element={<UserDetails />} />
            {/* addresses */}
          </Routes>
        </div>
      </div>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
        //   severity={user.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {user.error
            ? user.error
            : orders.orderCanceled
            ? "order canceled successfully"
            : "success"}
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default Profile;
