import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { getWishlistByUserId } from "../../../redux/customer/wishlistSlice";
import WishlistProductCard from "./WishlistProductCard";
import { useAuth } from "../../../auth/AuthContext";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store);
  const { isLoggedIn, token } = useAuth();

  useEffect(() => {
    if (isLoggedIn && token) {
      dispatch(getWishlistByUserId(token));
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <div className="h-[85vh] p-5 lg:p-20">
      {wishlist.loading ? (
        <div className="h-full flex justify-center items-center">
          <p>Loading your wishlist...</p>
        </div>
      ) : wishlist.wishlist?.products &&
        wishlist.wishlist.products.length > 0 ? (
        <section>
          <h1 className="text-2xl mb-5">
            <strong>My Wishlist</strong> ({wishlist.wishlist.products.length}{" "}
            items)
          </h1>
          <div className="pt-5 flex flex-wrap gap-5">
            {wishlist.wishlist.products.map((item) => (
              <WishlistProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-xl font-medium">Hey, it feels so light!</h1>
            <p className="text-gray-500 mt-2">
              There's nothing in your wishlist. Let's add some items!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
