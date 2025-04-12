import DrawerList from "../../../components/drawerList/DrawerList";
import { AccountBox } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const menu = [
  {
    name: "Dashboard",
    path: "/seller",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBagIcon className="text-primary-color" />,
    activeIcon: <ShoppingBagIcon className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <InventoryIcon className="text-primary-color" />,
    activeIcon: <InventoryIcon className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];

interface DrawerListProps {
  toggleDrawer?: any;
}

const SellerDrawerList = ({ toggleDrawer }: DrawerListProps) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default SellerDrawerList;
