import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import DashboardIcon from "@mui/icons-material/Dashboard";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // If not an admin, show access denied
  if (!isAdmin) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Access denied. You must be an admin to view this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Shoppit Admin Dashboard. Manage sellers, products, and
          more from here.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <StoreIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Seller Management
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Create, view, and manage seller accounts. Control which sellers
                can access the platform.
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: "auto" }}>
              <Button
                size="large"
                color="primary"
                onClick={() => navigate("/admin/sellers")}
                sx={{ width: "100%" }}
              >
                Manage Sellers
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  User Management
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View and manage customer accounts, review user activities and
                permissions.
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: "auto" }}>
              <Button
                size="large"
                color="primary"
                onClick={() => navigate("/admin/users")}
                sx={{ width: "100%" }}
              >
                Manage Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <DashboardIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  System Settings
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Configure platform settings, manage system parameters and view
                platform statistics.
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: "auto" }}>
              <Button
                size="large"
                color="primary"
                onClick={() => navigate("/admin/settings")}
                sx={{ width: "100%" }}
              >
                System Settings
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
