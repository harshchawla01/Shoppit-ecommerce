import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";
import OrderHistory from "../Order/OrderHistory";
import Wishlist from "../Wishlist/Wishlist";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  // Determine active tab based on current path
  const currentTab = location.pathname.includes("/account/orders")
    ? 1
    : location.pathname.includes("/account/wishlist")
    ? 2
    : 0;

  // event not needed
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate("/account/profile");
        break;
      case 1:
        navigate("/account/orders");
        break;
      case 2:
        navigate("/account/wishlist");
        break;
    }
  };

  // Basic profile display
  const ProfileInfo = () => (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile Information
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Name
          </Typography>
          <Typography variant="body1">
            {userInfo?.firstName} {userInfo?.lastName}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body1">{userInfo?.email}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Username
          </Typography>
          <Typography variant="body1">{userInfo?.username}</Typography>
        </Grid>
        {userInfo?.phone && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography variant="body1">{userInfo.phone}</Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="account tabs"
        >
          <Tab label="Profile" />
          <Tab label="Orders" />
          <Tab label="Wishlist" />
        </Tabs>
      </Box>

      <Routes>
        <Route path="/" element={<ProfileInfo />} />
        <Route path="/profile" element={<ProfileInfo />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Container>
  );
};

export default Profile;
