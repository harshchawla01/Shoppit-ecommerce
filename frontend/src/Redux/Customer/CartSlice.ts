import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem } from "../../types/cartTypes";
import { api } from "../../Config/Api";
import { RootState } from "../store";
import { 
  sumCartItemMrpPrice, 
  sumCartItemSellingPrice, 
  countTotalItems,
  calculateDiscount
} from "../../utils/cartCalculator";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Define the base URL for the API
const API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk<Cart, string>(
  "cart/fetchUserCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Cart fetched ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch user cart");
    }
  }
);

interface AddItemRequest {
  productId: number | undefined;
  size: string;
  quantity: number;
}

export const addItemToCart = createAsyncThunk<
  CartItem,
  { token: string; request: AddItemRequest }
>("cart/addItemToCart", async ({ token, request }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${API_URL}/add`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Cart added ", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error ", error.response);
    return rejectWithValue("Failed to add item to cart");
  }
});

export const deleteCartItem = createAsyncThunk<
  any,
  { token: string; cartItemId: number }
>("cart/deleteCartItem", async ({ token, cartItemId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete cart item"
    );
  }
});

export const updateCartItem = createAsyncThunk<
  any,
  { token: string; cartItemId: number; cartItem: any }
>(
  "cart/updateCartItem",
  async ({ token, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        cartItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

// Helper function to update cart totals
const updateCartTotals = (cart: Cart): Cart => {
  const mrpPrice = sumCartItemMrpPrice(cart.cartItems);
  const sellingPrice = sumCartItemSellingPrice(cart.cartItems);
  const numberOfItems = countTotalItems(cart.cartItems);
  const discount = calculateDiscount(mrpPrice, sellingPrice);
  
  return {
    ...cart,
    totalMrpPrice: mrpPrice,
    totalSellingPrice: sellingPrice,
    numberOfItems: numberOfItems,
    discount: discount
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.cart = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addItemToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          if (state.cart) {
            state.cart.cartItems.push(action.payload);
            state.cart = updateCartTotals(state.cart);
          }
          state.loading = false;
        }
      )
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // cart item delete
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item: CartItem) => item.id !== action.meta.arg.cartItemId
          );
          state.cart = updateCartTotals(state.cart);
        }
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // cart item update
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(
            (item: CartItem) => item.id === action.meta.arg.cartItemId
          );
          if (index !== -1) {
            state.cart.cartItems[index] = {
              ...state.cart.cartItems[index],
              ...action.payload,
            };
          }
          state.cart = updateCartTotals(state.cart);
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;