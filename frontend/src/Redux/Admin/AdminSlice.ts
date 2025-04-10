import { createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import { HomeCategory } from '../../types/homeDataTypes';
import { api } from '../../Config/Api';
import axios from 'axios';
import { Seller } from '../../types/sellerTypes';

const API_URL = '/admin';

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

export const fetchSellers = createAsyncThunk<Seller[], string>(
  "sellers/fetchSellers",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Seller[]>(API_URL, {
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

// Create the slice
const homeCategorySlice = createSlice({
  name: 'homeCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state for updateHomeCategory
    // builder.addCase(updateHomeCategory.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.categoryUpdated = false;
    // });

    // // Handle the fulfilled state for updateHomeCategory
    // builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.categoryUpdated = true;  // Set categoryUpdated flag to true
    //   // Find the category by ID and update it in the state
    //   const index = state.categories.findIndex((category) => category.id === action.payload.id);
    //   if (index !== -1) {
    //     state.categories[index] = action.payload;
    //   } else {
    //     state.categories.push(action.payload);  // If the category doesn't exist, add it
    //   }
    // });

    // // Handle the rejected state for updateHomeCategory
    // builder.addCase(updateHomeCategory.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });

    // // fetch home category
    // builder.addCase(fetchHomeCategories.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.categoryUpdated = false;  // Reset categoryUpdated flag to false
    // })
    // .addCase(fetchHomeCategories.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.categories = action.payload;
    // })
    // .addCase(fetchHomeCategories.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });

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
  },
});

// Export the reducer to be used in the store
export default homeCategorySlice.reducer;
