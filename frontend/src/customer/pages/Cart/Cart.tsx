// import {
//   Alert,
//   Button,
//   Divider,
//   IconButton,
//   Snackbar,
//   TextField,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";

// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import { teal } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CartItemCard from "./CartItem";
// import { useNavigate } from "react-router-dom";
// import PricingCard from "./PricingCard";
// import { useAppDispatch, useAppSelector } from "../../../Redux/store";
// import { fetchUserCart } from "../../../Redux/Customer/CartSlice";
// import { CartItem } from "../../../types/cartTypes";
// //   import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
// import CloseIcon from "@mui/icons-material/Close";
// import { Close } from "@mui/icons-material";

// const Cart = () => {
//   const navigate = useNavigate();
//   // const dispatch = useAppDispatch();
//   // const { cart, auth } = useAppSelector((store) => store);
//   const [couponCode, setCouponCode] = useState("");
//   const [snackbarOpen, setOpenSnackbar] = useState(false);

//   // useEffect(() => {
//   //   dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
//   // }, [auth.jwt]);

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <>
//       {
//         // cart.cart && cart.cart?.cartItems.length !== 0 ?
//         <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
//             <div className="lg:col-span-2 space-y-3 ">
//               {[1, 1, 1, 1, 1].map((item: any) => (
//                 <CartItemCard key={1} />
//               ))}
//             </div>

//             <div className="col-span-1  text-sm space-y-3">
//               <section className="border rounded-md">
//                 <PricingCard />
//                 <div className="p-5">
//                   <Button
//                     onClick={() => navigate("/checkout")}
//                     sx={{ py: "11px" }}
//                     variant="contained"
//                     fullWidth
//                   >
//                     BUY NOW
//                   </Button>
//                 </div>
//               </section>

//               <div className="border rounded-md px-5 py-4 flex justify-between items-center cursor-pointer">
//                 <span>Add From Whishlist</span>
//                 <FavoriteIcon sx={{ color: teal[600], fontSize: "21px" }} />
//               </div>
//             </div>
//           </div>
//         </div>
//         // ) : (
//         //   <div className="h-[85vh] flex justify-center items-center flex-col">
//         //     <div className="text-center py-5">
//         //       <h1 className="text-lg font-medium">hay its feels so light!</h1>
//         //       <p className="text-gray-500 text-sm">
//         //         there is nothing in your bag, lets add some items
//         //       </p>
//         //     </div>
//         //     <Button variant="outlined" sx={{ py: "11px" }}>
//         //       Add Item From Wishlist
//         //     </Button>
//         //   </div>
//         // )
//       }
//     </>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  fetchUserCart,
  deleteCartItem,
  updateCartItem,
  selectCart,
  selectCartLoading,
  selectCartError,
} from "../../../Redux/Customer/CartSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAuth();

  const cart = useAppSelector(selectCart);
  const loading = useAppSelector(selectCartLoading);
  const error = useAppSelector(selectCartError);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserCart(token));
    }
  }, [dispatch, token]);

  const handleRemoveItem = (cartItemId: number) => {
    if (token) {
      dispatch(deleteCartItem({ token, cartItemId }));
    }
  };

  const handleUpdateQuantity = (cartItemId: number, quantity: number) => {
    if (token && quantity > 0) {
      dispatch(
        updateCartItem({
          token,
          cartItemId,
          cartItem: { quantity },
        })
      );
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6">Loading your cart...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <ShoppingCartIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart ({cart.numberOfItems}{" "}
        {cart.numberOfItems === 1 ? "item" : "items"})
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={2}>
            {cart.cartItems.map((item) => (
              <Box key={item.id}>
                <CartItem
                  item={item}
                  onRemove={() => handleRemoveItem(item.id)}
                  onUpdateQuantity={(newQuantity) =>
                    handleUpdateQuantity(item.id, newQuantity)
                  }
                />
                {cart.cartItems.indexOf(item) < cart.cartItems.length - 1 && (
                  <Divider />
                )}
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummary
            totalMrpPrice={cart.totalMrpPrice}
            totalSellingPrice={cart.totalSellingPrice}
            discount={cart.discount}
            onCheckout={handleCheckout}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
