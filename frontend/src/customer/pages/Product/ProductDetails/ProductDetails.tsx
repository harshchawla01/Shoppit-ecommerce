// // import React, { useEffect, useState } from "react";
// // import StarIcon from "@mui/icons-material/Star";
// // import { teal } from "@mui/material/colors";
// // import {
// //   Box,
// //   Button,
// //   Divider,
// //   Grid,
// //   IconButton,
// //   LinearProgress,
// //   Modal,
// //   Rating,
// // } from "@mui/material";
// // import ShieldIcon from "@mui/icons-material/Shield";
// // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// // import { Wallet } from "@mui/icons-material";
// // import RemoveIcon from "@mui/icons-material/Remove";
// // import AddIcon from "@mui/icons-material/Add";
// // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// // // import SmilarProduct from '../SimilarProduct/SmilarProduct';
// // // import ZoomableImage from './ZoomableImage';
// // // import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
// // // import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
// // import "../ProductCard.css";

// // const style = {
// //   position: "absolute" as "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: "auto",
// //   height: "100%",
// //   // bgcolor: 'background.paper',
// //   boxShadow: 24,
// //   outline: "none",
// // };

// // const productDetailsData = {
// //   images: [
// //     "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950898369.jpg?v=1704965372",
// //     "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950996673_540x.jpg?v=1704965372",
// //     "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950931137_540x.jpg?v=1704965372",
// //     "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261951029441_540x.jpg?v=1704965372",
// //     "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950865601_540x.jpg?v=1704965372",
// //   ],
// //   // seller
// // };

// // const ProductDetails = () => {
// //   //   const [open, setOpen] = useState(false);
// //   //   const handleOpen = () => setOpen(true);
// //   //   const handleClose = () => setOpen(false);
// //   // const dispatch = useAppDispatch();
// //   // const { products } = useAppSelector(store => store)
// //   //   const navigate = useNavigate();
// //   //   const { productId, categoryId } = useParams();
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [quantity, setQuantity] = useState(1);

// //   // useEffect(() => {

// //   //     if (productId) {
// //   //         dispatch(fetchProductById(Number(productId)))
// //   //         dispatch(fetchReviewsByProductId({ productId: Number(productId) }))
// //   //     }
// //   //     dispatch(getAllProducts({ category: categoryId}));

// //   // }, [productId])

// //   // const handleAddCart = () => {
// //   //     dispatch(addItemToCart({
// //   //         jwt: localStorage.getItem('jwt'),
// //   //         request: { productId: Number(productId), size: "FREE", quantity }

// //   //     }))
// //   // }

// //   return (
// //     <div className="px-5 lg:px-20 pt-10 ">
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
// //         <section className="flex flex-col lg:flex-row gap-5">
// //           <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
// //             {productDetailsData.images.map((item, index) => (
// //               <img
// //                 onClick={() => setSelectedImage(index)}
// //                 className="lg:w-full w-[50px] cursor-pointer rounded-md"
// //                 src={item}
// //                 alt=""
// //               />
// //             ))}
// //           </div>
// //           <div className="w-full lg:w-[85%]">
// //             <img
// //               //   onClick={handleOpen}
// //               className="w-full rounded-md cursor-zoom-out"
// //               src={productDetailsData.images[selectedImage]}
// //               alt=""
// //             />
// //           </div>
// //         </section>

// //         <section>
// //           <h1 className="font-bold text-lg text-teal-950">
// //             {/* {productDetailsData.seller?.businessDetails.businessName} */}
// //             BusinessName
// //           </h1>
// //           <p className="text-gray-500 font-semibold">
// //             {/* {productDetailsData.title} */}
// //             Title name
// //           </p>

// //           <div className="space-y-2">
// //             <div className="price flex items-center gap-3 mt-5 text-lg">
// //               <span className="font-semibold text-gray-800">
// //                 {" "}
// //                 {/* ₹{products.product?.sellingPrice} */}
// //                 ₹400
// //               </span>
// //               <span className="text thin-line-through text-gray-400 ">
// //                 {/* ₹{products.product?.mrpPrice} */}
// //                 ₹500
// //               </span>
// //               <span className="text-[#00927c] font-semibold">
// //                 {/* {products.product?.discountPercent}% off */}
// //                 20% off
// //               </span>
// //             </div>
// //             <p className="text-sm">
// //               Inclusive of all taxes. Free Shipping above ₹1500.
// //             </p>
// //           </div>

// //           <div className="mt-7 space-y-3">
// //             <div className="flex items-center gap-4">
// //               <ShieldIcon sx={{ color: teal[400] }} />
// //               <p>Authentic & Quality Assured</p>
// //             </div>

// //             <div className="flex items-center gap-4">
// //               <WorkspacePremiumIcon sx={{ color: teal[400] }} />
// //               <p>100% money back guarantee</p>
// //             </div>

// //             <div className="flex items-center gap-4">
// //               <LocalShippingIcon sx={{ color: teal[400] }} />
// //               <p>Free Shipping & Returns</p>
// //             </div>

// //             <div className="flex items-center gap-4">
// //               <Wallet sx={{ color: teal[400] }} />
// //               <p>Pay on delivery might be available</p>
// //             </div>
// //           </div>

// //           <div className="mt-7 space-y-2">
// //             <h1>QUANTITY:</h1>
// //             <div className=" flex items-center gap-2  w-[140px] justify-between">
// //               <Button
// //                 disabled={quantity == 1}
// //                 onClick={() => setQuantity(quantity - 1)}
// //                 variant="outlined"
// //               >
// //                 <RemoveIcon />
// //               </Button>
// //               <span className="px-3 text-lg font-semibold">{quantity}</span>
// //               <Button
// //                 onClick={() => setQuantity(quantity + 1)}
// //                 variant="outlined"
// //               >
// //                 <AddIcon />
// //               </Button>
// //             </div>
// //           </div>

// //           <div className="mt-12 flex items-center gap-5">
// //             <Button
// //               //   onClick={handleAddCart}
// //               sx={{ py: "1rem" }}
// //               variant="contained"
// //               fullWidth
// //               startIcon={<AddShoppingCartIcon />}
// //             >
// //               Add To Bag
// //             </Button>
// //             <Button
// //               sx={{ py: "1rem" }}
// //               variant="outlined"
// //               fullWidth
// //               startIcon={<FavoriteBorderIcon />}
// //             >
// //               Whishlist
// //             </Button>
// //           </div>
// //           <div className="mt-5">
// //             {/* <p>{products.product?.description}</p> */}
// //             <p>Description</p>
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;

// // // import React, { useEffect, useState } from "react";
// // // import StarIcon from "@mui/icons-material/Star";
// // // import { teal } from "@mui/material/colors";
// // // import {
// // //   Box,
// // //   Button,
// // //   Divider,
// // //   Grid,
// // //   IconButton,
// // //   LinearProgress,
// // //   Modal,
// // //   Rating,
// // // } from "@mui/material";
// // // import ShieldIcon from "@mui/icons-material/Shield";
// // // import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// // // import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// // // import { Wallet } from "@mui/icons-material";
// // // import RemoveIcon from "@mui/icons-material/Remove";
// // // import AddIcon from "@mui/icons-material/Add";
// // // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // // import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// // // // import SmilarProduct from '../SimilarProduct/SmilarProduct';
// // // // import ZoomableImage from './ZoomableImage';
// // // import {
// // //   useAppDispatch,
// // //   useAppSelector,
// // // } from "../../../../Redux Toolkit/Store";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import {
// // //   fetchProductById,
// // //   getAllProducts,
// // // } from "../../../../Redux Toolkit/Customer/ProductSlice";
// // // // import { addItemToCart } from "../../Redux Toolkit/Customer/CartSlice";
// // // import { addItemToCart } from "../../../../Redux Toolkit/Customer/CartSlice";
// // // import "../ProductCard.css";

// // // const style = {
// // //   position: "absolute" as "absolute",
// // //   top: "50%",
// // //   left: "50%",
// // //   transform: "translate(-50%, -50%)",
// // //   width: "auto",
// // //   height: "100%",
// // //   // bgcolor: 'background.paper',
// // //   boxShadow: 24,
// // //   outline: "none",
// // // };

// // // const ProductDetails = () => {
// // //   const [open, setOpen] = useState(false);
// // //   const handleOpen = () => setOpen(true);
// // //   const handleClose = () => setOpen(false);
// // //   const dispatch = useAppDispatch();
// // //   const { products } = useAppSelector((store: any) => store);
// // //   const navigate = useNavigate();
// // //   const { productId, categoryId } = useParams();
// // //   const [selectedImage, setSelectedImage] = useState(0);
// // //   const [quantity, setQuantity] = useState(1);

// // //   useEffect(() => {
// // //     if (productId) {
// // //       dispatch(fetchProductById(Number(productId)));
// // //       // If you have a review slice:
// // //       // dispatch(fetchReviewsByProductId({ productId: Number(productId) }));
// // //     }

// // //     if (categoryId) {
// // //       dispatch(getAllProducts({ category: categoryId }));
// // //     }
// // //   }, [productId, categoryId, dispatch]);

// // //   const handleAddCart = () => {
// // //     // This assumes your CartSlice has an addItemToCart action
// // //     if (productId) {
// // //       dispatch(
// // //         addItemToCart({
// // //           jwt: localStorage.getItem("jwt"),
// // //           request: { productId: Number(productId), size: "FREE", quantity },
// // //         })
// // //       );
// // //     }
// // //   };

// // //   // Check if product is still loading
// // //   if (products.loading) {
// // //     return <LinearProgress color="primary" />;
// // //   }

// // //   // Check if product was not found
// // //   if (!products.product && !products.loading) {
// // //     return <div className="text-center mt-10">Product not found</div>;
// // //   }

// // //   return (
// // //     <div className="px-5 lg:px-20 pt-10">
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
// // //         <section className="flex flex-col lg:flex-row gap-5">
// // //           <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
// // //             {products.product?.images?.map((item: any, index: any) => (
// // //               <img
// // //                 key={index}
// // //                 onClick={() => setSelectedImage(index)}
// // //                 className="lg:w-full w-[50px] cursor-pointer rounded-md"
// // //                 src={item}
// // //                 alt=""
// // //               />
// // //             ))}
// // //           </div>
// // //           <div className="w-full lg:w-[85%]">
// // //             <img
// // //               onClick={handleOpen}
// // //               className="w-full rounded-md cursor-zoom-out"
// // //               src={products.product?.images?.[selectedImage]}
// // //               alt={products.product?.title}
// // //             />
// // //           </div>
// // //         </section>

// // //         <section>
// // //           <h1 className="font-bold text-lg text-teal-950">
// // //             {products.product?.brand || "Brand Name"}
// // //           </h1>
// // //           <p className="text-gray-500 font-semibold">
// // //             {products.product?.title || "Product Title"}
// // //           </p>

// // //           <div className="space-y-2">
// // //             <div className="price flex items-center gap-3 mt-5 text-lg">
// // //               <span className="font-semibold text-gray-800">
// // //                 ₹{products.product?.sellingPrice || 0}
// // //               </span>
// // //               <span className="text thin-line-through text-gray-400">
// // //                 ₹{products.product?.mrpPrice || 0}
// // //               </span>
// // //               <span className="text-[#00927c] font-semibold">
// // //                 {products.product?.discountPercent || 0}% off
// // //               </span>
// // //             </div>
// // //             <p className="text-sm">
// // //               Inclusive of all taxes. Free Shipping above ₹1500.
// // //             </p>
// // //           </div>

// // //           <div className="mt-7 space-y-3">
// // //             <div className="flex items-center gap-4">
// // //               <ShieldIcon sx={{ color: teal[400] }} />
// // //               <p>Authentic & Quality Assured</p>
// // //             </div>

// // //             <div className="flex items-center gap-4">
// // //               <WorkspacePremiumIcon sx={{ color: teal[400] }} />
// // //               <p>100% money back guarantee</p>
// // //             </div>

// // //             <div className="flex items-center gap-4">
// // //               <LocalShippingIcon sx={{ color: teal[400] }} />
// // //               <p>Free Shipping & Returns</p>
// // //             </div>

// // //             <div className="flex items-center gap-4">
// // //               <Wallet sx={{ color: teal[400] }} />
// // //               <p>Pay on delivery might be available</p>
// // //             </div>
// // //           </div>

// // //           <div className="mt-7 space-y-2">
// // //             <h1>QUANTITY:</h1>
// // //             <div className="flex items-center gap-2 w-[140px] justify-between">
// // //               <Button
// // //                 disabled={quantity === 1}
// // //                 onClick={() => setQuantity(quantity - 1)}
// // //                 variant="outlined"
// // //               >
// // //                 <RemoveIcon />
// // //               </Button>
// // //               <span className="px-3 text-lg font-semibold">{quantity}</span>
// // //               <Button
// // //                 onClick={() => setQuantity(quantity + 1)}
// // //                 variant="outlined"
// // //               >
// // //                 <AddIcon />
// // //               </Button>
// // //             </div>
// // //           </div>

// // //           <div className="mt-12 flex items-center gap-5">
// // //             <Button
// // //               onClick={handleAddCart}
// // //               sx={{ py: "1rem" }}
// // //               variant="contained"
// // //               fullWidth
// // //               startIcon={<AddShoppingCartIcon />}
// // //             >
// // //               Add To Bag
// // //             </Button>
// // //             <Button
// // //               sx={{ py: "1rem" }}
// // //               variant="outlined"
// // //               fullWidth
// // //               startIcon={<FavoriteBorderIcon />}
// // //             >
// // //               Wishlist
// // //             </Button>
// // //           </div>
// // //           <div className="mt-5">
// // //             <p>{products.product?.description || "No description available"}</p>
// // //           </div>
// // //         </section>
// // //       </div>

// // //       {/* Image modal for zoomed view */}
// // //       <Modal
// // //         open={open}
// // //         onClose={handleClose}
// // //         aria-labelledby="modal-modal-title"
// // //         aria-describedby="modal-modal-description"
// // //       >
// // //         <Box sx={style}>
// // //           <img
// // //             className="max-h-screen max-w-full"
// // //             src={products.product?.images?.[selectedImage]}
// // //             alt={products.product?.title}
// // //           />
// // //         </Box>
// // //       </Modal>

// // //       {/* Similar products section could go here */}
// // //     </div>
// // //   );
// // // };

// // // export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import { teal } from "@mui/material/colors";
// import { Box, Button, LinearProgress, Modal } from "@mui/material";
// import ShieldIcon from "@mui/icons-material/Shield";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import { Wallet } from "@mui/icons-material";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useAppDispatch, useAppSelector } from "../../../../Redux/store";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   fetchProductById,
//   getAllProducts,
// } from "../../../../Redux/Customer/ProductSlice";
// import { addItemToCart } from "../../../../Redux/Customer/CartSlice";
// import {
//   addProductToWishlist,
//   getWishlistByUserId,
// } from "../../../../Redux/Customer/WishlistSlice";
// import { useAuth } from "../../../../auth/AuthContext";
// // import "./ProductCard.css";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "auto",
//   height: "100%",
//   boxShadow: 24,
//   outline: "none",
// };

// const ProductDetails = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const dispatch = useAppDispatch();
//   const { products } = useAppSelector((store) => store);
//   const { wishlist } = useAppSelector((store) => store.wishlist);
//   const navigate = useNavigate();
//   const { productId, categoryId } = useParams();
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const { isLoggedIn } = useAuth();

//   // Check if product is in wishlist
//   const isInWishlist = wishlist?.products?.some(
//     (product) => product.id === products.product?.id
//   );

//   useEffect(() => {
//     if (productId) {
//       dispatch(fetchProductById(Number(productId)));
//     }

//     if (categoryId) {
//       dispatch(getAllProducts({ category: categoryId }));
//     }

//     // Fetch wishlist if user is logged in
//     if (isLoggedIn) {
//       dispatch(getWishlistByUserId());
//     }
//   }, [productId, categoryId, dispatch, isLoggedIn]);

//   const handleAddCart = () => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     if (productId) {
//       dispatch(
//         addItemToCart({
//           jwt: localStorage.getItem("jwt"),
//           request: { productId: Number(productId), size: "FREE", quantity },
//         })
//       );
//     }
//   };

//   const handleWishlistToggle = () => {
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }

//     if (productId) {
//       dispatch(addProductToWishlist(Number(productId)));
//     }
//   };

//   // Check if product is still loading
//   if (products.loading) {
//     return <LinearProgress color="primary" />;
//   }

//   // Check if product was not found
//   if (!products.product && !products.loading) {
//     return <div className="text-center mt-10">Product not found</div>;
//   }

//   return (
//     <div className="px-5 lg:px-20 pt-10">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <section className="flex flex-col lg:flex-row gap-5">
//           <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
//             {products.product?.images?.map((item, index) => (
//               <img
//                 key={index}
//                 onClick={() => setSelectedImage(index)}
//                 className={`lg:w-full w-[50px] cursor-pointer rounded-md ${
//                   selectedImage === index ? "border-2 border-teal-500" : ""
//                 }`}
//                 src={item}
//                 alt=""
//               />
//             ))}
//           </div>
//           <div className="w-full lg:w-[85%]">
//             <img
//               onClick={handleOpen}
//               className="w-full rounded-md cursor-zoom-in"
//               src={products.product?.images?.[selectedImage]}
//               alt={products.product?.title}
//             />
//           </div>
//         </section>

//         <section>
//           <h1 className="font-bold text-lg text-teal-950">
//             {products.product?.category?.name || "Brand Name"}
//           </h1>
//           <p className="text-gray-500 font-semibold">
//             {products.product?.title || "Product Title"}
//           </p>

//           <div className="space-y-2">
//             <div className="price flex items-center gap-3 mt-5 text-lg">
//               <span className="font-semibold text-gray-800">
//                 ₹{products.product?.sellingPrice || 0}
//               </span>
//               <span className="text thin-line-through text-gray-400">
//                 ₹{products.product?.mrpPrice || 0}
//               </span>
//               <span className="text-[#00927c] font-semibold">
//                 {products.product?.discountPercent || 0}% off
//               </span>
//             </div>
//             <p className="text-sm">
//               Inclusive of all taxes. Free Shipping above ₹1500.
//             </p>
//           </div>

//           <div className="mt-7 space-y-3">
//             <div className="flex items-center gap-4">
//               <ShieldIcon sx={{ color: teal[400] }} />
//               <p>Authentic & Quality Assured</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <WorkspacePremiumIcon sx={{ color: teal[400] }} />
//               <p>100% money back guarantee</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <LocalShippingIcon sx={{ color: teal[400] }} />
//               <p>Free Shipping & Returns</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <Wallet sx={{ color: teal[400] }} />
//               <p>Pay on delivery might be available</p>
//             </div>
//           </div>

//           {(products.product?.quantity ?? 0) > 0 ? (
//             <div className="mt-7 space-y-2">
//               <h1>QUANTITY:</h1>
//               <div className="flex items-center gap-2 w-[140px] justify-between">
//                 <Button
//                   disabled={quantity === 1}
//                   onClick={() => setQuantity(quantity - 1)}
//                   variant="outlined"
//                 >
//                   <RemoveIcon />
//                 </Button>
//                 <span className="px-3 text-lg font-semibold">{quantity}</span>
//                 <Button
//                   onClick={() => setQuantity(quantity + 1)}
//                   variant="outlined"
//                   disabled={quantity >= (products.product?.quantity ?? 0)}
//                 >
//                   <AddIcon />
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="mt-7 space-y-2">
//               <p className="text-red-500 font-bold">Out of Stock</p>
//             </div>
//           )}

//           <div className="mt-12 flex items-center gap-5">
//             <Button
//               onClick={handleAddCart}
//               sx={{ py: "1rem" }}
//               variant="contained"
//               fullWidth
//               startIcon={<AddShoppingCartIcon />}
//               disabled={(products.product?.quantity ?? 0) <= 0}
//             >
//               Add To Bag
//             </Button>
//             <Button
//               onClick={handleWishlistToggle}
//               sx={{ py: "1rem" }}
//               variant="outlined"
//               fullWidth
//               startIcon={
//                 isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />
//               }
//             >
//               {isInWishlist ? "In Wishlist" : "Wishlist"}
//             </Button>
//           </div>
//           <div className="mt-5">
//             <h2 className="font-semibold mb-2">Description:</h2>
//             <p>{products.product?.description || "No description available"}</p>
//           </div>
//         </section>
//       </div>

//       {/* Image modal for zoomed view */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <img
//             className="max-h-screen max-w-full"
//             src={products.product?.images?.[selectedImage]}
//             alt={products.product?.title}
//             onClick={handleClose}
//           />
//         </Box>
//       </Modal>

//       {/* Similar products section could go here */}
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { teal } from "@mui/material/colors";
import { Box, Button, LinearProgress, Modal } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Wallet } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../../../Redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  getAllProducts,
} from "../../../../Redux/Customer/ProductSlice";
import { addItemToCart } from "../../../../Redux/Customer/CartSlice";
import {
  addProductToWishlist,
  getWishlistByUserId,
} from "../../../../Redux/Customer/WishlistSlice";
import { useAuth } from "../../../../auth/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "100%",
  boxShadow: 24,
  outline: "none",
};

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((store) => store);
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const navigate = useNavigate();
  const { productId, categoryId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { isLoggedIn, token } = useAuth();

  // Check if product is in wishlist
  const isInWishlist = wishlist?.products?.some(
    (product) => product.id === products.product?.id
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }

    if (categoryId) {
      dispatch(getAllProducts({ category: categoryId }));
    }

    // Fetch wishlist if user is logged in
    if (isLoggedIn && token) {
      dispatch(getWishlistByUserId(token));
    }
  }, [productId, categoryId, dispatch, isLoggedIn, token]);

  const handleAddCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (productId && token) {
      // console.log("token:", token);
      // console.log("productId:", productId);
      // console.log("quantity:", quantity);
      dispatch(
        addItemToCart({
          token,
          request: { productId: Number(productId), size: "FREE", quantity },
        })
      )
        .unwrap()
        .then(() => {
          console.log("Item added to cart successfully!");
          // You could add a toast notification here
        })
        .catch((error) => {
          console.error("Failed to add item to cart:", error);
          // You could add an error notification here
        });
    }
  };

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (productId && token) {
      dispatch(addProductToWishlist({ token, productId: Number(productId) }))
        .unwrap()
        .then(() => {
          console.log("Wishlist updated successfully!");
          // You could add a toast notification here
        })
        .catch((error) => {
          console.error("Failed to update wishlist:", error);
          // You could add an error notification here
        });
    }
  };

  // Check if product is still loading
  if (products.loading) {
    return <LinearProgress color="primary" />;
  }

  // Check if product was not found
  if (!products.product && !products.loading) {
    return <div className="text-center mt-10">Product not found</div>;
  }

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {products.product?.images?.map((item, index) => (
              <img
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`lg:w-full w-[50px] cursor-pointer rounded-md ${
                  selectedImage === index ? "border-2 border-teal-500" : ""
                }`}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              onClick={handleOpen}
              className="w-full rounded-md cursor-zoom-in"
              src={products.product?.images?.[selectedImage]}
              alt={products.product?.title}
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-teal-950">
            {products.product?.category?.name || "Brand Name"}
          </h1>
          <p className="text-gray-500 font-semibold">
            {products.product?.title || "Product Title"}
          </p>

          <div className="space-y-2">
            <div className="price flex items-center gap-3 mt-5 text-lg">
              <span className="font-semibold text-gray-800">
                ₹{products.product?.sellingPrice || 0}
              </span>
              <span className="text thin-line-through text-gray-400">
                ₹{products.product?.mrpPrice || 0}
              </span>
              <span className="text-[#00927c] font-semibold">
                {products.product?.discountPercent || 0}% off
              </span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <ShieldIcon sx={{ color: teal[400] }} />
              <p>Authentic & Quality Assured</p>
            </div>

            <div className="flex items-center gap-4">
              <WorkspacePremiumIcon sx={{ color: teal[400] }} />
              <p>100% money back guarantee</p>
            </div>

            <div className="flex items-center gap-4">
              <LocalShippingIcon sx={{ color: teal[400] }} />
              <p>Free Shipping & Returns</p>
            </div>

            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[400] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          {(products.product?.quantity ?? 0) > 0 ? (
            <div className="mt-7 space-y-2">
              <h1>QUANTITY:</h1>
              <div className="flex items-center gap-2 w-[140px] justify-between">
                <Button
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                  variant="outlined"
                >
                  <RemoveIcon />
                </Button>
                <span className="px-3 text-lg font-semibold">{quantity}</span>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  variant="outlined"
                  disabled={quantity >= (products.product?.quantity ?? 0)}
                >
                  <AddIcon />
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-7 space-y-2">
              <p className="text-red-500 font-bold">Out of Stock</p>
            </div>
          )}

          <div className="mt-12 flex items-center gap-5">
            <Button
              onClick={handleAddCart}
              sx={{ py: "1rem" }}
              variant="contained"
              fullWidth
              startIcon={<AddShoppingCartIcon />}
              disabled={(products.product?.quantity ?? 0) <= 0}
            >
              Add To Bag
            </Button>
            <Button
              onClick={handleWishlistToggle}
              sx={{ py: "1rem" }}
              variant="outlined"
              fullWidth
              startIcon={
                isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
            >
              {isInWishlist ? "In Wishlist" : "Wishlist"}
            </Button>
          </div>
          <div className="mt-5">
            <h2 className="font-semibold mb-2">Description:</h2>
            <p>{products.product?.description || "No description available"}</p>
          </div>
        </section>
      </div>

      {/* Image modal for zoomed view */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            className="max-h-screen max-w-full"
            src={products.product?.images?.[selectedImage]}
            alt={products.product?.title}
            onClick={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProductDetails;
