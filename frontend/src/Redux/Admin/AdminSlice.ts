import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import { HomeCategory } from '../../types/homeDataTypes';
import { api } from '../../Config/Api';
import axios from 'axios';
import { Seller } from '../../types/sellerTypes';
import { SignupRequest } from '../../types/authTypes';

const API_URL = '/api/admin';

interface SellerState {
  sellers: Seller[];
  selectedSeller: Seller | null;
  profile: Seller | null;
  loading: boolean;
  error: string | null;
  profileUpdated: boolean;
}

// Define the initial state
const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  profileUpdated:false,
};

export const createSeller = createAsyncThunk<Seller, Seller>(
  'admin/createSeller',
  async (seller: SignupRequest, { rejectWithValue }) => {
      try {
          const response = await api.post<Seller>(`${API_URL}/createSeller`, seller);
          console.log('create seller', response.data);
          return response.data;
      } catch (error:any) {
          if (axios.isAxiosError(error) && error.response) {
              console.error('Create seller error response data:', error.response.data);
              console.error('Create seller error response status:', error.response.status);
              console.error('Create seller error response headers:', error.response.headers);
              return rejectWithValue(error.message);
          } else {
              console.error('Create seller error message:', error.message);
              return rejectWithValue('Failed to create seller');
          }
      }
  }
);

export const fetchSellers = createAsyncThunk<Seller[], string>(
  "admin/fetchSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller[]>(`${API_URL}/allSellers`, {
        params: {
          status,
        },
      });
      console.log("fetch sellers", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch sellers error response data:",
          error.response.data
        );
        console.error(
          "Fetch sellers error response status:",
          error.response.status
        );
        console.error(
          "Fetch sellers error response headers:",
          error.response.headers
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch sellers error message:", error.message);
        return rejectWithValue("Failed to fetch sellers");
      }
    }
  }
);

export const deleteSeller = createAsyncThunk<void, number>(
  "admin/deleteSeller",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/deleteSeller/${id}`);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Delete seller error response data:",
          error.response.data
        );
        console.error(
          "Delete seller error response status:",
          error.response.status
        );
        console.error(
          "Delete seller error response headers:",
          error.response.headers
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Delete seller error message:", error.message);
        return rejectWithValue("Failed to delete seller");
      }
    }
  }
);

// Create the slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      fetchSellers.fulfilled,
      (state, action: PayloadAction<Seller[]>) => {
        state.sellers = action.payload;
        state.loading = false;
      }
    )
    .addCase(fetchSellers.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch sellers";
    })
    builder
    // create new seller
    .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(createSeller.fulfilled, (state, action: PayloadAction<Seller>) => {
        state.sellers.push(action.payload);
        // state.sellerCreated = "verification email sent to you"
        state.loading = false;
    })
    .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create seller';
    })
    .addCase(deleteSeller.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteSeller.fulfilled, (state, action) => {
      state.sellers = state.sellers.filter(
        (seller) => seller.id !== action.meta.arg
      );
      state.loading = false;
    })
    .addCase(deleteSeller.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to delete seller";
    });
  },
});

// Export the reducer to be used in the store
export default adminSlice.reducer;
