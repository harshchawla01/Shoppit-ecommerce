import React, { MouseEvent } from "react";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/productTypes";
import { useAppDispatch } from "../../../Redux/store";
import CloseIcon from "@mui/icons-material/Close";
import { addProductToWishlist } from "../../../Redux/Customer/WishlistSlice";
import { useAuth } from "../../../auth/AuthContext";

interface ProductCardProps {
  item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  // Function to handle removal from wishlist
  const handleRemoveFromWishlist = (e: MouseEvent) => {
    e.stopPropagation();

    if (item?.id && token) {
      console.log("token:", token);
      dispatch(addProductToWishlist({ token: token!, productId: item.id }));
    }
  };

  // Function to navigate to product details page
  const navigateToProductDetails = () => {
    if (item.id && item.category?.categoryId) {
      navigate(
        `/product-details/${item.category.categoryId}/${item.title
          .replace(/\s+/g, "-")
          .toLowerCase()}/${item.id}`
      );
    }
  };

  return (
    <div
      className="w-60 relative cursor-pointer hover:shadow-md transition-shadow duration-300"
      onClick={navigateToProductDetails}
    >
      <div className="w-full h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          src={item.images[0]}
          alt={`product-${item.title}`}
        />
      </div>
      <div className="pt-3 px-2 pb-4 space-y-1 rounded-md">
        <div className="space-y-1">
          <p className="font-medium truncate">{item.title}</p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-semibold text-gray-800">
            ₹{item.sellingPrice}
          </span>
          <span className="text-gray-400 line-through">₹{item.mrpPrice}</span>
          <span className="text-[#00927c] font-semibold">
            {item.discountPercent}% off
          </span>
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleRemoveFromWishlist}
          className="bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <CloseIcon
            sx={{ color: teal[500], fontSize: "2rem", padding: "4px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
