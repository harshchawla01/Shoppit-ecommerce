// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import Keycloak from "keycloak-js";

// // // // const useAuth = (isLoggedin) => {
// // // //   const isRun = useRef(false);
// // // //   const [isLogin, setIsLogin] = useState(isLoggedin);
// // // //   const [token, setToken] = useState(null);

// // // //   useEffect(() => {
// // // //     if (isRun.current) return;

// // // //     isRun.current = true;

// // // //     const client = new Keycloak({
// // // //       url: "http://localhost:8080",
// // // //       realm: "shoppit",
// // // //       clientId: "shoppit-ecommerce",
// // // //     });

// // // //     client
// // // //       .init({ onLoad: "login-required" })
// // // //       .then((res) => {
// // // //         setIsLogin(res);
// // // //         setToken(client.token);
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error("Keycloak initialization error:", error);
// // // //       });
// // // //   }, []);

// // // //   return [isLogin, token];
// // // // };

// // // // export default useAuth;

// // // // // const useAuth = (isLoggedIn) => {
// // // // //   const [isLogin, setIsLogin] = useState(isLoggedIn);
// // // // //   const keycloakRef = useRef(null);
// // // // //   const [token, setToken] = useState(null);

// // // // //   useEffect(() => {
// // // // //     // Only initialize Keycloak if it hasn't been initialized yet
// // // // //     if (!keycloakRef.current) {
// // // // //       keycloakRef.current = new Keycloak({
// // // // //         url: "http://localhost:8080",
// // // // //         realm: "shoppit",
// // // // //         clientId: "shoppit-ecommerce",
// // // // //       });

// // // // //       // Keycloak detects it's returning from a redirect (using URL parameters or cookies) and completes authentication without another redirect
// // // // //       keycloakRef.current
// // // // //         .init({ onLoad: "login-required" }) // sets the login state and redirects. Redirection means new browser session is created, and this redirect is the first mount for this session. So the infinite loop problem happens if we don't create a ref to the keycloakRef client bcz the state won'r persist
// // // // //         .then((authenticated) => {
// // // // //           setIsLogin(authenticated);
// // // // //           setToken(keycloakRef.current.token);
// // // // //         })
// // // // //         .catch((error) => {
// // // // //           console.error("Keycloak initialization error:", error);
// // // // //         });
// // // // //     }
// // // // //   }, []); // Empty dependency array ensures this runs only once

// // // // //   return [isLogin, token];
// // // // // };

// // // // // export default useAuth;

// // // import React, { useEffect, useState, useRef } from "react";
// // // import Keycloak from "keycloak-js";

// // // const useAuth = (initialState = false) => {
// // //   const keycloakRef = useRef(null);
// // //   const isRun = useRef(false);
// // //   const [isLogin, setIsLogin] = useState(initialState);
// // //   const [token, setToken] = useState(null);
// // //   const [userInfo, setUserInfo] = useState(null);

// // //   useEffect(() => {
// // //     if (isRun.current) return;

// // //     isRun.current = true;

// // //     const client = new Keycloak({
// // //       url: "http://localhost:8080",
// // //       realm: "shoppit",
// // //       clientId: "shoppit-ecommerce",
// // //     });

// // //     keycloakRef.current = client;

// // //     client
// // //       .init({ onLoad: "check-sso" })
// // //       .then((authenticated) => {
// // //         setIsLogin(authenticated);

// // //         if (authenticated) {
// // //           setToken(client.token);

// // //           // Get user profile information
// // //           client
// // //             .loadUserProfile()
// // //             .then((profile) => {
// // //               setUserInfo(profile);
// // //             })
// // //             .catch((error) => {
// // //               console.error("Failed to load user profile:", error);
// // //             });

// // //           // Set up token refresh
// // //           refreshToken(client);
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.error("Keycloak initialization error:", error);
// // //       });
// // //   }, []);

// // //   // Function to handle token refresh
// // //   const refreshToken = (keycloak) => {
// // //     setInterval(() => {
// // //       keycloak
// // //         .updateToken(70)
// // //         .then((refreshed) => {
// // //           if (refreshed) {
// // //             setToken(keycloak.token);
// // //             console.log("Token refreshed");
// // //           }
// // //         })
// // //         .catch(() => {
// // //           console.error("Failed to refresh token");
// // //           logout();
// // //         });
// // //     }, 60000); // Refresh token every minute
// // //   };

// // //   // Function to handle login
// // //   const login = () => {
// // //     if (keycloakRef.current) {
// // //       keycloakRef.current.login();
// // //     }
// // //   };

// // //   // Function to handle logout
// // //   const logout = () => {
// // //     if (keycloakRef.current) {
// // //       keycloakRef.current.logout();
// // //       setIsLogin(false);
// // //       setToken(null);
// // //       setUserInfo(null);
// // //     }
// // //   };

// // //   return {
// // //     isLoggedIn: isLogin,
// // //     token,
// // //     userInfo,
// // //     login,
// // //     logout,
// // //   };
// // // };

// // // export default useAuth;

// // import { useEffect, useState, useRef } from "react";
// // import Keycloak from "keycloak-js";

// // interface AuthHookResult {
// //   isLoggedIn: boolean;
// //   token: string | null;
// //   login: () => void;
// //   logout: () => void;
// // }

// // const useAuth = (initialState: boolean = false): AuthHookResult => {
// //   const keycloakRef = useRef<Keycloak | null>(null);
// //   const isRun = useRef<boolean>(false);
// //   const [isLogin, setIsLogin] = useState<boolean>(initialState);
// //   const [token, setToken] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (isRun.current) return;
// //     isRun.current = true;

// //     // Initialize Keycloak instance
// //     const client = new Keycloak({
// //       url: "http://localhost:8080",
// //       realm: "shoppit",
// //       clientId: "shoppit-ecommerce",
// //     });

// //     keycloakRef.current = client;

// //     // Just check if user is logged in, don't force login
// //     client
// //       .init({ onLoad: "check-sso" })
// //       .then((authenticated) => {
// //         setIsLogin(authenticated);

// //         if (authenticated) {
// //           setToken(client.token || null);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Keycloak initialization error:", error);
// //       });
// //   }, []);

// //   // Function to handle login
// //   const login = (): void => {
// //     if (keycloakRef.current) {
// //       // You can optionally add redirect parameters here
// //       keycloakRef.current.login();
// //     }
// //   };

// //   // Function to handle logout
// //   const logout = (): void => {
// //     if (keycloakRef.current) {
// //       keycloakRef.current.logout();
// //       setIsLogin(false);
// //       setToken(null);
// //     }
// //   };

// //   return {
// //     isLoggedIn: isLogin,
// //     token,
// //     login,
// //     logout,
// //   };
// // };

// // export default useAuth;

// import { useEffect, useState, useRef, useCallback } from "react";
// import Keycloak from "keycloak-js";

// interface AuthHookResult {
//   isLoggedIn: boolean;
//   token: string | null;
//   userInfo: any | null;
//   login: () => void;
//   logout: () => void;
//   keycloak: Keycloak | null;
// }

// const useAuth = (initialState: boolean = false): AuthHookResult => {
//   const keycloakRef = useRef<Keycloak | null>(null);
//   const isRun = useRef<boolean>(false);
//   const [isLogin, setIsLogin] = useState<boolean>(initialState);
//   const [token, setToken] = useState<string | null>(null);
//   const [userInfo, setUserInfo] = useState<any | null>(null);

//   useEffect(() => {
//     console.log("Auth Context state changed:", { isLogin, token, userInfo });
//   }, [isLogin, token, userInfo]);

//   // Initialize Keycloak
//   useEffect(() => {
//     if (isRun.current) return;
//     isRun.current = true;

//     // Initialize Keycloak instance
//     const client = new Keycloak({
//       url: "http://localhost:8080",
//       realm: "shoppit",
//       clientId: "shoppit-ecommerce",
//     });

//     keycloakRef.current = client;

//     client
//       .init({
//         onLoad: "check-sso",
//         silentCheckSsoRedirectUri:
//           window.location.origin + "/silent-check-sso.html",
//         checkLoginIframe: false, // Can help with some SSO issues
//       })
//       .then((authenticated) => {
//         console.log("Authentication state:", authenticated);
//         setIsLogin(authenticated);

//         if (authenticated && client.token) {
//           setToken(client.token);

//           // Set up token refresh
//           refreshTokenPeriodically(client);

//           // Get user info
//           loadUserInfo(client);
//         }
//       })
//       .catch((error) => {
//         console.error("Keycloak initialization error:", error);
//       });

//     // Return a cleanup function
//     // return () => {
//     //   // Clean up any subscriptions or intervals here if needed
//     // };
//   }, []);

//   // Function to load user info
//   const loadUserInfo = async (client: Keycloak) => {
//     try {
//       if (client.authenticated) {
//         const userProfile = await client.loadUserProfile();
//         console.log("User profile loaded:", userProfile);
//         setUserInfo(userProfile);
//       }
//     } catch (error) {
//       console.error("Failed to load user profile:", error);
//     }
//   };

//   // Set up token refresh
//   const refreshTokenPeriodically = (client: Keycloak) => {
//     // Set up token refresh
//     const minValidity = 70; // Refresh token if it's going to expire within 70 seconds
//     const updateInterval = 60; // Check every 60 seconds

//     setInterval(() => {
//       client
//         .updateToken(minValidity)
//         .then((refreshed) => {
//           if (refreshed) {
//             console.log("Token refreshed");
//             setToken(client.token || null);
//           }
//         })
//         .catch((error) => {
//           console.error("Failed to refresh token:", error);
//           // If token refresh fails, user might be logged out on the server
//           setIsLogin(false);
//           setToken(null);
//         });
//     }, updateInterval * 1000);
//   };

//   // Function to handle login
//   const login = useCallback((): void => {
//     if (keycloakRef.current) {
//       keycloakRef.current.login({
//         // You can add additional options here
//         redirectUri: window.location.origin, // Ensure we redirect back to our app
//       });
//     } else {
//       console.error("Keycloak not initialized");
//     }
//   }, []);

//   // Function to handle logout
//   const logout = useCallback((): void => {
//     if (keycloakRef.current) {
//       keycloakRef.current.logout({
//         redirectUri: window.location.origin, // Ensure we redirect back to our app
//       });
//       setIsLogin(false);
//       setToken(null);
//       setUserInfo(null);
//     } else {
//       console.error("Keycloak not initialized");
//     }
//   }, []);

//   return {
//     isLoggedIn: isLogin,
//     token,
//     userInfo,
//     login,
//     logout,
//     keycloak: keycloakRef.current,
//   };
// };

// export default useAuth;
