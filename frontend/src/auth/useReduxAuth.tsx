// // src/auth/useReduxAuth.ts

// import { useAppSelector, useAppDispatch } from "../Redux/hooks";
// import { loginUser, logoutUser } from "../Redux/AuthSlice";

// export const useReduxAuth = () => {
//   const dispatch = useAppDispatch();
//   const auth = useAppSelector((state) => state.auth);

//   return {
//     isLoggedIn: auth.isLoggedIn,
//     token: auth.token,
//     userInfo: auth.userInfo,
//     keycloak: auth.keycloak,
//     isInitialized: auth.isInitialized,
//     error: auth.error,
//     login: () => dispatch(loginUser()),
//     logout: () => dispatch(logoutUser()),
//   };
// };

// export default useReduxAuth;
