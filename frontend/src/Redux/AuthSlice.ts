// // 1. Create the Auth Slice
// // src/redux/features/auth/authSlice.ts

// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import Keycloak from 'keycloak-js';

// // Define types
// interface AuthState {
//   isLoggedIn: boolean;
//   token: string | null;
//   userInfo: any | null;
//   keycloak: Keycloak | null;
//   isInitialized: boolean;
//   error: string | null;
// }

// // Initial state
// const initialState: AuthState = {
//   isLoggedIn: false,
//   token: null,
//   userInfo: null,
//   keycloak: null,
//   isInitialized: false,
//   error: null
// };

// // Create keycloak instance thunk
// export const initializeKeycloak = createAsyncThunk(
//   'auth/initializeKeycloak',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Initialize Keycloak instance
//       const client = new Keycloak({
//         url: "/keycloak",
//         realm: "shoppit",
//         clientId: "shoppit-ecommerce",
//       });

//       const authenticated = await client.init({
//         onLoad: "check-sso",
//         silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
//         checkLoginIframe: false,
//         enableLogging: true,
//         token: localStorage.getItem("kc_token") || undefined,
//         refreshToken: localStorage.getItem("kc_refreshToken") || undefined,
//       });

//       console.log("Authentication state:", authenticated);

//       if (authenticated && client.token) {
//         localStorage.setItem("kc_token", client.token);
//         localStorage.setItem("kc_refreshToken", client.refreshToken || "");
        
//         // Load user info
//         let userProfile = null;
//         try {
//           userProfile = await client.loadUserProfile();
//           const realmRoles = client.realmAccess?.roles || [];
//           const clientRoles = client.resourceAccess?.["shoppit-ecommerce"]?.roles || [];
//           const allRoles = [...realmRoles, ...clientRoles];
          
//           userProfile = {
//             ...userProfile,
//             roles: allRoles,
//           };
//           console.log("User profile loaded:", userProfile);
//         } catch (error) {
//           console.error("Failed to load user profile:", error);
//         }

//         // Setup token refresh
//         const minValidity = 70;
//         const updateInterval = 60;

//         setInterval(() => {
//           client.updateToken(minValidity)
//             .then((refreshed) => {
//               if (refreshed && client.token) {
//                 console.log("Token refreshed");
//                 localStorage.setItem("kc_token", client.token);
//                 localStorage.setItem("kc_refreshToken", client.refreshToken || "");
//               }
//             })
//             .catch((error) => {
//               console.error("Failed to refresh token:", error);
//             });
//         }, updateInterval * 1000);

//         return {
//           authenticated,
//           client,
//           token: client.token,
//           userInfo: userProfile
//         };
//       }

//       return {
//         authenticated,
//         client,
//         token: null,
//         userInfo: null
//       };
//     } catch (error) {
//       console.error("Keycloak initialization error:", error);
//       return rejectWithValue("Failed to initialize Keycloak");
//     }
//   }
// );

// // Login thunk
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { auth } = getState() as { auth: AuthState };
//       if (!auth.keycloak) {
//         throw new Error("Keycloak not initialized");
//       }
      
//       auth.keycloak.login({
//         redirectUri: window.location.origin,
//       });
      
//       return true;
//     } catch (error) {
//       console.error("Login error:", error);
//       return rejectWithValue("Failed to login");
//     }
//   }
// );

// // Logout thunk
// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { auth } = getState() as { auth: AuthState };
//       if (!auth.keycloak) {
//         throw new Error("Keycloak not initialized");
//       }
      
//       auth.keycloak.logout({
//         redirectUri: window.location.origin,
//       });
      
//       localStorage.removeItem("kc_token");
//       localStorage.removeItem("kc_refreshToken");
      
//       return true;
//     } catch (error) {
//       console.error("Logout error:", error);
//       return rejectWithValue("Failed to logout");
//     }
//   }
// );

// // Create the slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setLoggedIn(state, action: PayloadAction<boolean>) {
//       state.isLoggedIn = action.payload;
//     },
//     setToken(state, action: PayloadAction<string | null>) {
//       state.token = action.payload;
//     },
//     setUserInfo(state, action: PayloadAction<any>) {
//       state.userInfo = action.payload;
//     },
//     clearAuth(state) {
//       state.isLoggedIn = false;
//       state.token = null;
//       state.userInfo = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle initializeKeycloak
//       .addCase(initializeKeycloak.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(initializeKeycloak.fulfilled, (state, action) => {
//         state.isInitialized = true;
//         state.keycloak = action.payload.client;
//         state.isLoggedIn = action.payload.authenticated;
//         state.token = action.payload.token;
//         state.userInfo = action.payload.userInfo;
//         state.error = null;
//       })
//       .addCase(initializeKeycloak.rejected, (state, action) => {
//         state.isInitialized = true;
//         state.error = action.payload as string;
//       })
//       // Handle login (this mostly handles errors since the actual login redirects)
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })
//       // Handle logout
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.isLoggedIn = false;
//         state.token = null;
//         state.userInfo = null;
//       });
//   }
// });

// export const { setLoggedIn, setToken, setUserInfo, clearAuth } = authSlice.actions;

// export default authSlice.reducer;