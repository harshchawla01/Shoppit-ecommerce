// // import React, {
// //   createContext,
// //   useContext,
// //   ReactNode,
// //   useState,
// //   useEffect,
// //   useRef,
// // } from "react";
// // import Keycloak from "keycloak-js";

// // interface AuthContextType {
// //   isLoggedIn: boolean;
// //   token: string | null;
// //   userInfo: any | null;
// //   login: () => void;
// //   logout: () => void;
// //   keycloak: Keycloak | null;
// // }

// // const defaultAuthContext: AuthContextType = {
// //   isLoggedIn: false,
// //   token: null,
// //   userInfo: null,
// //   login: () => {},
// //   logout: () => {},
// //   keycloak: null,
// // };

// // const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// // export const useAuth = () => useContext(AuthContext);

// // interface AuthProviderProps {
// //   children: ReactNode;
// // }

// // export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// //   const keycloakRef = useRef<Keycloak | null>(null);
// //   const isRun = useRef<boolean>(false);
// //   const [isLogin, setIsLogin] = useState<boolean>(false);
// //   const [token, setToken] = useState<string | null>(null);
// //   const [userInfo, setUserInfo] = useState<any | null>(null);
// //   const [isInitialized, setIsInitialized] = useState<boolean>(false);

// //   // Initialize Keycloak
// //   useEffect(() => {
// //     if (isRun.current) return;
// //     isRun.current = true;

// //     // Initialize Keycloak instance
// //     const client = new Keycloak({
// //       url: "/keycloak",
// //       realm: "shoppit",
// //       clientId: "shoppit-ecommerce",
// //     });

// //     keycloakRef.current = client;

// //     client
// //       .init({
// //         onLoad: "check-sso",
// //         silentCheckSsoRedirectUri:
// //           window.location.origin + "/silent-check-sso.html",
// //         checkLoginIframe: false,

// //         // 3 lines Added afterwards
// //         enableLogging: true, // helpful for debugging
// //         token: localStorage.getItem("token") || undefined, // retrieve stored token
// //         refreshToken: localStorage.getItem("refreshToken") || undefined, // retrieve stored refresh token
// //       })
// //       .then((authenticated) => {
// //         console.log("Authentication state:", authenticated);
// //         setIsLogin(authenticated);

// //         if (authenticated && client.token) {
// //           setToken(client.token);

// //           // 2 lines Added afterwards
// //           localStorage.setItem("kc_token", client.token);
// //           localStorage.setItem("kc_refreshToken", client.refreshToken || "");

// //           loadUserInfo(client);
// //           refreshTokenPeriodically(client);
// //         }

// //         setIsInitialized(true);
// //       })
// //       .catch((error) => {
// //         console.error("Keycloak initialization error:", error);
// //         setIsInitialized(true);
// //       });
// //   }, []);

// //   // Function to load user info
// //   //   const loadUserInfo = async (client: Keycloak) => {
// //   //     try {
// //   //       if (client.authenticated) {
// //   //         const userProfile = await client.loadUserProfile();
// //   //         console.log("User profile loaded:", userProfile);
// //   //         setUserInfo(userProfile);
// //   //       }
// //   //     } catch (error) {
// //   //       console.error("Failed to load user profile:", error);
// //   //     }
// //   //   };

// //   const loadUserInfo = async (client: Keycloak) => {
// //     try {
// //       if (client.authenticated) {
// //         const userProfile = await client.loadUserProfile();

// //         const realmRoles = client.realmAccess?.roles || [];

// //         const clientRoles =
// //           client.resourceAccess?.["shoppit-ecommerce"]?.roles || [];

// //         const allRoles = [...realmRoles, ...clientRoles];

// //         const enhancedProfile = {
// //           ...userProfile,
// //           roles: allRoles,
// //         };

// //         console.log("User profile loaded:", enhancedProfile);
// //         setUserInfo(enhancedProfile);
// //       }
// //     } catch (error) {
// //       console.error("Failed to load user profile:", error);
// //     }
// //   };

// //   // Set up token refresh
// //   const refreshTokenPeriodically = (client: Keycloak) => {
// //     const minValidity = 70; // Refresh token if it's going to expire within 70 seconds
// //     const updateInterval = 60; // Check every 60 seconds

// //     setInterval(() => {
// //       client
// //         .updateToken(minValidity)
// //         .then((refreshed) => {
// //           if (refreshed) {
// //             console.log("Token refreshed");
// //             setToken(client.token || null);
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Failed to refresh token:", error);
// //           setIsLogin(false);
// //           setToken(null);
// //         });
// //     }, updateInterval * 1000);
// //   };

// //   // Function to handle login
// //   const login = () => {
// //     if (keycloakRef.current) {
// //       keycloakRef.current.login({
// //         redirectUri: window.location.origin,
// //       });
// //     } else {
// //       console.error("Keycloak not initialized");
// //     }
// //   };

// //   // Function to handle logout
// //   const logout = () => {
// //     if (keycloakRef.current) {
// //       keycloakRef.current.logout({
// //         redirectUri: window.location.origin,
// //       });
// //       setIsLogin(false);
// //       setToken(null);
// //       setUserInfo(null);
// //     } else {
// //       console.error("Keycloak not initialized");
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         isLoggedIn: isLogin,
// //         token,
// //         userInfo,
// //         login,
// //         logout,
// //         keycloak: keycloakRef.current,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import React, {
//   createContext,
//   useContext,
//   ReactNode,
//   useState,
//   useEffect,
//   useRef,
// } from "react";
// import Keycloak from "keycloak-js";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   token: string | null;
//   userInfo: any | null;
//   login: () => void;
//   logout: () => void;
//   keycloak: Keycloak | null;
// }

// const defaultAuthContext: AuthContextType = {
//   isLoggedIn: false,
//   token: null,
//   userInfo: null,
//   login: () => {},
//   logout: () => {},
//   keycloak: null,
// };

// const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// export const useAuth = () => useContext(AuthContext);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const keycloakRef = useRef<Keycloak | null>(null);
//   const isRun = useRef<boolean>(false);
//   const [isLogin, setIsLogin] = useState<boolean>(false);
//   const [token, setToken] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<any | null>(null);
//   const [isInitialized, setIsInitialized] = useState<boolean>(false);

//   // Initialize Keycloak
//   useEffect(() => {
//     if (isRun.current) return;
//     isRun.current = true;

//     // Check if tokens exist in localStorage first
//     const storedToken = localStorage.getItem("kc_token");
//     const storedRefreshToken = localStorage.getItem("kc_refreshToken");

//     // Initialize Keycloak instance
//     const client = new Keycloak({
//       url: "/keycloak",
//       realm: "shoppit",
//       clientId: "shoppit-ecommerce",
//     });

//     keycloakRef.current = client;

//     client
//       .init({
//         onLoad: "check-sso",
//         silentCheckSsoRedirectUri:
//           window.location.origin + "/silent-check-sso.html",
//         checkLoginIframe: false,
//         enableLogging: true, // helpful for debugging
//         token: storedToken || undefined,
//         refreshToken: storedRefreshToken || undefined, // retrieve stored refresh token
//       })
//       .then((authenticated) => {
//         console.log("Authentication state:", authenticated);
//         setIsLogin(authenticated);

//         if (authenticated && client.token) {
//           setToken(client.token);

//           // Store tokens in localStorage
//           localStorage.setItem("kc_token", client.token);
//           localStorage.setItem("kc_refreshToken", client.refreshToken || "");

//           loadUserInfo(client);
//           refreshTokenPeriodically(client);
//         } else {
//           // If not authenticated, ensure localStorage is cleared
//           localStorage.removeItem("kc_token");
//           localStorage.removeItem("kc_refreshToken");
//         }

//         setIsInitialized(true);
//       })
//       .catch((error) => {
//         console.error("Keycloak initialization error:", error);
//         // Clear tokens in case of initialization error
//         localStorage.removeItem("kc_token");
//         localStorage.removeItem("kc_refreshToken");
//         setIsInitialized(true);
//       });
//   }, []);

//   // Function to load user info with roles
//   const loadUserInfo = async (client: Keycloak) => {
//     try {
//       if (client.authenticated) {
//         const userProfile = await client.loadUserProfile();

//         const realmRoles = client.realmAccess?.roles || [];

//         const clientRoles =
//           client.resourceAccess?.["shoppit-ecommerce"]?.roles || [];

//         const allRoles = [...realmRoles, ...clientRoles];

//         const enhancedProfile = {
//           ...userProfile,
//           roles: allRoles,
//         };

//         console.log("User profile loaded:", enhancedProfile);
//         setUserInfo(enhancedProfile);
//       }
//     } catch (error) {
//       console.error("Failed to load user profile:", error);
//     }
//   };

//   // Set up token refresh with localStorage updates
//   const refreshTokenPeriodically = (client: Keycloak) => {
//     const minValidity = 70; // Refresh token if it's going to expire within 70 seconds
//     const updateInterval = 60; // Check every 60 seconds

//     setInterval(() => {
//       client
//         .updateToken(minValidity)
//         .then((refreshed) => {
//           if (refreshed) {
//             console.log("Token refreshed");
//             setToken(client.token || null);

//             // Update localStorage with new tokens
//             if (client.token) {
//               localStorage.setItem("kc_token", client.token);
//             }
//             if (client.refreshToken) {
//               localStorage.setItem("kc_refreshToken", client.refreshToken);
//             }
//           }
//         })
//         .catch((error) => {
//           console.error("Failed to refresh token:", error);
//           setIsLogin(false);
//           setToken(null);

//           // Clear localStorage on refresh failure
//           localStorage.removeItem("kc_token");
//           localStorage.removeItem("kc_refreshToken");
//         });
//     }, updateInterval * 1000);
//   };

//   // Function to handle login
//   const login = () => {
//     if (keycloakRef.current) {
//       keycloakRef.current.login({
//         redirectUri: window.location.origin,
//       });
//     } else {
//       console.error("Keycloak not initialized");
//     }
//   };

//   // Function to handle logout with localStorage cleanup
//   const logout = () => {
//     if (keycloakRef.current) {
//       // Clear localStorage tokens
//       localStorage.removeItem("kc_token");
//       localStorage.removeItem("kc_refreshToken");

//       keycloakRef.current.logout({
//         redirectUri: window.location.origin,
//       });
//       setIsLogin(false);
//       setToken(null);
//       setUserInfo(null);
//     } else {
//       console.error("Keycloak not initialized");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: isLogin,
//         token,
//         userInfo,
//         login,
//         logout,
//         keycloak: keycloakRef.current,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// Enhanced AuthContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import Keycloak from "keycloak-js";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  userInfo: any | null;
  login: () => void;
  logout: () => void;
  keycloak: Keycloak | null;
  isSeller: boolean; // Add this to easily check seller role
  isCustomer: boolean; // Add this to easily check customer role
  isAdmin: boolean; // Add this to easily check admin role
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  token: null,
  userInfo: null,
  login: () => {},
  logout: () => {},
  keycloak: null,
  isSeller: false,
  isCustomer: false,
  isAdmin: false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const keycloakRef = useRef<Keycloak | null>(null);
  const isRun = useRef<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initialize Keycloak
  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    // Check if tokens exist in localStorage first
    const storedToken = localStorage.getItem("kc_token");
    const storedRefreshToken = localStorage.getItem("kc_refreshToken");

    // Initialize Keycloak instance
    const client = new Keycloak({
      url: "/keycloak",
      realm: "shoppit",
      clientId: "shoppit-ecommerce",
    });

    keycloakRef.current = client;

    client
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        checkLoginIframe: false,
        enableLogging: true,
        token: storedToken || undefined,
        refreshToken: storedRefreshToken || undefined,
      })
      .then((authenticated) => {
        console.log("Authentication state:", authenticated);
        setIsLogin(authenticated);

        if (authenticated && client.token) {
          setToken(client.token);

          // Store tokens in localStorage
          localStorage.setItem("kc_token", client.token);
          localStorage.setItem("kc_refreshToken", client.refreshToken || "");

          loadUserInfo(client);
          refreshTokenPeriodically(client);
        } else {
          // If not authenticated, ensure localStorage is cleared
          localStorage.removeItem("kc_token");
          localStorage.removeItem("kc_refreshToken");
        }

        setIsInitialized(true);
      })
      .catch((error) => {
        console.error("Keycloak initialization error:", error);
        localStorage.removeItem("kc_token");
        localStorage.removeItem("kc_refreshToken");
        setIsInitialized(true);
      });
  }, []);

  // Enhanced function to load user info with roles and set role flags
  const loadUserInfo = async (client: Keycloak) => {
    try {
      if (client.authenticated) {
        const userProfile = await client.loadUserProfile();

        const realmRoles = client.realmAccess?.roles || [];
        const clientRoles =
          client.resourceAccess?.["shoppit-ecommerce"]?.roles || [];

        const allRoles = [...realmRoles, ...clientRoles];

        const enhancedProfile = {
          ...userProfile,
          roles: allRoles,
        };

        console.log("User profile loaded:", enhancedProfile);
        setUserInfo(enhancedProfile);

        // Set role flags based on retrieved roles
        const hasAdminRole = allRoles.includes("client_admin");
        const hasSellerRole = allRoles.includes("client_seller");
        const hasCustomerRole = allRoles.includes("client_user");

        setIsAdmin(hasAdminRole);
        setIsSeller(hasSellerRole);
        setIsCustomer(hasCustomerRole);

        // Store role information in localStorage for persistence
        localStorage.setItem("isAdmin", String(hasAdminRole));
        localStorage.setItem("isSeller", String(hasSellerRole));
        localStorage.setItem("isCustomer", String(hasCustomerRole));
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  };

  // Restore role states from localStorage during initialization
  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    const storedIsSeller = localStorage.getItem("isSeller") === "true";
    const storedIsCustomer = localStorage.getItem("isCustomer") === "true";

    if (isLogin) {
      setIsAdmin(storedIsAdmin);
      setIsSeller(storedIsSeller);
      setIsCustomer(storedIsCustomer);
    } else {
      // Clear role states if not logged in
      setIsAdmin(false);
      setIsSeller(false);
      setIsCustomer(false);
    }
  }, [isLogin]);

  // Set up token refresh with localStorage updates
  const refreshTokenPeriodically = (client: Keycloak) => {
    const minValidity = 70; // Refresh token if it's going to expire within 70 seconds
    const updateInterval = 60; // Check every 60 seconds

    setInterval(() => {
      client
        .updateToken(minValidity)
        .then((refreshed) => {
          if (refreshed) {
            console.log("Token refreshed");
            setToken(client.token || null);

            // Update localStorage with new tokens
            if (client.token) {
              localStorage.setItem("kc_token", client.token);
            }
            if (client.refreshToken) {
              localStorage.setItem("kc_refreshToken", client.refreshToken);
            }
          }
        })
        .catch((error) => {
          console.error("Failed to refresh token:", error);
          setIsLogin(false);
          setToken(null);
          setIsAdmin(false);
          setIsSeller(false);
          setIsCustomer(false);

          // Clear localStorage on refresh failure
          localStorage.removeItem("kc_token");
          localStorage.removeItem("kc_refreshToken");
          localStorage.removeItem("isAdmin");
          localStorage.removeItem("isSeller");
          localStorage.removeItem("isCustomer");
        });
    }, updateInterval * 1000);
  };

  // Function to handle login
  const login = () => {
    if (keycloakRef.current) {
      keycloakRef.current.login({
        redirectUri: window.location.origin,
      });
    } else {
      console.error("Keycloak not initialized");
    }
  };

  // Function to handle logout with localStorage cleanup
  const logout = () => {
    if (keycloakRef.current) {
      // Clear localStorage tokens and role information
      localStorage.removeItem("kc_token");
      localStorage.removeItem("kc_refreshToken");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("isSeller");
      localStorage.removeItem("isCustomer");

      keycloakRef.current.logout({
        redirectUri: window.location.origin,
      });
      setIsLogin(false);
      setToken(null);
      setUserInfo(null);
      setIsAdmin(false);
      setIsSeller(false);
      setIsCustomer(false);
    } else {
      console.error("Keycloak not initialized");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLogin,
        token,
        userInfo,
        login,
        logout,
        keycloak: keycloakRef.current,
        isAdmin,
        isSeller,
        isCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
