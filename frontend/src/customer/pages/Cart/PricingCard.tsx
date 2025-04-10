import { Button, Divider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../utils/cartCalculator";
import { useAppSelector } from "../../../Redux/store";

const PricingCard = () => {
  const navigate = useNavigate();
  //   const { cart, auth } = useAppSelector((store) => store);
  return (
    <div>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{/* ₹ {cart.cart?.totalMrpPrice} */}₹ 500</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>
            ₹ 100
            {/* ₹ {" "}
            {sumCartItemMrpPrice(cart.cart?.cartItems || []) -
              sumCartItemSellingPrice(cart.cart?.cartItems || [])} */}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>₹ 79</span>
        </div>
      </div>
      <Divider />

      <div className="font-medium px-5 py-2 flex justify-between items-center">
        <span>Total</span>
        <span>
          ₹ 400
          {/* ₹ {cart.cart?.totalSellingPrice} */}
        </span>
      </div>
    </div>
  );
};
//  sumCartItemSellingPrice(cart.cart?.cartItems || [])
// sumCartItemMrpPrice(cart.cart?.cartItems || [])

export default PricingCard;
