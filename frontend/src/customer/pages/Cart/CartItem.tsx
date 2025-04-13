// import { Button, Divider, IconButton } from "@mui/material";
// import React from "react";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import CloseIcon from "@mui/icons-material/Close";
// import { CartItem } from "../../../types/cartTypes";
// // import { useAppDispatch } from "../../../Redux Toolkit/Store";
// import {
//   deleteCartItem,
//   updateCartItem,
// } from "../../../Redux/Customer/CartSlice";

// interface CartItemProps {
//   item: CartItem;
// }

// // const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
// const CartItemCard = () => {
//   //   const dispatch = useAppDispatch();

//   //   const handleUpdateQuantity = (value: number) => {
//   //     dispatch(
//   //       updateCartItem({
//   //         jwt: localStorage.getItem("jwt"),
//   //         cartItemId: item.id,
//   //         cartItem: { quantity: item.quantity + value },
//   //       })
//   //     );
//   //   };
//   //   const handleRemoveCartItem = () => {
//   //     dispatch(
//   //       deleteCartItem({
//   //         jwt: localStorage.getItem("jwt") || "",
//   //         cartItemId: item.id,
//   //       })
//   //     );
//   //   };
//   return (
//     <div className=" border rounded-md relative">
//       <div className="p-5 flex gap-3">
//         <div>
//           <img
//             className="w-[90px] rounded-md"
//             // src={item.product.images[0]}
//             src="https://www.taneira.com/dw/image/v2/BKMH_PRD/on/demandware.static/-/Sites-Taneira-product-catalog/default/dw422bdf2e/images/Taneira/Catalog/BFW22CW0042_1.jpg?sw=1000&sh=1500"
//             alt=""
//           />
//         </div>
//         <div className="space-y-2">
//           <h1 className="font-semibold text-lg">
//             {/* {item.product?.seller?.businessDetails.businessName} */}
//             Business name
//           </h1>
//           <p className="text-gray-600 font-medium text-sm">
//             Turquoise Blue Stonework Satin Designer Saree
//           </p>
//           <p className="text-gray-400 text-xs">
//             <strong>Sold by:</strong> Natural Lifestyle Products Private Limited
//           </p>
//           <p className="text-xs">
//             <strong>7 days replacement</strong> available
//           </p>
//           <p className="text-sm text-gray-500">
//             <strong>quantity : </strong>
//             {/* {item.quantity} */}1
//           </p>
//         </div>
//       </div>
//       <Divider />
//       <div className="px-5 py-2 flex justify-between items-center">
//         <div className=" flex items-center gap-2  w-[140px] justify-between">
//           <Button
//             size="small"
//             // disabled={item.quantity == 1}
//             // onClick={() => handleUpdateQuantity(-1)}
//           >
//             <RemoveIcon />
//           </Button>
//           <span className="px-3  font-semibold">{/* {item.quantity} */}1</span>
//           <Button
//             size="small"
//             //   onClick={() => handleUpdateQuantity(1)}
//           >
//             <AddIcon />
//           </Button>
//         </div>
//         <div>
//           <p className="text-gray-700 font-medium">
//             {/* ₹{item.sellingPrice} */}
//             ₹400
//           </p>
//         </div>
//       </div>
//       <div className="absolute top-1 right-1">
//         <IconButton
//         // onClick={handleRemoveCartItem} color="primary"
//         >
//           <CloseIcon />
//         </IconButton>
//       </div>
//     </div>
//   );
// };

// export default CartItemCard;

import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem as CartItemType } from "../../../types/cartTypes";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 3, sm: 2 }}>
          <Box
            component="img"
            src={item.product.images[0]}
            alt={item.product.title}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
        </Grid>

        <Grid size={{ xs: 9, sm: 5 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {item.product.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Size: {item.size}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Color: {item.product.color}
          </Typography>

          <Box sx={{ display: { xs: "block", sm: "none" }, mt: 1 }}>
            <Typography variant="h6" color="primary.main">
              ₹{item.sellingPrice}
            </Typography>

            {item.mrpPrice > item.sellingPrice && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{item.mrpPrice}
                </Typography>

                <Typography variant="body2" color="success.main">
                  {Math.round(
                    ((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100
                  )}
                  % off
                </Typography>
              </Stack>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 7, sm: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              width: "fit-content",
            }}
          >
            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Typography
              variant="body1"
              sx={{ px: 2, py: 0.5, minWidth: "2rem", textAlign: "center" }}
            >
              {item.quantity}
            </Typography>

            <IconButton
              size="small"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Button
            startIcon={<DeleteIcon />}
            color="error"
            onClick={onRemove}
            sx={{ mt: 1, textTransform: "none" }}
          >
            Remove
          </Button>
        </Grid>

        <Grid
          size={{ xs: 5, sm: 2 }}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Typography variant="h6" color="primary.main">
            ₹{item.sellingPrice * item.quantity}
          </Typography>

          {item.mrpPrice > item.sellingPrice && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{item.mrpPrice * item.quantity}
              </Typography>

              <Typography variant="body2" color="success.main">
                {Math.round(
                  ((item.mrpPrice - item.sellingPrice) / item.mrpPrice) * 100
                )}
                % off
              </Typography>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
