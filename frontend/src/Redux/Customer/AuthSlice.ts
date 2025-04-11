// src/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    AuthResponse,
    SignupRequest,
    AuthState,
} from '../../types/authTypes';
import { api } from '../../Config/Api';
import { RootState } from '../store';
import { resetUserState } from './UserSlice';
import { resetCartState } from './CartSlice';
import { useNavigate } from 'react-router-dom';


const initialState: AuthState = {
    jwt: null,
    role: null,
    loading: false,
    error: null,
    otpSent:false
};

// Define the base URL for the API
const API_URL = '/auth';



export const signup = createAsyncThunk<AuthResponse, SignupRequest>(
    'auth/signup',
    async (signupRequest, { rejectWithValue }) => {
        console.log("signup ", signupRequest)
        try {
            const response = await api.post<AuthResponse>(`${API_URL}/signup`, signupRequest);
        //    signupRequest.navigate("/")
           localStorage.setItem("jwt",response.data.jwt)
            return response.data;
        } catch (error:any) {
            return rejectWithValue('Signup failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null;
            state.role = null;
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.jwt = action.payload.jwt;
                state.role = action.payload.role;
                state.loading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const performLogout = () => async (dispatch: any) => {
    dispatch(logout());
    dispatch(resetUserState());
    dispatch(resetCartState());
};

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
