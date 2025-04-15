import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

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

export const completeSignup = createAsyncThunk(
  'auth/completeSignup',
  async (signupData: SignupRequest, { dispatch, rejectWithValue }) => {
    try {
      console.log("Starting complete signup process with data:", signupData);
      
      const userResult = await dispatch(createUser(signupData));
      console.log("User creation result:", userResult);
      
      if (createUser.fulfilled.match(userResult)) {
        const keycloakUserId = userResult.payload.keycloakUserId;
        console.log("User created successfully with ID:", keycloakUserId);
        
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