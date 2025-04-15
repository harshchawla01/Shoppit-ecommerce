import { useEffect, useMemo, useState } from "react";
import { Box, Button, LinearProgress, Modal } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  getAllProducts,
} from "../../../../redux/customer/productSlice";
import { addItemToCart } from "../../../../redux/customer/cartSlice";
import {
  addProductToWishlist,
  getWishlistByUserId,
} from "../../../../redux/customer/wishlistSlice";
import { useAuth } from "../../../../auth/AuthContext";
import { calculateDiscount } from "../../../../utils/cartCalculator";

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

  const isInWishlist = useMemo(
    () =>
      wishlist?.products?.some((product) => product.id === Number(productId)),
    [wishlist, products.product]
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }

    if (categoryId) {
      dispatch(getAllProducts({ category: categoryId }));
    }

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
        .unwrap() // to convert received action back to promise
        .then(() => {
          console.log("Item added to cart successfully!");
        })
        .catch((error) => {
          console.error("Failed to add item to cart:", error);
        });
    }
  };

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      console.log("Not logged in");
      navigate("/");
      return;
    }

    if (productId && token) {
      dispatch(addProductToWishlist({ token, productId: Number(productId) }))
        .unwrap()
        .then(() => {
          console.log("Wishlist updated successfully!");
        })
        .catch((error) => {
          console.error("Failed to update wishlist:", error);
        });
    }
  };

  if (products.loading) {
    return <LinearProgress color="primary" />;
  }

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
            {products.product?.seller?.businessName || "Brand Name"}
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
                {/* {products.product?.discountPercent || 0}% off */}
                {Math.round(
                  (calculateDiscount(
                    products.product?.mrpPrice!,
                    products.product?.sellingPrice!
                  ) /
                    products.product?.mrpPrice!) *
                    100
                )}
                % off
              </span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
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
