// import React, { useEffect, ReactNode } from "react";
// import { useAppDispatch } from "../Redux/hooks";
// import { initializeKeycloak } from "../Redux/AuthSlice";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const ReduxAuthProvider: React.FC<AuthProviderProps> = ({
//   children,
// }) => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     // Initialize Keycloak when the provider mounts
//     dispatch(initializeKeycloak());
//   }, [dispatch]);

//   return <>{children}</>;
// };

// export default ReduxAuthProvider;
