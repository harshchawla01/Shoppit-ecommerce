import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  updateSeller,
  resetProfileUpdated,
  selectSellerProfile,
  selectSellerLoading,
  selectProfileUpdated,
  selectSellerError,
} from "../../../Redux/Seller/sellerSlice";
import { useAuth } from "../../../auth/AuthContext";

const SellerAccount = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  const profile = useAppSelector(selectSellerProfile);
  const loading = useAppSelector(selectSellerLoading);
  const profileUpdated = useAppSelector(selectProfileUpdated);
  const error = useAppSelector(selectSellerError);

  // Flattened form state
  const [formData, setFormData] = useState({
    id: 1,
    username: "",
    mobile: "",
    GSTIN: "",

    // Flattened business details
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    logo: "",

    // Flattened bank details
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",

    // Address remains the same
    pickupAddress: {
      name: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Initialize form with profile data when it's loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id || 0,
        username: profile.username || "",
        mobile: profile.mobile || "",
        GSTIN: profile.GSTIN || "",

        // Flattened business details
        businessName: profile.businessName || "",
        businessEmail: profile.businessEmail || "",
        businessPhone: profile.businessPhone || "",
        businessAddress: profile.businessAddress || "",
        logo: profile.logo || "",

        // Flattened bank details
        accountHolderName: profile.accountHolderName || "",
        accountNumber: profile.accountNumber || "",
        ifscCode: profile.ifscCode || "",

        // Address remains the same
        pickupAddress: {
          name: profile.pickupAddress?.name || "",
          locality: profile.pickupAddress?.locality || "",
          address: profile.pickupAddress?.address || "",
          city: profile.pickupAddress?.city || "",
          state: profile.pickupAddress?.state || "",
          postalCode: profile.pickupAddress?.postalCode || "",
          phone: profile.pickupAddress?.phone || "",
        },
      });
    }
  }, [profile]);

  useEffect(() => {
    if (profileUpdated) {
      setOpenSnackbar(true);
      const timer = setTimeout(() => {
        dispatch(resetProfileUpdated());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [profileUpdated, dispatch]);

  // Handle form field changes for flattened structure
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!token) {
      console.error("No authentication token available");
      return;
    }

    dispatch(updateSeller({ seller: formData, token }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Seller Account
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Basic Information (Not Editable)
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              disabled
              margin="normal"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Editable Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="GSTIN"
                name="GSTIN"
                value={formData.GSTIN}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Business Details Section */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Business Details
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Phone"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Address"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>

            {/* Bank Details Section */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Bank Details
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Pickup Address - kept as is */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Pickup Address
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Name"
                name="pickupAddress.name"
                value={formData.pickupAddress.name}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Locality"
                name="pickupAddress.locality"
                value={formData.pickupAddress.locality}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                name="pickupAddress.address"
                value={formData.pickupAddress.address}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="City"
                name="pickupAddress.city"
                value={formData.pickupAddress.city}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="State"
                name="pickupAddress.state"
                value={formData.pickupAddress.state}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Postal Code"
                name="pickupAddress.postalCode"
                value={formData.pickupAddress.postalCode}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="pickupAddress.phone"
                value={formData.pickupAddress.phone}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SellerAccount;
