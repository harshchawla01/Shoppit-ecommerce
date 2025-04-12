import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Order, OrderItem, OrderState, OrderStatus } from "../../types/orderTypes";
import { Address } from "../../types/userTypes";
import { api } from "../../Config/Api";

const initialState: OrderState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const API_URL = "/api/orders";

// Fetch user order history
export const fetchUserOrderHistory = createAsyncThunk<Order[], string>(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Order[]>(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch order history"
      );
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk<
  Order,
  { orderId: number; jwt: string }
>("orders/fetchOrderById", async ({ orderId, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.get<Order>(`${API_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to fetch order"
    );
  }
});

// Create a new order
export const createOrder = createAsyncThunk<
  Order,
  { address: Address; jwt: string }
>("orders/createOrder", async ({ address, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post<Order>(API_URL, address, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error || "Failed to create order"
    );
  }
});

// Fetch order item by ID
export const fetchOrderItemById = createAsyncThunk<
  OrderItem,
  { orderItemId: number; jwt: string }
>(
  "orders/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderItem>(
        `${API_URL}/item/${orderItemId}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch order item"
      );
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk<Order, number>(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return rejectWithValue("Authorization token not found");
      }
      
      const response = await api.put(
        `${API_URL}/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.currentOrder = null;
      state.orderItem = null;
      state.error = null;
      state.orderCanceled = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user order history
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(
        fetchUserOrderHistory.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.currentOrder = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create a new order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Order Item by ID
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Update the order in orders array
        state.orders = state.orders.map((order:any) =>
          order.id === action.payload.id ? action.payload : order
        );
        // Update current order if it matches
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
        state.orderCanceled = true;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;

// Selectors
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectCurrentOrder = (state: RootState) => state.orders.currentOrder;
export const selectOrderItem = (state: RootState) => state.orders.orderItem;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;
export const selectOrderCanceled = (state: RootState) => state.orders.orderCanceled;