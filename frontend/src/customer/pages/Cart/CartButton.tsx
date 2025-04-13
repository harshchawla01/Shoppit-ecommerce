// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useCart } from "../../../hooks/useCart";
// import { Product } from "../../../types/productTypes";
// import { useAuth } from "../../../auth/AuthContext";

// interface AddToCartProps {
//   product: Product;
// }

// const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const { addToCart } = useCart();

//   const [selectedSize, setSelectedSize] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [sizeError, setSizeError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     type: "success" as "success" | "error",
//   });

//   // Parse sizes from string to array
//   const availableSizes = product.sizes
//     ? product.sizes.split(",").map((size) => size.trim())
//     : [];

//   const handleAddToCart = async () => {
//     if (!isLoggedIn) {
//       // Redirect to login if not logged in
//       navigate("/login?redirect=/product-details/" + product.id);
//       return;
//     }

//     if (!selectedSize && availableSizes.length > 0) {
//       setSizeError(true);
//       return;
//     }

//     setLoading(true);
//     try {
//       await addToCart(product.id!, selectedSize, quantity);

//       setNotification({
//         open: true,
//         message: "Item added to cart successfully!",
//         type: "success",
//       });
//     } catch (error) {
//       setNotification({
//         open: true,
//         message: "Failed to add item to cart. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <Box>
//       {availableSizes.length > 0 && (
//         <FormControl fullWidth margin="normal" error={sizeError} required>
//           <InputLabel id="size-select-label">Size</InputLabel>
//           <Select
//             labelId="size-select-label"
//             value={selectedSize}
//             label="Size"
//             onChange={(e) => {
//               setSelectedSize(e.target.value);
//               setSizeError(false);
//             }}
//           >
//             {availableSizes.map((size) => (
//               <MenuItem key={size} value={size}>
//                 {size}
//               </MenuItem>
//             ))}
//           </Select>
//           {sizeError && <FormHelperText>Please select a size</FormHelperText>}
//         </FormControl>
//       )}

//       {product.quantity > 0 ? (
//         <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//           <Button
//             variant="contained"
//             fullWidth
//             startIcon={<ShoppingCartIcon />}
//             onClick={handleAddToCart}
//             disabled={loading}
//           >
//             Add to Cart
//           </Button>
//           <Button variant="outlined" onClick={() => navigate("/cart")}>
//             Go to Cart
//           </Button>
//         </Stack>
//       ) : (
//         <Button variant="contained" fullWidth disabled sx={{ mt: 3 }}>
//           Out of Stock
//         </Button>
//       )}

//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.type}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AddToCart;
