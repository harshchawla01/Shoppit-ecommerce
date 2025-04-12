import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  keycloakUserId: string | null;
  sellerCreationSuccess: boolean;
}

// Define the initial state
const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  profileUpdated: false,
  keycloakUserId: null,
  sellerCreationSuccess: false
};

// Create a seller in both DB and Keycloak
export const createSeller = createAsyncThunk<
  string, 
  { sellerData: SignupRequest; jwt: string }
>(
  'admin/createSeller',
  async ({ sellerData, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/createSeller`, sellerData, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      console.log('Seller created successfully with Keycloak ID:', response.data);
      return response.data; // This will be the Keycloak user ID
    } catch (error: any) {
      console.error("Create seller error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        'Failed to create seller'
      );
    }
  }
);

// Assign seller role to the created user
export const assignSellerRole = createAsyncThunk(
  'admin/assignSellerRole',
  async ({ 
    userId, 
    roleName = 'client_seller',
    jwt
  }: { 
    userId: string; 
    roleName?: string; 
    jwt: string;
  }, { rejectWithValue }) => {
    try {
      await api.put(
        `/roles/assign-role/seller/${userId}`,
        null,
        { 
          params: { roleName },
          headers: { Authorization: `Bearer ${jwt}` }
        }
      );
      return true;
    } catch (error: any) {
      console.error("Assign role error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        'Failed to assign role'
      );
    }
  }
);

// Handle the entire seller creation flow in one action
export const completeSellerCreation = createAsyncThunk(
  'admin/completeSellerCreation',
  async ({ sellerData, jwt }: { sellerData: SignupRequest; jwt: string }, { dispatch, rejectWithValue }) => {
    try {
      console.log("Starting complete seller creation process with data:", sellerData);
      
      // First create the seller user
      const createUserResult = await dispatch(createSeller({ sellerData, jwt }));
      console.log("Seller creation result:", createUserResult);
      
      if (createSeller.fulfilled.match(createUserResult)) {
        const keycloakUserId = createUserResult.payload;
        console.log("Seller created successfully with ID:", keycloakUserId);
        
        // Then assign the seller role
        const roleResult = await dispatch(assignSellerRole({
          userId: keycloakUserId,
          roleName: 'client_seller',
          jwt
        }));
        
        console.log("Role assignment result:", roleResult);
        
        if (assignSellerRole.fulfilled.match(roleResult)) {
          console.log("Seller role assigned successfully");
          return { success: true, keycloakUserId };
        } else {
          console.error("Role assignment failed:", roleResult.payload);
          return rejectWithValue(roleResult.payload || 'Failed to assign seller role');
        }
      } else {
        console.error("Seller creation failed:", createUserResult.payload);
        return rejectWithValue(createUserResult.payload || 'Failed to create seller');
      }
    } catch (error: any) {
      console.error("Complete seller creation process error:", error);
      return rejectWithValue(error.message || 'Seller creation process failed');
    }
  }
)

export const fetchSellers = createAsyncThunk<Seller[], string>(
  "admin/fetchSellers",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller[]>(`${API_URL}/allSellers`, {
        headers: { Authorization: `Bearer ${jwt}` }
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

export const deleteSeller = createAsyncThunk<void, { id: number; jwt: string }>(
  "admin/deleteSeller",
  async ({ id, jwt }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/deleteSeller/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
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
  reducers: {
    resetSellerState: (state) => {
      state.loading = false;
      state.error = null;
      state.keycloakUserId = null;
      state.sellerCreationSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch sellers
      .addCase(fetchSellers.pending, (state) => {
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
      
      // Create seller
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.loading = true; // Keep loading true as we're still assigning roles
        state.keycloakUserId = action.payload;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Assign seller role
      .addCase(assignSellerRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignSellerRole.fulfilled, (state) => {
        state.loading = false;
        state.sellerCreationSuccess = true;
      })
      .addCase(assignSellerRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Complete seller creation
      .addCase(completeSellerCreation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sellerCreationSuccess = false;
      })
      .addCase(completeSellerCreation.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerCreationSuccess = true;
        state.keycloakUserId = action.payload.keycloakUserId;
      })
      .addCase(completeSellerCreation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.sellerCreationSuccess = false;
      })
      
      // Delete seller
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.sellers = state.sellers.filter(
          (seller) => seller.id !== action.meta.arg.id
        );
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete seller";
      });
  },
});

export const { resetSellerState } = adminSlice.actions;
export default adminSlice.reducer;