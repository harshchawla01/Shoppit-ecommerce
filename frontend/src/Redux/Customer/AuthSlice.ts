// // src/slices/authSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import {
//     AuthResponse,
//     SignupRequest,
//     AuthState,
// } from '../../types/authTypes';
// import { api } from '../../Config/Api';
// import { RootState } from '../store';
// import { resetUserState } from './UserSlice';
// import { resetCartState } from './CartSlice';
// import { useNavigate } from 'react-router-dom';


// const initialState: AuthState = {
//     jwt: null,
//     role: null,
//     loading: false,
//     error: null,
//     otpSent:false
// };

// // Define the base URL for the API
// const API_URL = '/auth';



// export const signup = createAsyncThunk<AuthResponse, SignupRequest>(
//     'auth/signup',
//     async (signupRequest, { rejectWithValue }) => {
//         console.log("signup ", signupRequest)
//         try {
//             const response = await api.post<AuthResponse>(`${API_URL}/signup`, signupRequest);
//         //    signupRequest.navigate("/")
//            localStorage.setItem("jwt",response.data.jwt)
//             return response.data;
//         } catch (error:any) {
//             return rejectWithValue('Signup failed');
//         }
//     }
// );

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logout: (state) => {
//             state.jwt = null;
//             state.role = null;
//             localStorage.clear()
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(signup.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(signup.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
//                 state.jwt = action.payload.jwt;
//                 state.role = action.payload.role;
//                 state.loading = false;
//             })
//             .addCase(signup.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//     },
// });

// export const { logout } = authSlice.actions;

// export default authSlice.reducer;

// export const performLogout = () => async (dispatch: any) => {
//     dispatch(logout());
//     dispatch(resetUserState());
//     dispatch(resetCartState());
// };

// export const selectAuth = (state: RootState) => state.auth;
// export const selectAuthLoading = (state: RootState) => state.auth.loading;
// export const selectAuthError = (state: RootState) => state.auth.error;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';

export interface SignupRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface AuthState {
  isLoading: boolean;
  error: string | null;
  keycloakUserId: string | null;
  signupSuccess: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  error: null,
  keycloakUserId: null,
  signupSuccess: false,
};

// Create a user in both DB and Keycloak
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (signupData: SignupRequest, { rejectWithValue }) => {
    try {
      // Using api instead of axios
      const response = await api.post('/auth/signup', signupData);
      
      // The API returns the Keycloak user ID directly as a string
      const keycloakUserId = response.data;
      
      return { keycloakUserId };
    } catch (error: any) {
      console.error("Create user error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || 
        error.response?.data || 
        'Failed to create user'
      );
    }
  }
);

// Assign role to the created user
export const assignUserRole = createAsyncThunk(
  'auth/assignRole',
  async ({ userId, roleName = 'client_user', isClientRole = true }: { 
    userId: string; 
    roleName?: string; 
    isClientRole?: boolean 
  }, { rejectWithValue }) => {
    try {
      // Using api instead of axios
      await api.put(
        `/roles/assign-role/user/${userId}`,
        null,
        { params: { roleName, isClientRole } }
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

// Handle the entire signup flow in one action
export const completeSignup = createAsyncThunk(
  'auth/completeSignup',
  async (signupData: SignupRequest, { dispatch, rejectWithValue }) => {
    try {
      console.log("Starting complete signup process with data:", signupData);
      
      // First create the user
      const userResult = await dispatch(createUser(signupData));
      console.log("User creation result:", userResult);
      
      if (createUser.fulfilled.match(userResult)) {
        const keycloakUserId = userResult.payload.keycloakUserId;
        console.log("User created successfully with ID:", keycloakUserId);
        
        // Then assign the role
        const roleResult = await dispatch(assignUserRole({
          userId: keycloakUserId,
          roleName: 'client_user',
          isClientRole: true
        }));
        
        console.log("Role assignment result:", roleResult);
        
        if (assignUserRole.fulfilled.match(roleResult)) {
          console.log("Role assigned successfully");
          return { success: true, keycloakUserId };
        } else {
          console.error("Role assignment failed:", roleResult.payload);
          return rejectWithValue(roleResult.payload || 'Failed to assign role');
        }
      } else {
        console.error("User creation failed:", userResult.payload);
        return rejectWithValue(userResult.payload || 'Failed to create user');
      }
    } catch (error: any) {
      console.error("Complete signup process error:", error);
      return rejectWithValue(error.message || 'Signup process failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.keycloakUserId = null;
      state.signupSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // createUser reducers
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = true; // Keep loading true as we're still assigning roles
        state.keycloakUserId = action.payload.keycloakUserId;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // assignUserRole reducers
      .addCase(assignUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignUserRole.fulfilled, (state) => {
        state.isLoading = false;
        state.signupSuccess = true;
      })
      .addCase(assignUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // completeSignup reducers
      .addCase(completeSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(completeSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signupSuccess = true;
        state.keycloakUserId = action.payload.keycloakUserId;
      })
      .addCase(completeSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.signupSuccess = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;