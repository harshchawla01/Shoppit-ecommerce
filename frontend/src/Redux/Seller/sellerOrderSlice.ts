import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '../../types/orderTypes';
import { api } from '../../Config/Api';

interface SellerOrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchSellerOrders = createAsyncThunk<Order[], string>(
  'sellerOrders/fetchSellerOrders',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get('/seller/orders', {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("fetch seller orders",response.data)
      return response.data;
    } catch (error: any) {
      console.log("error",error.response)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk<Order, 
{ jwt: string, 
  orderId: number, 
  orderStatus: OrderStatus 
}>(
  'sellerOrders/updateOrderStatus',
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/seller/orders/${orderId}/status/${orderStatus}`, 
        null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order status updated",response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const sellerOrderSlice = createSlice({
  name: 'sellerOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerOrderSlice.reducer;
