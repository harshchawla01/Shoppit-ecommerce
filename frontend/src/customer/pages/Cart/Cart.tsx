import {
  Alert,
  Button,
  Divider,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { teal } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartItemCard from "./CartItem";
import { useNavigate } from "react-router-dom";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import { fetchUserCart } from "../../../Redux/Customer/CartSlice";
import { CartItem } from "../../../types/cartTypes";
//   import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
import CloseIcon from "@mui/icons-material/Close";
import { Close } from "@mui/icons-material";

const Cart = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { cart, auth } = useAppSelector((store) => store);
  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  // }, [auth.jwt]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {
        // cart.cart && cart.cart?.cartItems.length !== 0 ?
        <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
            <div className="lg:col-span-2 space-y-3 ">
              {[1, 1, 1, 1, 1].map((item: any) => (
                <CartItemCard key={1} />
              ))}
            </div>

            <div className="col-span-1  text-sm space-y-3">
              <section className="border rounded-md">
                <PricingCard />
                <div className="p-5">
                  <Button
                    onClick={() => navigate("/checkout")}
                    sx={{ py: "11px" }}
                    variant="contained"
                    fullWidth
                  >
                    BUY NOW
                  </Button>
                </div>
              </section>

              <div className="border rounded-md px-5 py-4 flex justify-between items-center cursor-pointer">
                <span>Add From Whishlist</span>
                <FavoriteIcon sx={{ color: teal[600], fontSize: "21px" }} />
              </div>
            </div>
          </div>
        </div>
        // ) : (
        //   <div className="h-[85vh] flex justify-center items-center flex-col">
        //     <div className="text-center py-5">
        //       <h1 className="text-lg font-medium">hay its feels so light!</h1>
        //       <p className="text-gray-500 text-sm">
        //         there is nothing in your bag, lets add some items
        //       </p>
        //     </div>
        //     <Button variant="outlined" sx={{ py: "11px" }}>
        //       Add Item From Wishlist
        //     </Button>
        //   </div>
        // )
      }
    </>
  );
};

export default Cart;
