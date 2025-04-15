import React from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userInfo, login, logout, isAdmin } = useAuth();

  // Handle login click
  const handleLogin = () => {
    login();
  };

  // Handle logout with redirect
  const handleLogout = () => {
    logout();
    // Will be redirected by the App component's useEffect
  };

  return (
    <div className="h-[10vh] flex items-center justify-between px-5 border-b">
      <div className="flex items-center gap-3 ml-6">
        <h1
          onClick={() => navigate("/admin/sellers")}
          className="logo text-xl cursor-pointer"
          style={{
            fontFamily: '"Pacifico", cursive',
            color: "#6200EA", // Different color for admin section
          }}
        >
          Shoppit Admin
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{ width: 40, height: 40, bgcolor: "#6200EA" }}
              src={userInfo?.avatar || undefined}
            />
            <Box display={{ xs: "none", md: "block" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {userInfo?.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userInfo?.email}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
