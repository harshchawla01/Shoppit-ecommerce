// import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   Avatar,
//   Drawer,
//   IconButton,
//   Button,
//   Box,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../auth/AuthContext";

// const AdminNavbar = ({ DrawerList }: any) => {
//   const navigate = useNavigate();
//   const [open, setOpen] = React.useState(false);
//   const { isLoggedIn, userInfo, login, logout, isAdmin } = useAuth();

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };

//   // Handle login click
//   const handleLogin = () => {
//     login();
//   };

//   // Handle logout with redirect
//   const handleLogout = () => {
//     logout();
//     // Will be redirected by the App component's useEffect
//   };

//   return (
//     <div className="h-[10vh] flex items-center justify-between px-5 border-b">
//       <div className="flex items-center gap-3">
//         <IconButton onClick={toggleDrawer(true)} color="primary">
//           <MenuIcon color="primary" />
//         </IconButton>

//         <h1
//           onClick={() => navigate("/admin")}
//           className="logo text-xl cursor-pointer"
//           style={{
//             fontFamily: '"Pacifico", cursive',
//             color: "#6200EA", // Different color for admin section
//           }}
//         >
//           Shoppit Admin
//         </h1>
//       </div>

//       <div className="flex items-center gap-4">
//         {isLoggedIn ? (
//           <Box display="flex" alignItems="center" gap={2}>
//             <Avatar
//               sx={{ width: 40, height: 40, bgcolor: "#6200EA" }}
//               src={userInfo?.avatar || undefined}
//             />
//             <Box display={{ xs: "none", md: "block" }}>
//               <Typography variant="subtitle1" fontWeight="bold">
//                 {userInfo?.firstName || userInfo?.username || "Admin"}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {userInfo?.email}
//               </Typography>
//               {isAdmin ? (
//                 <Typography variant="caption" color="secondary" display="block">
//                   Admin Account
//                 </Typography>
//               ) : (
//                 <Typography variant="caption" color="error" display="block">
//                   Not an admin account
//                 </Typography>
//               )}
//             </Box>
//             <Button
//               variant="outlined"
//               color="secondary"
//               size="small"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Box>
//         ) : (
//           <Button variant="contained" color="secondary" onClick={handleLogin}>
//             Login
//           </Button>
//         )}
//       </div>

//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         <DrawerList toggleDrawer={toggleDrawer} />
//       </Drawer>
//     </div>
//   );
// };

// export default AdminNavbar;

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
import AddIcon from "@mui/icons-material/Add";

const AdminNavbar = ({ DrawerList }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, userInfo, login, logout, isAdmin } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Handle login click
  const handleLogin = () => {
    login();
  };

  // Handle logout with redirect
  const handleLogout = () => {
    logout();
    // Will be redirected by the App component's useEffect
  };

  // Navigate to create seller form
  const handleCreateSeller = () => {
    navigate("/admin/create-seller");
  };

  return (
    <div className="h-[10vh] flex items-center justify-between px-5 border-b">
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleDrawer(true)} color="primary">
          <MenuIcon color="primary" />
        </IconButton>

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
                {userInfo?.firstName || userInfo?.username || "Admin"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userInfo?.email}
              </Typography>
              {isAdmin ? (
                <Typography variant="caption" color="secondary" display="block">
                  Admin Account
                </Typography>
              ) : (
                <Typography variant="caption" color="error" display="block">
                  Not an admin account
                </Typography>
              )}
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

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default AdminNavbar;
