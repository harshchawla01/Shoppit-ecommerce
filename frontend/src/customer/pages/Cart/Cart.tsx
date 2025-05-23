import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchUserCart,
  deleteCartItem,
  updateCartItem,
  selectCart,
  selectCartLoading,
  selectCartError,
} from "../../../redux/customer/cartSlice";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const Cart = () => {
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

  console.log("Cart:", cart);

  const handleRemoveItem = (cartItemId: number) => {
    if (token) {
      dispatch(deleteCartItem({ token, cartItemId }));
      console.log("Removed cart item with id", cartItemId);
    }
  };

  const handleUpdateQuantity = (
    cartItemId: number,
    index: number,
    quantity: number
  ) => {
    if (token && quantity > 0) {
      dispatch(
        updateCartItem({
          token,
          cartItemId,
          cartItem: { ...cart?.cartItems[index], quantity },
        })
      );
      console.log("Logging cart from Cart.tsx", cart);
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
            onClick={() => navigate("/products/all")}
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
            {cart.cartItems.map((item, index) => {
              console.log("Cart Item:", item);
              console.log("Cart Item ID:", item.id);
              return (
                <Box key={item.id}>
                  <CartItem
                    item={item}
                    onRemove={() => handleRemoveItem(item.id)}
                    onUpdateQuantity={(newQuantity) =>
                      handleUpdateQuantity(item.id, index, newQuantity)
                    }
                  />
                  {cart.cartItems.indexOf(item) < cart.cartItems.length - 1 && (
                    <Divider />
                  )}
                </Box>
              );
            })}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OrderSummary
            // totalMrpPrice={cart.totalMrpPrice}
            totalSellingPrice={cart.totalSellingPrice}
            discount={cart.totalMrpPrice - cart.totalSellingPrice}
            onCheckout={handleCheckout}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
