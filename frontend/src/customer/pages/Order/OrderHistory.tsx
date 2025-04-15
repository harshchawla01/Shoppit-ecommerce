import React, { useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  fetchUserOrderHistory,
  selectOrders,
  selectOrdersLoading,
  selectOrdersError,
} from "../../../redux/customer/orderSlice";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderStatus } from "../../../types/orderTypes";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAuth();

  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserOrderHistory(token));
    }
  }, [dispatch, token]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return "success";
      case OrderStatus.SHIPPED:
        return "info";
      case OrderStatus.PENDING:
        return "warning";
      case OrderStatus.CANCELLED:
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => dispatch(fetchUserOrderHistory(token || ""))}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No Orders Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          You haven't placed any orders yet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products/all")}
        >
          Continue Shopping
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Orders
      </Typography>

      {orders.map((order) => (
        <Paper key={order.id} elevation={2} sx={{ mb: 3, overflow: "hidden" }}>
          <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="subtitle2">ORDER ID</Typography>
                <Typography variant="body2">{order.orderId}</Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant="subtitle2">ORDER DATE</Typography>
                <Typography variant="body2">
                  {formatDate(order.orderDate)}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography variant="subtitle2">TOTAL</Typography>
                <Typography variant="body2">
                  ₹{order.totalSellingPrice}
                </Typography>
              </Grid>
              <Grid
                size={{ xs: 12, md: 3 }}
                textAlign={{ xs: "left", md: "right" }}
              >
                <Chip
                  label={order.orderStatus}
                  color={getStatusColor(order.orderStatus) as any}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Items ({order.numberOfItems})
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price per piece</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.title}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">₹{item.sellingPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Shipping Address</Typography>
              <Typography variant="body2">
                {order.shippingAddress.name}, {order.shippingAddress.address},
                {order.shippingAddress.locality &&
                  ` ${order.shippingAddress.locality},`}
                {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.postalCode}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default OrderHistory;
