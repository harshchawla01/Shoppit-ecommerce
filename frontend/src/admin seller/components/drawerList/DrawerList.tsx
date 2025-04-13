// // import * as React from "react";
// // import Divider from "@mui/material/Divider";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // import ListItemText from "@mui/material/ListItemText";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useAppDispatch } from "../../../Redux/store";

// // export interface Menu {
// //   name: string;
// //   path: string;
// //   icon: React.ReactElement<any>;
// //   activeIcon: React.ReactElement<any>;
// // }

// // interface DrawerListProps {
// //   toggleDrawer?: any;
// //   menu: Menu[];
// //   menu2: Menu[];
// // }

// // const DrawerList = ({ toggleDrawer, menu, menu2 }: DrawerListProps) => {
// //   const dispatch = useAppDispatch();

// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   //   const handleLogout = () => {
// //   //     dispatch(performLogout());
// //   //   };

// //   const handleClick = (item: any) => () => {
// //     // if (item.name === "Logout") {
// //     //   handleLogout();
// //     // }
// //     // navigate(item.path);
// //     if (toggleDrawer) toggleDrawer(false)();
// //   };
// //   return (
// //     <div className="h-full">
// //       <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
// //         <div>
// //           <div className="space-y-2">
// //             {menu.map((item, index) => (
// //               <div
// //                 key={item.name}
// //                 onClick={handleClick(item)}
// //                 className="pr-9 cursor-pointer"
// //               >
// //                 <p
// //                   className={`${
// //                     item.path === location.pathname
// //                       ? "bg-primary-color text-white "
// //                       : "text-primary-color"
// //                   } flex items-center px-5 py-3 rounded-r-full`}
// //                 >
// //                   <ListItemIcon>
// //                     {location.pathname === item.path
// //                       ? item.activeIcon
// //                       : item.icon}
// //                   </ListItemIcon>
// //                   <ListItemText primary={item.name} />
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <div className="space-y-4">
// //           <Divider />
// //           <div className="space-y-2">
// //             {menu2.map((item, index) => (
// //               <div
// //                 onClick={handleClick(item)}
// //                 className="pr-9 cursor-pointer"
// //                 key={item.name}
// //               >
// //                 <p
// //                   className={`${
// //                     item.path === location.pathname
// //                       ? " bg-primary-color text-white "
// //                       : "text-primary-color"
// //                   } flex items-center px-5 py-3 rounded-r-full`}
// //                 >
// //                   <ListItemIcon>
// //                     {location.pathname === item.path
// //                       ? item.activeIcon
// //                       : item.icon}
// //                   </ListItemIcon>
// //                   <ListItemText primary={item.name} />
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DrawerList;

// import * as React from "react";
// import Divider from "@mui/material/Divider";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../auth/AuthContext";

// export interface Menu {
//   name: string;
//   path: string;
//   icon: React.ReactElement<any>;
//   activeIcon: React.ReactElement<any>;
// }

// interface DrawerListProps {
//   toggleDrawer?: any;
//   menu: Menu[];
//   menu2: Menu[];
// }

// const DrawerList = ({ toggleDrawer, menu, menu2 }: DrawerListProps) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const handleClick = (item: Menu) => () => {
//     // Handle Logout specially
//     if (item.name === "Logout") {
//       logout();
//       navigate("/");
//     } else {
//       // Navigate to the specified path
//       navigate(item.path);
//     }

//     // Close the drawer if toggleDrawer function exists
//     if (toggleDrawer) {
//       toggleDrawer(false)();
//     }
//   };

//   return (
//     <div className="h-full">
//       <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
//         <div>
//           <div className="space-y-2">
//             {menu.map((item) => (
//               <div
//                 key={item.name}
//                 onClick={handleClick(item)}
//                 className="pr-9 cursor-pointer"
//               >
//                 <p
//                   className={`${
//                     item.path === location.pathname
//                       ? "bg-primary-color text-white "
//                       : "text-primary-color"
//                   } flex items-center px-5 py-3 rounded-r-full`}
//                 >
//                   <ListItemIcon>
//                     {location.pathname === item.path
//                       ? item.activeIcon
//                       : item.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={item.name} />
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="space-y-4">
//           <Divider />
//           <div className="space-y-2">
//             {menu2.map((item) => (
//               <div
//                 onClick={handleClick(item)}
//                 className="pr-9 cursor-pointer"
//                 key={item.name}
//               >
//                 <p
//                   className={`${
//                     item.path === location.pathname
//                       ? " bg-primary-color text-white "
//                       : "text-primary-color"
//                   } flex items-center px-5 py-3 rounded-r-full`}
//                 >
//                   <ListItemIcon>
//                     {location.pathname === item.path
//                       ? item.activeIcon
//                       : item.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={item.name} />
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrawerList;

import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

export interface Menu {
  name: string;
  path: string;
  icon: React.ReactElement<any>;
  activeIcon: React.ReactElement<any>;
}

interface DrawerListProps {
  toggleDrawer?: any;
  menu: Menu[];
  menu2: Menu[];
}

const DrawerList = ({ toggleDrawer, menu, menu2 }: DrawerListProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = (item: Menu) => () => {
    // Handle special cases
    if (item.name === "Logout") {
      logout();
      navigate("/");
    } else {
      navigate(item.path);
    }

    // Close the drawer if toggleDrawer function exists
    if (toggleDrawer) {
      toggleDrawer(false)();
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5">
        <div>
          <div className="space-y-2">
            {menu.map((item) => (
              <div
                key={item.name}
                onClick={handleClick(item)}
                className="pr-9 cursor-pointer"
              >
                <p
                  className={`${
                    location.pathname === item.path ||
                    (item.path === "/seller" &&
                      location.pathname.startsWith("/seller"))
                      ? "bg-primary-color text-white "
                      : "text-primary-color"
                  } flex items-center px-5 py-3 rounded-r-full`}
                >
                  <ListItemIcon>
                    {location.pathname === item.path ||
                    (item.path === "/seller" &&
                      location.pathname.startsWith("/seller"))
                      ? item.activeIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Divider />
          <div className="space-y-2">
            {menu2.map((item) => (
              <div
                onClick={handleClick(item)}
                className="pr-9 cursor-pointer"
                key={item.name}
              >
                <p
                  className={`${
                    location.pathname === item.path
                      ? " bg-primary-color text-white "
                      : "text-primary-color"
                  } flex items-center px-5 py-3 rounded-r-full`}
                >
                  <ListItemIcon>
                    {location.pathname === item.path
                      ? item.activeIcon
                      : item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
