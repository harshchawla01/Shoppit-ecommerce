import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/wishlistTypes";
import { api } from "../../config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

// Fetch the wishlist for the current authenticated user
export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch wishlist"
      );
    }
  }
);

// Add a product to the current user's wishlist
export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ token, productId }: { token: string, productId: number }, { rejectWithValue }) => {
    try {
      console.log({ token, productId });
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Failed to add product to wishlist"
      );
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProductFromWishlist",
  async ({ token, productId }: { token: string, productId: number }, { rejectWithValue }) => {
    try {
      console.log({ token, productId });
      const response = await api.post(
        `/api/wishlist/remove-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Failed to remove product from wishlist"
      );
    }
  }
);

// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getWishlistByUserId
    builder.addCase(getWishlistByUserId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getWishlistByUserId.fulfilled,
      (state, action: PayloadAction<Wishlist>) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getWishlistByUserId.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    // addProductToWishlist
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addProductToWishlist.fulfilled,
      (state, action: PayloadAction<Wishlist>) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      addProductToWishlist.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(removeProductFromWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      removeProductFromWishlist.fulfilled,
      (state, action: PayloadAction<Wishlist>) => {
        state.wishlist = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      removeProductFromWishlist.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { resetWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;