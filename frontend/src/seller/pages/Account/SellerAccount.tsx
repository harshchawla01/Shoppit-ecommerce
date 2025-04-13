// // import React, { useEffect, useState } from "react";
// // import { useAppDispatch, useAppSelector } from "../../../Redux/store";
// // import {
// //   fetchSellerProfile,
// //   updateSeller,
// // } from "../../../Redux/Seller/sellerSlice";
// // import { useAuth } from "../../../auth/AuthContext";
// // import Navbar from "../../components/Navbar/Navbar";
// // import SellerDrawerList from "../../components/SideBar/DrawerList";
// // import {
// //   Alert,
// //   Box,
// //   Button,
// //   CircularProgress,
// //   Divider,
// //   Grid,
// //   Paper,
// //   Snackbar,
// //   TextField,
// //   Typography,
// // } from "@mui/material";
// // import {
// //   Address,
// //   BankDetails,
// //   BusinessDetails,
// //   Seller,
// // } from "../../../types/sellerTypes";

// // const SellerAccount = () => {
// //   const dispatch = useAppDispatch();
// //   const { token } = useAuth();
// //   const { profile, loading, error, profileUpdated } = useAppSelector(
// //     (state) => state.sellers
// //   );
// //   const [openSnackbar, setOpenSnackbar] = useState(false);

// //   // State for form fields
// //   const [formData, setFormData] = useState<Partial<Seller>>({
// //     businessDetails: {
// //       businessName: "",
// //       businessEmail: "",
// //       businessPhone: "",
// //       businessAddress: "",
// //       logo: "",
// //     },
// //     bankDetails: {
// //       accountNumber: "",
// //       accountHolderName: "",
// //       ifscCode: "",
// //     },
// //     pickupAddress: {
// //       name: "",
// //       locality: "",
// //       address: "",
// //       city: "",
// //       state: "",
// //       postalCode: "",
// //       phone: "",
// //     },
// //     GSTIN: "",
// //   });

// //   // Fetch seller profile on component mount
// //   useEffect(() => {
// //     if (token) {
// //       dispatch(fetchSellerProfile(token));
// //     }
// //   }, [dispatch, token]);

// //   // Update form data when profile is loaded
// //   useEffect(() => {
// //     if (profile) {
// //       setFormData({
// //         businessDetails: profile.businessDetails || {
// //           businessName: "",
// //           businessEmail: "",
// //           businessPhone: "",
// //           businessAddress: "",
// //           logo: "",
// //         },
// //         bankDetails: profile.bankDetails || {
// //           accountNumber: "",
// //           accountHolderName: "",
// //           ifscCode: "",
// //         },
// //         pickupAddress: profile.pickupAddress || {
// //           name: "",
// //           locality: "",
// //           address: "",
// //           city: "",
// //           state: "",
// //           postalCode: "",
// //           phone: "",
// //         },
// //         GSTIN: profile.GSTIN || "",
// //       });
// //     }
// //   }, [profile]);

// //   // Show snackbar when profile is updated
// //   useEffect(() => {
// //     if (profileUpdated) {
// //       setOpenSnackbar(true);
// //     }
// //   }, [profileUpdated]);

// //   // Handle form input changes for business details
// //   const handleBusinessDetailChange = (
// //     e: React.ChangeEvent<HTMLInputElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       businessDetails: {
// //         ...(formData.businessDetails as BusinessDetails),
// //         [name]: value,
// //       },
// //     });
// //   };

// //   // Handle form input changes for bank details
// //   const handleBankDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       bankDetails: {
// //         ...(formData.bankDetails as BankDetails),
// //         [name]: value,
// //       },
// //     });
// //   };

// //   // Handle form input changes for pickup address
// //   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       pickupAddress: {
// //         ...(formData.pickupAddress as Address),
// //         [name]: value,
// //       },
// //     });
// //   };

// //   // Handle form input change for GSTIN
// //   const handleGSTINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({
// //       ...formData,
// //       GSTIN: e.target.value,
// //     });
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (token) {
// //       const updateData = {
// //         businessDetails: formData.businessDetails,
// //         bankDetails: formData.bankDetails,
// //         pickupAddress: formData.pickupAddress,
// //         GSTIN: formData.GSTIN,
// //         token,
// //       };
// //       dispatch(updateSeller(updateData));
// //     }
// //   };

// //   // Handle snackbar close
// //   const handleCloseSnackbar = () => {
// //     setOpenSnackbar(false);
// //   };

// //   if (loading && !profile) {
// //     return (
// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           height: "80vh",
// //         }}
// //       >
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <>
// //       <Box sx={{ p: 3 }}>
// //         <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
// //           Seller Account
// //         </Typography>

// //         {error && (
// //           <Alert severity="error" sx={{ mb: 3 }}>
// //             {error}
// //           </Alert>
// //         )}

// //         <form onSubmit={handleSubmit}>
// //           <Grid container spacing={3}>
// //             {/* Basic Information (Read-only) */}
// //             <Grid size={{ xs: 12 }}>
// //               <Paper sx={{ p: 3, mb: 3 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                   Basic Information (Not Editable)
// //                 </Typography>
// //                 <Divider sx={{ mb: 2 }} />
// //                 <Grid container spacing={2}>
// //                   <Grid size={{ xs: 12, sm: 6, md: 4 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Username"
// //                       value={profile?.username || ""}
// //                       disabled
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6, md: 4 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="First Name"
// //                       value={profile?.firstName || ""}
// //                       disabled
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6, md: 4 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Last Name"
// //                       value={profile?.lastName || ""}
// //                       disabled
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6, md: 4 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Email"
// //                       value={profile?.email || ""}
// //                       disabled
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6, md: 4 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Mobile"
// //                       value={profile?.mobile || ""}
// //                       disabled
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Paper>
// //             </Grid>

// //             {/* Business Details */}
// //             <Grid size={{ xs: 12 }}>
// //               <Paper sx={{ p: 3, mb: 3 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                   Business Details
// //                 </Typography>
// //                 <Divider sx={{ mb: 2 }} />
// //                 <Grid container spacing={2}>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Business Name"
// //                       name="businessName"
// //                       value={formData.businessDetails?.businessName || ""}
// //                       onChange={handleBusinessDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Business Email"
// //                       name="businessEmail"
// //                       type="email"
// //                       value={formData.businessDetails?.businessEmail || ""}
// //                       onChange={handleBusinessDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Business Phone"
// //                       name="businessPhone"
// //                       value={formData.businessDetails?.businessPhone || ""}
// //                       onChange={handleBusinessDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Business Logo URL"
// //                       name="logo"
// //                       value={formData.businessDetails?.logo || ""}
// //                       onChange={handleBusinessDetailChange}
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Business Address"
// //                       name="businessAddress"
// //                       multiline
// //                       rows={2}
// //                       value={formData.businessDetails?.businessAddress || ""}
// //                       onChange={handleBusinessDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="GSTIN"
// //                       value={formData.GSTIN || ""}
// //                       onChange={handleGSTINChange}
// //                       required
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Paper>
// //             </Grid>

// //             {/* Bank Details */}
// //             <Grid size={{ xs: 12 }}>
// //               <Paper sx={{ p: 3, mb: 3 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                   Bank Details
// //                 </Typography>
// //                 <Divider sx={{ mb: 2 }} />
// //                 <Grid container spacing={2}>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Account Holder Name"
// //                       name="accountHolderName"
// //                       value={formData.bankDetails?.accountHolderName || ""}
// //                       onChange={handleBankDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Account Number"
// //                       name="accountNumber"
// //                       value={formData.bankDetails?.accountNumber || ""}
// //                       onChange={handleBankDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="IFSC Code"
// //                       name="ifscCode"
// //                       value={formData.bankDetails?.ifscCode || ""}
// //                       onChange={handleBankDetailChange}
// //                       required
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Paper>
// //             </Grid>

// //             {/* Pickup Address */}
// //             <Grid size={{ xs: 12 }}>
// //               <Paper sx={{ p: 3, mb: 3 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                   Pickup Address
// //                 </Typography>
// //                 <Divider sx={{ mb: 2 }} />
// //                 <Grid container spacing={2}>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Full Name"
// //                       name="name"
// //                       value={formData.pickupAddress?.name || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Phone Number"
// //                       name="phone"
// //                       value={formData.pickupAddress?.phone || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Address"
// //                       name="address"
// //                       multiline
// //                       rows={2}
// //                       value={formData.pickupAddress?.address || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Locality"
// //                       name="locality"
// //                       value={formData.pickupAddress?.locality || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="City"
// //                       name="city"
// //                       value={formData.pickupAddress?.city || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="State"
// //                       name="state"
// //                       value={formData.pickupAddress?.state || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                   <Grid size={{ xs: 12, sm: 6 }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Postal Code"
// //                       name="postalCode"
// //                       value={formData.pickupAddress?.postalCode || ""}
// //                       onChange={handleAddressChange}
// //                       required
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Paper>
// //             </Grid>

// //             {/* Submit Button */}
// //             <Grid size={{ xs: 12 }}>
// //               <Button
// //                 type="submit"
// //                 variant="contained"
// //                 color="primary"
// //                 size="large"
// //                 disabled={loading}
// //                 sx={{ py: 1.5, px: 4 }}
// //               >
// //                 {loading ? <CircularProgress size={24} /> : "Update Profile"}
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         </form>

// //         <Snackbar
// //           open={openSnackbar}
// //           autoHideDuration={6000}
// //           onClose={handleCloseSnackbar}
// //         >
// //           <Alert onClose={handleCloseSnackbar} severity="success">
// //             Profile updated successfully!
// //           </Alert>
// //         </Snackbar>
// //       </Box>
// //     </>
// //   );
// // };

// // export default SellerAccount;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Divider,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux/store";
// import {
//   updateSeller,
//   resetProfileUpdated,
//   selectSellerProfile,
//   selectSellerLoading,
//   selectProfileUpdated,
//   selectSellerError,
// } from "../../../Redux/Seller/sellerSlice";
// import { useAuth } from "../../../auth/AuthContext";

// const SellerAccount = () => {
//   const dispatch = useAppDispatch();
//   const { token } = useAuth(); // Get token from AuthContext
//   const profile = useAppSelector(selectSellerProfile);
//   const loading = useAppSelector(selectSellerLoading);
//   const profileUpdated = useAppSelector(selectProfileUpdated);
//   const error = useAppSelector(selectSellerError);

//   // Form state with updated properties based on your backend changes
//   const [formData, setFormData] = useState({
//     id: 1,
//     username: "",
//     mobile: "", // Editable field
//     GSTIN: "",
//     businessDetails: {
//       businessName: "",
//       businessEmail: "",
//       businessPhone: "",
//       businessAddress: "",
//       logo: "",
//     },
//     bankDetails: {
//       accountHolderName: "",
//       accountNumber: "",
//       ifscCode: "",
//     },
//     pickupAddress: {
//       name: "",
//       locality: "",
//       address: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       phone: "",
//     },
//   });

//   // Success notification state
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   // Initialize form with profile data when it's loaded
//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         id: profile.id || 0,
//         username: profile.username || "",
//         mobile: profile.mobile || "", // Editable
//         GSTIN: profile.GSTIN || "",
//         businessDetails: {
//           businessName: profile.businessDetails?.businessName || "",
//           businessEmail: profile.businessDetails?.businessEmail || "",
//           businessPhone: profile.businessDetails?.businessPhone || "",
//           businessAddress: profile.businessDetails?.businessAddress || "",
//           logo: profile.businessDetails?.logo || "",
//         },
//         bankDetails: {
//           accountHolderName: profile.bankDetails?.accountHolderName || "",
//           accountNumber: profile.bankDetails?.accountNumber || "",
//           ifscCode: profile.bankDetails?.ifscCode || "",
//         },
//         pickupAddress: {
//           name: profile.pickupAddress?.name || "",
//           locality: profile.pickupAddress?.locality || "",
//           address: profile.pickupAddress?.address || "",
//           city: profile.pickupAddress?.city || "",
//           state: profile.pickupAddress?.state || "",
//           postalCode: profile.pickupAddress?.postalCode || "",
//           phone: profile.pickupAddress?.phone || "",
//         },
//       });
//     }
//   }, [profile]);

//   // Show success notification when profile is updated
//   useEffect(() => {
//     if (profileUpdated) {
//       setOpenSnackbar(true);
//       // Reset the profileUpdated flag after showing notification
//       const timer = setTimeout(() => {
//         dispatch(resetProfileUpdated());
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [profileUpdated, dispatch]);

//   // Handle form field changes
//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setFormData((prev: any) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     if (!token) {
//       console.error("No authentication token available");
//       return;
//     }

//     // Pass both seller data and token to the action
//     dispatch(updateSeller({ seller: formData, token }));
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Seller Account
//       </Typography>

//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Basic Information (Not Editable)
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <TextField
//               fullWidth
//               label="Username"
//               name="username"
//               value={formData.username}
//               disabled
//               margin="normal"
//             />
//           </Grid>
//           {/* No Mobile field here - it's in the editable section! */}
//         </Grid>
//       </Paper>

//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           Editable Information
//         </Typography>
//         <Divider sx={{ mb: 2 }} />

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {/* Mobile field in editable section */}
//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Mobile"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="GSTIN"
//                 name="GSTIN"
//                 value={formData.GSTIN}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             {/* Business Details */}
//             <Grid size={{ xs: 12 }}>
//               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                 Business Details
//               </Typography>
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Business Name"
//                 name="businessDetails.businessName"
//                 value={formData.businessDetails.businessName}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Business Email"
//                 name="businessDetails.businessEmail"
//                 value={formData.businessDetails.businessEmail}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Business Phone"
//                 name="businessDetails.businessPhone"
//                 value={formData.businessDetails.businessPhone}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Business Address"
//                 name="businessDetails.businessAddress"
//                 value={formData.businessDetails.businessAddress}
//                 onChange={handleChange}
//                 margin="normal"
//                 multiline
//                 rows={2}
//               />
//             </Grid>

//             {/* Bank Details */}
//             <Grid size={{ xs: 12 }}>
//               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                 Bank Details
//               </Typography>
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Account Holder Name"
//                 name="bankDetails.accountHolderName"
//                 value={formData.bankDetails.accountHolderName}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Account Number"
//                 name="bankDetails.accountNumber"
//                 value={formData.bankDetails.accountNumber}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="IFSC Code"
//                 name="bankDetails.ifscCode"
//                 value={formData.bankDetails.ifscCode}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             {/* Pickup Address */}
//             <Grid size={{ xs: 12 }}>
//               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                 Pickup Address
//               </Typography>
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="pickupAddress.name"
//                 value={formData.pickupAddress.name}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Locality"
//                 name="pickupAddress.locality"
//                 value={formData.pickupAddress.locality}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12 }}>
//               <TextField
//                 fullWidth
//                 label="Address"
//                 name="pickupAddress.address"
//                 value={formData.pickupAddress.address}
//                 onChange={handleChange}
//                 margin="normal"
//                 multiline
//                 rows={2}
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextField
//                 fullWidth
//                 label="City"
//                 name="pickupAddress.city"
//                 value={formData.pickupAddress.city}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextField
//                 fullWidth
//                 label="State"
//                 name="pickupAddress.state"
//                 value={formData.pickupAddress.state}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 4 }}>
//               <TextField
//                 fullWidth
//                 label="Postal Code"
//                 name="pickupAddress.postalCode"
//                 value={formData.pickupAddress.postalCode}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12, md: 6 }}>
//               <TextField
//                 fullWidth
//                 label="Phone"
//                 name="pickupAddress.phone"
//                 value={formData.pickupAddress.phone}
//                 onChange={handleChange}
//                 margin="normal"
//               />
//             </Grid>

//             <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 disabled={loading}
//               >
//                 {loading ? "Updating..." : "Update Profile"}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>

//       {/* Error display */}
//       {error && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Success notification */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success">
//           Profile updated successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default SellerAccount;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  updateSeller,
  resetProfileUpdated,
  selectSellerProfile,
  selectSellerLoading,
  selectProfileUpdated,
  selectSellerError,
} from "../../../Redux/Seller/sellerSlice";
import { useAuth } from "../../../auth/AuthContext";

const SellerAccount = () => {
  const dispatch = useAppDispatch();
  const { token } = useAuth();
  const profile = useAppSelector(selectSellerProfile);
  const loading = useAppSelector(selectSellerLoading);
  const profileUpdated = useAppSelector(selectProfileUpdated);
  const error = useAppSelector(selectSellerError);

  // Flattened form state
  const [formData, setFormData] = useState({
    id: 1,
    username: "",
    mobile: "",
    GSTIN: "",

    // Flattened business details
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    logo: "",

    // Flattened bank details
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",

    // Address remains the same
    pickupAddress: {
      name: "",
      locality: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Initialize form with profile data when it's loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id || 0,
        username: profile.username || "",
        mobile: profile.mobile || "",
        GSTIN: profile.GSTIN || "",

        // Flattened business details
        businessName: profile.businessName || "",
        businessEmail: profile.businessEmail || "",
        businessPhone: profile.businessPhone || "",
        businessAddress: profile.businessAddress || "",
        logo: profile.logo || "",

        // Flattened bank details
        accountHolderName: profile.accountHolderName || "",
        accountNumber: profile.accountNumber || "",
        ifscCode: profile.ifscCode || "",

        // Address remains the same
        pickupAddress: {
          name: profile.pickupAddress?.name || "",
          locality: profile.pickupAddress?.locality || "",
          address: profile.pickupAddress?.address || "",
          city: profile.pickupAddress?.city || "",
          state: profile.pickupAddress?.state || "",
          postalCode: profile.pickupAddress?.postalCode || "",
          phone: profile.pickupAddress?.phone || "",
        },
      });
    }
  }, [profile]);

  useEffect(() => {
    if (profileUpdated) {
      setOpenSnackbar(true);
      const timer = setTimeout(() => {
        dispatch(resetProfileUpdated());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [profileUpdated, dispatch]);

  // Handle form field changes for flattened structure
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!token) {
      console.error("No authentication token available");
      return;
    }

    dispatch(updateSeller({ seller: formData, token }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Seller Account
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Basic Information (Not Editable)
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              disabled
              margin="normal"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Editable Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="GSTIN"
                name="GSTIN"
                value={formData.GSTIN}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Business Details Section */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Business Details
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Phone"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Business Address"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>

            {/* Bank Details Section */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Bank Details
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Pickup Address - kept as is */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Pickup Address
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Name"
                name="pickupAddress.name"
                value={formData.pickupAddress.name}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Locality"
                name="pickupAddress.locality"
                value={formData.pickupAddress.locality}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                name="pickupAddress.address"
                value={formData.pickupAddress.address}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={2}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="City"
                name="pickupAddress.city"
                value={formData.pickupAddress.city}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="State"
                name="pickupAddress.state"
                value={formData.pickupAddress.state}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Postal Code"
                name="pickupAddress.postalCode"
                value={formData.pickupAddress.postalCode}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                name="pickupAddress.phone"
                value={formData.pickupAddress.phone}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SellerAccount;
