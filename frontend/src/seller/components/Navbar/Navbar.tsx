import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Drawer,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

const Navbar = ({ DrawerList }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, userInfo, login, logout, isSeller } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-[10vh] flex items-center justify-between px-5 border-b">
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleDrawer(true)} color="primary">
          <MenuIcon color="primary" />
        </IconButton>

        <h1
          onClick={() => navigate("/seller")}
          className="logo text-xl cursor-pointer"
          style={{
            fontFamily: '"Pacifico", cursive',
            color: "#00927c",
          }}
        >
          Shoppit Seller
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={userInfo?.avatar || undefined}
            />
            <Box display={{ xs: "none", md: "block" }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {userInfo?.firstName || userInfo?.username || "Seller"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userInfo?.email}
              </Typography>
              {isSeller ? (
                <Typography variant="caption" color="primary" display="block">
                  Seller Account
                </Typography>
              ) : (
                <Typography variant="caption" color="error" display="block">
                  Not a seller account
                </Typography>
              )}
            </Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;
