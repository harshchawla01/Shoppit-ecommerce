import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Product } from "../../../types/productTypes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useAuth } from "../../../auth/AuthContext";
import { addProductToWishlist } from "../../../redux/customer/wishlistSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // console.log(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, isLoggedIn } = useAuth();
  const { wishlist } = useAppSelector((state) => state.wishlist);

  const isInWishlist = wishlist?.products?.some(
    (item) => item.id === product.id
  );

  const discountPercent =
    product.discountPercent ||
    Math.round(
      ((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100
    );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isHovered && product.images && product.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 1000);
    } else {
      if (interval !== null) {
        clearInterval(interval);
      }
      setCurrentImageIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, product.images]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/products/:category");
      return;
    }

    if (product.id) {
      dispatch(addProductToWishlist({ token: token!, productId: product.id }));
    }
  };

  const handleProductClick = () => {
    if (product.id && product.category) {
      const nameSlug = product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      navigate(
        `/product-details/${product.category.id}/${nameSlug}/${product.id}`
      );
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      className="group px-4 relative cursor-pointer"
      onClick={handleProductClick}
    >
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.images && product.images.length > 0 ? (
          product.images.map((image, index) => (
            <img
              key={index}
              className="card-media object-top"
              src={image}
              alt={product.title}
              style={{
                transform: `translateX(${(index - currentImageIndex) * 100}%)`,
              }}
            />
          ))
        ) : (
          <img className="card-media object-top" src="#" alt={product.title} />
        )}

        <div className="indicator">
          <Button
            variant="contained"
            color="success"
            onClick={handleWishlistToggle}
          >
            {isInWishlist ? (
              <Favorite sx={{ color: "white" }} />
            ) : (
              <FavoriteBorder sx={{ color: "white" }} />
            )}
          </Button>
        </div>
      </div>

      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1 className="text-gray-700 font-semibold">
            {product.seller?.businessName || "Brand"}
          </h1>
          <p className="text-gray-600 truncate">{product.title}</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">
            ₹ {product.sellingPrice}
          </span>
          {product.mrpPrice > product.sellingPrice && (
            <>
              <span className="thin-line-through text-gray-400">
                ₹ {product.mrpPrice}
              </span>
              <span className="text-teal-500">{discountPercent}% OFF</span>
            </>
          )}
        </div>
        {product.quantity <= 0 && (
          <div className="text-red-500 text-sm">Out of Stock</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
