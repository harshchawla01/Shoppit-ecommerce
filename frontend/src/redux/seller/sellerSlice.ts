import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Seller } from "../../types/sellerTypes";
import { api } from "../../config/Api";

interface SellerState {
  sellers: Seller[];
  selectedSeller: Seller | null;
  profile: Seller | null;
  loading: boolean;
  error: string | null;
  profileUpdated: boolean;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  profileUpdated: false,
};

const API_URL = "/api/seller";

export const fetchSellerProfile = createAsyncThunk<Seller, string>(
  "sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller>(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
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

export const fetchSellerById = createAsyncThunk<Seller, number>(
  "sellers/fetchSellerById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller>(`${API_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch seller by ID error response data:",
          error.response.data
        );
        console.error(
          "Fetch seller by ID error response status:",
          error.response.status
        );
        console.error(
          "Fetch seller by ID error response headers:",
          error.response.headers
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch seller by ID error message:", error.message);
        return rejectWithValue("Failed to fetch seller");
      }
    }
  }
);

// Updated to accept both seller data and JWT token
export const updateSeller = createAsyncThunk<
  Seller,
  { seller: any; token: string }
>(
  "sellers/updateSeller",
  async ({ seller, token }, { rejectWithValue }) => {
    console.log("seller update request", seller);
    try {
      const response = await api.patch(`${API_URL}`, seller, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("seller updated successfully", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Update seller error response data:", error.response);
        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);

export const deleteSeller = createAsyncThunk<void, number>(
  "sellers/deleteSeller",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
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

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    resetProfileUpdated: (state) => {
      state.profileUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch seller profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(
        fetchSellerProfile.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.profile = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellerById.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.selectedSeller = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch seller";
      })
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(
        updateSeller.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          const index = state.sellers.findIndex(
            (seller) => seller.id === action.payload.id
          );
          if (index !== -1) {
            state.sellers[index] = action.payload;
          }
          state.profile = action.payload;
          state.loading = false;
          state.profileUpdated = true;
        }
      )
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
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

export const { resetProfileUpdated } = sellerSlice.actions;

export default sellerSlice.reducer;

// Define selector functions
export const selectSellers = (state: RootState) => state.sellers.sellers;
export const selectSelectedSeller = (state: RootState) =>
  state.sellers.selectedSeller;
export const selectSellerLoading = (state: RootState) => state.sellers.loading;
export const selectSellerError = (state: RootState) => state.sellers.error;
export const selectSellerProfile = (state: RootState) => state.sellers.profile;
export const selectProfileUpdated = (state: RootState) => state.sellers.profileUpdated;