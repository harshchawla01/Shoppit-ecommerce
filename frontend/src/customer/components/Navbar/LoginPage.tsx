// // import React, { useState } from "react";

// // interface LoginPageProps {
// //   clientId?: string;
// //   redirectUri?: string;
// // }

// // const LoginPage: React.FC<LoginPageProps> = ({
// //   clientId = "shoppit-ecommerce",
// //   redirectUri = "http://localhost:5173",
// // }) => {
// //   const [error, setError] = useState<string | null>(null);

// //   const handleLogin = () => {
// //     try {
// //       // Encode the redirect URI to ensure it's properly formatted
// //       const encodedRedirectUri = encodeURIComponent(redirectUri);

// //       // Construct the authentication URL
// //       const authUrl = `http://localhost:8080/realms/shoppit/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&response_type=code&scope=openid`;

// //       // Redirect to Keycloak login
// //       window.location.href = authUrl;
// //     } catch (err) {
// //       // Handle any errors that might occur
// //       setError(
// //         err instanceof Error ? err.message : "An unknown error occurred"
// //       );
// //       console.error("Login error:", err);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center h-screen">
// //       {error && (
// //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// //           <p>{error}</p>
// //         </div>
// //       )}
// //       <button
// //         onClick={handleLogin}
// //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
// //       >
// //         Login with Keycloak
// //       </button>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";

// const LoginPage: React.FC = () => {
//   const [error, setError] = useState<string | null>(null);
//   const { isLoggedIn, login } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect if already logged in
//     if (isLoggedIn) {
//       navigate("/");
//     }
//   }, [isLoggedIn, navigate]);

//   const handleLogin = () => {
//     try {
//       login();
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "An unknown error occurred"
//       );
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           <p>{error}</p>
//         </div>
//       )}
//       <button
//         onClick={handleLogin}
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Login with Keycloak
//       </button>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext"; // Update this path

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    try {
      login();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with Keycloak
      </button>
    </div>
  );
};

export default LoginPage;
