import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const images = [
  "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950898369.jpg?v=1704965372",
  "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950996673_540x.jpg?v=1704965372",
  "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950931137_540x.jpg?v=1704965372",
  "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261951029441_540x.jpg?v=1704965372",
  "https://www.karagiri.com/cdn/shop/products/patola-saree-hot-pink-patola-saree-silk-saree-online-32261950865601_540x.jpg?v=1704965372",
];

const ProductCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    } else {
      clearInterval(interval);
      setCurrentImageIndex(0);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <>
      <div className="group px-4 relative">
        <div
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.map((item, index) => (
            <img
              className="card-media object-top"
              src={item}
              alt=""
              style={{
                transform: `translateX(${(index - currentImageIndex) * 100}%)`,
              }}
            />
          ))}

          {isHovered && (
            <div className="indicator">
              <Button variant="contained" color="success">
                <Favorite sx={{ color: "Background" }} />
              </Button>
            </div>
          )}
        </div>

        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="name">
            <h1>Manyavar</h1>
            <p>Hot-Pink Saree</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">₹ 400</span>
            <span className="thin-line-through text-gray-400">₹ 999</span>
            <span className="text-teal-500">60%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

// import React, { useEffect, useState } from "react";
// import "./ProductCard.css";
// import { Button } from "@mui/material";
// import { Favorite, FavoriteBorder } from "@mui/icons-material";
// import { Product } from "../../../types/productTypes";
// import { Link } from "react-router-dom";
// import { useAppDispatch } from "../../../Redux Toolkit/Store";
// import { addItemToCart } from "../../../Redux Toolkit/Customer/CartSlice";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const dispatch = useAppDispatch();

//   // If product has no images, use a default placeholder
//   const productImages =
//     product?.images?.length > 0
//       ? product.images
//       : ["https://via.placeholder.com/300"];

//   // Parse sizes string into array (assuming comma-separated format)
//   const availableSizes = product.sizes
//     ? product.sizes.split(",").map((size) => size.trim())
//     : ["FREE"];

//   useEffect(() => {
//     // Set default selected size
//     if (availableSizes.length > 0 && !selectedSize) {
//       setSelectedSize(availableSizes[0]);
//     }
//   }, [product]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (isHovered && productImages.length > 1) {
//       interval = setInterval(() => {
//         setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//       }, 1000);
//     } else {
//       if (interval) clearInterval(interval);
//       setCurrentImageIndex(0);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isHovered, productImages.length]);

//   const handleFavoriteClick = (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent navigation
//     e.stopPropagation(); // Prevent event bubbling
//     setIsFavorite(!isFavorite);
//     // Here you would dispatch an action to add/remove from wishlist
//   };

//   const handleQuickAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent navigation
//     e.stopPropagation(); // Prevent event bubbling

//     // Dispatch add to cart action
//     if (product.id) {
//       dispatch(
//         addItemToCart({
//           jwt: localStorage.getItem("jwt"),
//           request: { productId: product.id, size: selectedSize, quantity: 1 },
//         })
//       );
//     }
//   };

//   return (
//     <Link to={`/product/${product.id}`} className="no-underline text-inherit">
//       <div className="group px-4 relative">
//         <div
//           className="card"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {productImages.map((imgUrl, index) => (
//             <img
//               key={index}
//               className="card-media object-top"
//               src={imgUrl}
//               alt={`${product.title} - view ${index + 1}`}
//               style={{
//                 transform: `translateX(${(index - currentImageIndex) * 100}%)`,
//               }}
//             />
//           ))}

//           {isHovered && (
//             <div className="indicator flex gap-2">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleQuickAddToCart}
//                 size="small"
//                 disabled={product.quantity <= 0}
//               >
//                 Quick Add
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleFavoriteClick}
//                 size="small"
//               >
//                 {isFavorite ? (
//                   <Favorite sx={{ color: "white" }} />
//                 ) : (
//                   <FavoriteBorder sx={{ color: "white" }} />
//                 )}
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
//           <div className="name">
//             <h1 className="font-medium">
//               {product.category?.name || "Category"}
//             </h1>
//             <p className="text-gray-600 text-sm truncate">{product.title}</p>
//           </div>
//           <div className="price flex items-center gap-3">
//             <span className="font-sans text-gray-800">
//               ₹{product.sellingPrice}
//             </span>
//             {product.mrpPrice > product.sellingPrice && (
//               <>
//                 <span className="thin-line-through text-gray-400">
//                   ₹{product.mrpPrice}
//                 </span>
//                 <span className="text-teal-500">
//                   {product.discountPercent}%
//                 </span>
//               </>
//             )}
//           </div>
//           {product.quantity > 0 ? (
//             <p className="text-green-600 text-xs">In Stock</p>
//           ) : (
//             <p className="text-red-600 text-xs">Out of Stock</p>
//           )}

//           {/* Display color if available */}
//           {product.color && (
//             <p className="text-xs text-gray-600">Color: {product.color}</p>
//           )}

//           {/* Display available sizes */}
//           {availableSizes.length > 0 && (
//             <div className="sizes-container mt-2">
//               <p className="text-xs text-gray-600 mb-1">Available Sizes:</p>
//               <div className="flex gap-1">
//                 {availableSizes.map((size) => (
//                   <span key={size} className="text-xs border px-2 py-1 rounded">
//                     {size}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
