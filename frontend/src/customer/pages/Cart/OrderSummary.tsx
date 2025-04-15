import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useCallback } from "react";

interface OrderSummaryProps {
  totalSellingPrice: number;
  discount: number;
  onCheckout: () => void;
}

const OrderSummary = ({
  totalSellingPrice,
  discount,
  onCheckout,
}: OrderSummaryProps) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const deliveryFee = totalSellingPrice > 499 ? 0 : 40;
  const finalAmount = totalSellingPrice + deliveryFee;

  const handleCheckout = useCallback(() => {
    onCheckout();
    if (token) {
      try {
        navigate("/checkout");
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    } else {
      alert("Please log in to proceed with checkout");
    }
  }, [token, onCheckout]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Order Summary
      </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary">
            Price Total
          </Typography>
          <Typography variant="body1">₹{totalSellingPrice}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary">
            Delivery Fee
          </Typography>
          {deliveryFee === 0 ? (
            <Typography variant="body1" color="success.main">
              FREE
            </Typography>
          ) : (
            <Typography variant="body1">₹{deliveryFee}</Typography>
          )}
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight="medium">
            Total Amount
          </Typography>
          <Typography variant="h6" fontWeight="medium">
            ₹{finalAmount}
          </Typography>
        </Stack>

        {discount > 0 && (
          <Typography variant="body2" color="success.main" align="right">
            You're saving ₹{discount} on this order
          </Typography>
        )}
      </Stack>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleCheckout}
        sx={{ mt: 3 }}
      >
        Proceed to Checkout
      </Button>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2, textAlign: "center" }}
      >
        Free delivery on orders above ₹499
      </Typography>
    </Paper>
  );
};

export default OrderSummary;
