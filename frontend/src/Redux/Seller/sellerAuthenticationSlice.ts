import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import { Seller } from '../../types/sellerTypes';
import axios from 'axios';

// Define initial state
interface SellerAuthState {
    otpSent: boolean;
    error: string | null;
    loading: boolean;
    jwt: string | null;
    sellerCreated: string | null;
}

const initialState: SellerAuthState = {
    otpSent: false,
    error: null,
    loading: false,
    jwt: null,
    sellerCreated:""
};

const API_URL = '/sellers';



// Create the slice
const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {
        resetSellerAuthState: (state) => {
            state.otpSent = false;
            state.error = null;
            state.loading = false;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        // Handle sendLoginOtp actions
        builder
            // create new seller
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, action: PayloadAction<Seller>) => {
                // state.sellers.push(action.payload);
                state.sellerCreated = "verification email sent to you"
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to create seller';
            })
            ;
    },
});

// Export actions and reducer
export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
