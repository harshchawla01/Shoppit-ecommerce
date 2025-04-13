import React from "react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";

interface OrderSummaryProps {
  totalMrpPrice: number;
  totalSellingPrice: number;
  discount: number;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalMrpPrice,
  totalSellingPrice,
  discount,
  onCheckout,
}) => {
  // Calculate delivery fee (you could make this dynamic based on order value)
  const deliveryFee = totalSellingPrice > 499 ? 0 : 40;
  // Calculate final amount
  const finalAmount = totalSellingPrice + deliveryFee;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Order Summary
      </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" color="text.secondary">
            Price ({totalMrpPrice > totalSellingPrice ? "MRP" : "Total"})
          </Typography>
          <Typography variant="body1">₹{totalMrpPrice}</Typography>
        </Stack>

        {discount > 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">
              Discount
            </Typography>
            <Typography variant="body1" color="success.main">
              -₹{discount}
            </Typography>
          </Stack>
        )}

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
        onClick={onCheckout}
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
