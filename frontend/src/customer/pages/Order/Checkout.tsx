import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  createOrder,
  fetchUserOrderHistory,
  selectOrdersLoading,
  selectOrdersError,
} from "../../../redux/customer/orderSlice";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Address } from "../../../types/userTypes";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAuth();

  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    name: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      alert("Please log in to place an order");
      return;
    }

    const requiredFields = [
      "name",
      "address",
      "city",
      "state",
      "postalCode",
      "phone",
    ];
    const missingFields = requiredFields.filter(
      (field) => !shippingAddress[field as keyof Address]
    );

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      await dispatch(
        createOrder({ address: shippingAddress, jwt: token })
      ).unwrap();

      await dispatch(fetchUserOrderHistory(token)).unwrap();

      navigate("/account/orders");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const renderAddressForm = () => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="name"
            value={shippingAddress.name}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Locality/Landmark"
            name="locality"
            value={shippingAddress.locality}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            required
            fullWidth
            label="Address"
            name="address"
            value={shippingAddress.address}
            onChange={handleAddressChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            value={shippingAddress.city}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="State"
            name="state"
            value={shippingAddress.state}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={handleAddressChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            value={shippingAddress.phone}
            onChange={handleAddressChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const renderPaymentMethod = () => (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <RadioGroup defaultValue="cod">
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash on Delivery"
        />
      </RadioGroup>
    </Paper>
  );

  const renderOrderSummary = () => (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={handlePlaceOrder}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Place Order"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}
    </Paper>
  );

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Processing your order...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {renderAddressForm()}
          {renderPaymentMethod()}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>{renderOrderSummary()}</Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
