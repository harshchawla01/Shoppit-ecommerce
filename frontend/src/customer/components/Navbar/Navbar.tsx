// // // // // import React from "react";

// // // // // import MenuIcon from "@mui/icons-material/Menu";
// // // // // import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
// // // // // import SearchIcon from "@mui/icons-material/Search";
// // // // // // import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// // // // // import {
// // // // //   AddShoppingCart,
// // // // //   FavoriteBorder,
// // // // //   Storefront,
// // // // // } from "@mui/icons-material";
// // // // // // import { useTheme } from "styled-components";
// // // // // import { useTheme, Theme } from "@mui/material/styles";

// // // // // const Navbar = () => {
// // // // //   // const theme = useTheme();
// // // // //   const theme: Theme = useTheme();
// // // // //   const isLarge = useMediaQuery(theme.breakpoints.up("lg")); // boolean variable for responsiveness for screen size > lg of mui
// // // // //   return (
// // // // //     <>
// // // // //       <Box>
// // // // //         <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
// // // // //           <div>
// // // // //             <div className="flex items-center gap-2 ">
// // // // //               <IconButton>
// // // // //                 <MenuIcon />
// // // // //               </IconButton>
// // // // //               <h1
// // // // //                 // className="logo cursor-pointer text-lg md:text-2xl text-[#00927c]"
// // // // //                 className="ml-2 cursor-pointer text-lg md:text-2xl"
// // // // //                 style={{
// // // // //                   fontFamily: '"Pacifico", cursive',
// // // // //                   color: "#00927c",
// // // // //                 }}
// // // // //               >
// // // // //                 Shoppit
// // // // //               </h1>
// // // // //             </div>
// // // // //             <ul>
// // // // //               <li></li>
// // // // //             </ul>
// // // // //           </div>
// // // // //           <div className="flex gap-1 lg:gap-6 items-center">
// // // // //             <IconButton>
// // // // //               <SearchIcon />
// // // // //             </IconButton>
// // // // //             {false ? (
// // // // //               <Button className="flex items-center gap-2">
// // // // //                 <Avatar
// // // // //                   sx={{ width: 35, height: 35 }}
// // // // //                   src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg"
// // // // //                 />
// // // // //                 <h1 className="font-semibold hidden lg:block">Harsh</h1>
// // // // //               </Button>
// // // // //             ) : (
// // // // //               <Button variant="contained">Login</Button>
// // // // //             )}

// // // // //             <IconButton>
// // // // //               <FavoriteBorder sx={{ fontSize: 35 }} />
// // // // //             </IconButton>
// // // // //             <IconButton>
// // // // //               <AddShoppingCart
// // // // //                 className="text-gray-700"
// // // // //                 sx={{ fontSize: 35 }}
// // // // //               />
// // // // //             </IconButton>
// // // // //             {/* {isLarge && (
// // // // //               <Button startIcon={<Storefront />}>Create Seller</Button>
// // // // //             )} */}
// // // // //           </div>
// // // // //         </div>
// // // // //       </Box>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Navbar;

// // // // import React, { useState } from "react";
// // // // import MenuIcon from "@mui/icons-material/Menu";
// // // // import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
// // // // import SearchIcon from "@mui/icons-material/Search";
// // // // import {
// // // //   AddShoppingCart,
// // // //   FavoriteBorder,
// // // //   Storefront,
// // // // } from "@mui/icons-material";
// // // // import { useTheme, Theme } from "@mui/material/styles";
// // // // import CategorySheet from "./CategorySheet";

// // // // const Navbar = () => {
// // // //   const theme: Theme = useTheme();
// // // //   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
// // // //   const [showSheet, setShowSheet] = useState(false);
// // // //   const [selectedCategory, setSelectedCategory] = useState("men");

// // // //   // Keycloak login handler
// // // //   const handleLogin = () => {
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Box>
// // // //         <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
// // // //           <div className="flex items-center gap-9">
// // // //             <div className="flex items-center gap-2 ">
// // // //               <IconButton>
// // // //                 <MenuIcon />
// // // //               </IconButton>
// // // //               <h1
// // // //                 className="ml-2 cursor-pointer text-lg md:text-2xl"
// // // //                 style={{
// // // //                   fontFamily: '"Pacifico", cursive',
// // // //                   color: "#00927c",
// // // //                 }}
// // // //               >
// // // //                 Shoppit
// // // //               </h1>
// // // //             </div>
// // // //             <ul>
// // // //               <li></li>
// // // //             </ul>
// // // //           </div>
// // // //           <div className="flex gap-1 lg:gap-6 items-center">
// // // //             <IconButton>
// // // //               <SearchIcon />
// // // //             </IconButton>
// // // //             {false ? (
// // // //               <Button className="flex items-center gap-2">
// // // //                 <Avatar
// // // //                   sx={{ width: 35, height: 35 }}
// // // //                   src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg"
// // // //                 />
// // // //                 <h1 className="font-semibold hidden lg:block">Harsh</h1>
// // // //               </Button>
// // // //             ) : (
// // // //               <Button variant="contained" onClick={handleLogin}>
// // // //                 Login
// // // //               </Button>
// // // //             )}

// // // //             <IconButton>
// // // //               <FavoriteBorder sx={{ fontSize: 35 }} />
// // // //             </IconButton>
// // // //             <IconButton>
// // // //               <AddShoppingCart
// // // //                 className="text-gray-700"
// // // //                 sx={{ fontSize: 35 }}
// // // //               />
// // // //             </IconButton>
// // // //           </div>
// // // //         </div>
// // // //         {showSheet && selectedCategory && (
// // // //           <div
// // // //             onMouseLeave={() => setShowSheet(false)}
// // // //             onMouseEnter={() => setShowSheet(true)}
// // // //             className="categorySheet absolute top-[4.41rem] left-20 right-20 "
// // // //           >
// // // //             <CategorySheet
// // // //               setShowSheet={setShowSheet}
// // // //               selectedCategory={selectedCategory}
// // // //             />
// // // //           </div>
// // // //         )}
// // // //       </Box>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Navbar;

// // // import React, { useState } from "react";
// // // import MenuIcon from "@mui/icons-material/Menu";
// // // import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
// // // import SearchIcon from "@mui/icons-material/Search";
// // // import {
// // //   AddShoppingCart,
// // //   FavoriteBorder,
// // //   Storefront,
// // // } from "@mui/icons-material";
// // // import { useTheme, Theme } from "@mui/material/styles";
// // // import CategorySheet from "./CategorySheet";
// // // import useAuth from "../../../hooks/useAuth";

// // // interface UserInfo {
// // //   id?: string;
// // //   username?: string;
// // //   email?: string;
// // //   firstName?: string;
// // //   lastName?: string;
// // //   [key: string]: any; // For other potential Keycloak profile properties
// // // }

// // // const Navbar: React.FC = () => {
// // //   const theme: Theme = useTheme();
// // //   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
// // //   const [showSheet, setShowSheet] = useState<boolean>(false);
// // //   const [selectedCategory, setSelectedCategory] = useState<string>("men");

// // //   // Use the enhanced authentication hook
// // //   const { isLoggedIn, login, logout } = useAuth();

// // //   // Type guard to ensure userInfo is of the right type
// // //   // const typedUserInfo = userInfo as UserInfo | null;

// // //   return (
// // //     <>
// // //       <Box>
// // //         <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
// // //           <div className="flex items-center gap-9">
// // //             <div className="flex items-center gap-2">
// // //               <IconButton>
// // //                 <MenuIcon />
// // //               </IconButton>
// // //               <h1
// // //                 className="ml-2 cursor-pointer text-lg md:text-2xl"
// // //                 style={{
// // //                   fontFamily: '"Pacifico", cursive',
// // //                   color: "#00927c",
// // //                 }}
// // //               >
// // //                 Shoppit
// // //               </h1>
// // //             </div>
// // //             <ul>
// // //               <li></li>
// // //             </ul>
// // //           </div>
// // //           <div className="flex gap-1 lg:gap-6 items-center">
// // //             <IconButton>
// // //               <SearchIcon />
// // //             </IconButton>
// // //             {isLoggedIn ? (
// // //               <Button className="flex items-center gap-2" onClick={logout}>
// // //                 <Avatar
// // //                   sx={{ width: 35, height: 35 }}
// // //                   src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg"
// // //                 />
// // //                 {/* <h1 className="font-semibold hidden lg:block">
// // //                   {typedUserInfo?.firstName || "User"}
// // //                 </h1> */}
// // //               </Button>
// // //             ) : (
// // //               <Button variant="contained" onClick={login}>
// // //                 Login
// // //               </Button>
// // //             )}

// // //             <IconButton>
// // //               <FavoriteBorder sx={{ fontSize: 35 }} />
// // //             </IconButton>
// // //             <IconButton>
// // //               <AddShoppingCart
// // //                 className="text-gray-700"
// // //                 sx={{ fontSize: 35 }}
// // //               />
// // //             </IconButton>
// // //           </div>
// // //         </div>
// // //         {showSheet && selectedCategory && (
// // //           <div
// // //             onMouseLeave={() => setShowSheet(false)}
// // //             onMouseEnter={() => setShowSheet(true)}
// // //             className="categorySheet absolute top-[4.41rem] left-20 right-20"
// // //           >
// // //             <CategorySheet
// // //               setShowSheet={setShowSheet}
// // //               selectedCategory={selectedCategory}
// // //             />
// // //           </div>
// // //         )}
// // //       </Box>
// // //     </>
// // //   );
// // // };

// // // export default Navbar;

// // // // For login button
// // // <Button variant="contained" onClick={login}>
// // //   Login
// // // </Button>

// // // // For logout button
// // // <Button onClick={logout}>
// // //   Logout
// // // </Button>

// // // // To conditionally render based on auth state
// // // {isLoggedIn ? (
// // //   <UserProfileComponent />
// // // ) : (
// // //   <LoginPrompt />
// // // )}

// // // // To use the token with your own APIs
// // // useEffect(() => {
// // //   if (token) {
// // //     // Use token in your API calls
// // //     fetch('your-api-endpoint', {
// // //       headers: {
// // //         'Authorization': `Bearer ${token}`
// // //       }
// // //     })
// // //     .then(response => response.json())
// // //     .then(data => {
// // //       // Handle data
// // //     });
// // //   }
// // // }, [token]);

// // import React, { useState } from "react";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
// // import SearchIcon from "@mui/icons-material/Search";
// // import {
// //   AddShoppingCart,
// //   FavoriteBorder,
// //   Storefront,
// // } from "@mui/icons-material";
// // import { useTheme, Theme } from "@mui/material/styles";
// // import CategorySheet from "./CategorySheet";
// // import useAuth from "../../../hooks/useAuth";
// // import { mainCategory } from "../../../data/category/mainCategory";
// // import { useNavigate } from "react-router-dom";
// // // import mainCategory from "../../../data/category/mainCategory"

// // interface UserInfo {
// //   id?: string;
// //   username?: string;
// //   email?: string;
// //   firstName?: string;
// //   lastName?: string;
// //   [key: string]: any; // For other potential Keycloak profile properties
// // }

// // const Navbar = () => {
// //   const theme: Theme = useTheme();
// //   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
// //   const [showCategorySheet, setShowCategorySheet] = useState<boolean>(false);
// //   const [selectedCategory, setSelectedCategory] = useState<string>("men");
// //   const navigate = useNavigate();

// //   // Use the enhanced authentication hook
// //   const { isLoggedIn, login, logout } = useAuth();

// //   // Type guard to ensure userInfo is of the right type
// //   // const typedUserInfo = userInfo as UserInfo | null;

// //   return (
// //     <>
// //       <Box
// //         sx={{ zIndex: 2 }}
// //         className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80 "
// //       >
// //         <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
// //           <div className="flex items-center gap-9">
// //             <div className="flex items-center gap-2">
// //               {!isLarge && (
// //                 <IconButton>
// //                   <MenuIcon />
// //                 </IconButton>
// //               )}
// //               <h1
// //                 className="ml-2 cursor-pointer text-lg md:text-2xl"
// //                 onClick={() => navigate("/")}
// //                 style={{
// //                   fontFamily: '"Pacifico", cursive',
// //                   color: "#00927c",
// //                 }}
// //               >
// //                 Shoppit
// //               </h1>
// //             </div>
// //             <ul className="flex items-center font-medium text-gray-800">
// //               {/* {["Men", "Women", "Home", "Electronics"].map((item) => ( */}
// //               {mainCategory.map((item) => (
// //                 <li
// //                   onMouseLeave={() => setShowCategorySheet(false)}
// //                   onMouseEnter={() => {
// //                     setShowCategorySheet(true);
// //                     setSelectedCategory(item.categoryId);
// //                   }}
// //                   className="mainCategory hover:text-[#00927c] hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center"
// //                 >
// //                   {item.name}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //           <div className="flex gap-1 lg:gap-6 items-center">
// //             <IconButton>
// //               <SearchIcon />
// //             </IconButton>
// //             {isLoggedIn ? (
// //               <div>
// //                 <Button className="flex items-center gap-2">
// //                   <Avatar
// //                     sx={{ width: 35, height: 35 }}
// //                     src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg"
// //                   />
// //                   {/* <h1 className="font-semibold hidden lg:block">
// //                 {typedUserInfo?.firstName || "User"}
// //               </h1> */}
// //                 </Button>

// //                 <Button variant="contained" onClick={logout}>
// //                   Logout
// //                 </Button>
// //               </div>
// //             ) : (
// //               <Button variant="contained" onClick={login}>
// //                 Login
// //               </Button>
// //             )}

// //             <IconButton>
// //               <FavoriteBorder sx={{ fontSize: 35 }} />
// //             </IconButton>
// //             <IconButton>
// //               <AddShoppingCart
// //                 onClick={() => navigate("/cart")}
// //                 className="text-gray-700"
// //                 sx={{ fontSize: 35 }}
// //               />
// //             </IconButton>
// //           </div>
// //         </div>
// //         {showCategorySheet && selectedCategory && (
// //           <div
// //             onMouseLeave={() => setShowCategorySheet(false)}
// //             onMouseEnter={() => setShowCategorySheet(true)}
// //             className="categorySheet absolute top-[4.41rem] left-20 right-20"
// //           >
// //             <CategorySheet
// //               setShowSheet={setShowCategorySheet}
// //               selectedCategory={selectedCategory}
// //             />
// //           </div>
// //         )}
// //       </Box>
// //     </>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
// import { useTheme, Theme } from "@mui/material/styles";
// import CategorySheet from "./CategorySheet";
// import useAuth from "../../../hooks/useAuth";
// import { mainCategory } from "../../../data/category/mainCategory";
// import { useNavigate } from "react-router-dom";

// // Interface for user info
// interface UserInfo {
//   id?: string;
//   username?: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   [key: string]: any;
// }

// const Navbar = () => {
//   const theme: Theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const [showCategorySheet, setShowCategorySheet] = useState<boolean>(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>("men");
//   const navigate = useNavigate();

//   // Use the auth hook
//   const { isLoggedIn, userInfo, login, logout } = useAuth();

//   // For debugging
//   useEffect(() => {
//     console.log("Auth state in Navbar:", { isLoggedIn, userInfo });
//   }, [isLoggedIn, userInfo]);

//   return (
//     <>
//       <Box
//         sx={{ zIndex: 2 }}
//         className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80"
//       >
//         <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
//           <div className="flex items-center gap-9">
//             <div className="flex items-center gap-2">
//               {!isLarge && (
//                 <IconButton>
//                   <MenuIcon />
//                 </IconButton>
//               )}
//               <h1
//                 className="ml-2 cursor-pointer text-lg md:text-2xl"
//                 onClick={() => navigate("/")}
//                 style={{
//                   fontFamily: '"Pacifico", cursive',
//                   color: "#00927c",
//                 }}
//               >
//                 Shoppit
//               </h1>
//             </div>
//             <ul className="flex items-center font-medium text-gray-800">
//               {mainCategory.map((item) => (
//                 <li
//                   key={item.categoryId}
//                   onMouseLeave={() => setShowCategorySheet(false)}
//                   onMouseEnter={() => {
//                     setShowCategorySheet(true);
//                     setSelectedCategory(item.categoryId);
//                   }}
//                   className="mainCategory hover:text-[#00927c] hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center"
//                 >
//                   {item.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="flex gap-1 lg:gap-6 items-center">
//             <IconButton>
//               <SearchIcon />
//             </IconButton>

//             {/* Authentication UI */}
//             {isLoggedIn ? (
//               <div className="flex items-center gap-2">
//                 <Avatar
//                   sx={{ width: 35, height: 35 }}
//                   src="https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg"
//                 />
//                 {isLarge && userInfo && (
//                   <span className="font-semibold hidden lg:block">
//                     {userInfo.firstName || userInfo.username || "User"}
//                   </span>
//                 )}
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={logout}
//                   size="small"
//                 >
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="contained" color="primary" onClick={login}>
//                 Login
//               </Button>
//             )}

//             <IconButton>
//               <FavoriteBorder sx={{ fontSize: 35 }} />
//             </IconButton>
//             <IconButton onClick={() => navigate("/cart")}>
//               <AddShoppingCart
//                 className="text-gray-700"
//                 sx={{ fontSize: 35 }}
//               />
//             </IconButton>
//           </div>
//         </div>
//         {showCategorySheet && selectedCategory && (
//           <div
//             onMouseLeave={() => setShowCategorySheet(false)}
//             onMouseEnter={() => setShowCategorySheet(true)}
//             className="categorySheet absolute top-[4.41rem] left-20 right-20"
//           >
//             <CategorySheet
//               setShowSheet={setShowCategorySheet}
//               selectedCategory={selectedCategory}
//             />
//           </div>
//         )}
//       </Box>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Button, IconButton, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import CategorySheet from "./CategorySheet";
import { useAuth } from "../../../auth/AuthContext"; // Update this path
import { mainCategory } from "../../../data/category/mainCategory";
import { useNavigate } from "react-router-dom";

// Interface for user info
interface UserInfo {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

const Navbar = () => {
  const theme: Theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showCategorySheet, setShowCategorySheet] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("men");
  const navigate = useNavigate();

  // Use the shared auth context
  const { isLoggedIn, userInfo, login, logout } = useAuth();

  // For debugging
  useEffect(() => {
    console.log("Auth state in Navbar:", { isLoggedIn, userInfo });
  }, [isLoggedIn, userInfo]);

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
              <Button variant="contained" color="primary" onClick={login}>
                Login
              </Button>
            )}

            <IconButton>
              <FavoriteBorder sx={{ fontSize: 35 }} />
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
