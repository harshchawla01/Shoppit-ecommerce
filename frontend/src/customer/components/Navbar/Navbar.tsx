import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import CategorySheet from "./CategorySheet";
import { useAuth } from "../../../auth/AuthContext";
import { mainCategory } from "../../../assets/data/category/mainCategory";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme: Theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showCategorySheet, setShowCategorySheet] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("men");
  const navigate = useNavigate();

  const { isLoggedIn, userInfo, login, logout } = useAuth();

  // For debugging
  useEffect(() => {
    console.log("Auth state in Navbar:", { isLoggedIn, userInfo });
  }, [isLoggedIn, userInfo]);

  const handleSignupClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default anchor behavior
    console.log("Navigating to signup page");
    navigate("/signup");
  };

  const handleWishlistClick = () => {
    navigate("/account/wishlist");
  };

  return (
    <>
      <Box
        sx={{ zIndex: 2 }}
        className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80"
      >
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                className="ml-2 cursor-pointer text-lg md:text-2xl"
                onClick={() => navigate("/")}
                style={{
                  fontFamily: '"Pacifico", cursive',
                  color: "#00927c",
                }}
              >
                Shoppit
              </h1>
            </div>
            <ul className="flex items-center font-medium text-gray-800">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => setShowCategorySheet(false)}
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  className="mainCategory hover:text-[#00927c] hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <SearchIcon />
            </IconButton>

            {/* Authentication UI */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg"
                />
                {isLarge && userInfo && (
                  <span className="font-semibold hidden lg:block">
                    {userInfo.username || userInfo.firstName || "User"}
                  </span>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={logout}
                  size="small"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#00927c",
                    "&:hover": {
                      bgcolor: "#007c69",
                    },
                  }}
                  onClick={login}
                  size={isLarge ? "medium" : "small"}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSignupClick}
                  size={isLarge ? "medium" : "small"}
                  sx={{
                    borderColor: "#00927c",
                    color: "#00927c",
                    "&:hover": {
                      borderColor: "#00927c",
                      backgroundColor: "rgba(0, 146, 124, 0.04)",
                    },
                  }}
                >
                  {isLarge ? "New here?" : "Sign up"}
                </Button>
              </div>
            )}

            <IconButton onClick={handleWishlistClick}>
              <FavoriteBorder
                sx={{ fontSize: 35, color: "#00927c" }}
                className="hover:text-teal-600 transition-colors"
              />
            </IconButton>
            <IconButton onClick={() => navigate("/cart")}>
              <AddShoppingCart
                className="text-gray-700"
                sx={{ fontSize: 35 }}
              />
            </IconButton>
          </div>
        </div>
        {showCategorySheet && selectedCategory && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="categorySheet absolute top-[4.41rem] left-20 right-20"
          >
            <CategorySheet
              setShowSheet={setShowCategorySheet}
              selectedCategory={selectedCategory}
            />
          </div>
        )}
      </Box>
    </>
  );
};

export default Navbar;
