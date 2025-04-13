// import React, { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   FormHelperText,
//   Grid,
//   CircularProgress,
//   IconButton,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import CloseIcon from "@mui/icons-material/Close";
// import { mainCategory } from "../../../data/category/mainCategory";
// import { menLevelTwo } from "../../../data/category/levelTwo/menLevelTwo";
// import { womenLevelTwo } from "../../../data/category/levelTwo/womenLevelTwo";
// import { menLevelThree } from "../../../data/category/levelThree/menLevelThree";
// import { womenLevelThree } from "../../../data/category/levelThree/womenLevelThree";
// import { colors } from "../../../data/Filter/color";
// import { useAppDispatch, useAppSelector } from "../../../Redux/store";
// import {
//   createProduct,
//   // resetProductCreated,
// } from "../../../Redux/Seller/sellerProductSlice";
// import { uploadToCloudinary } from "../../../utils/uploadToCloudnary";
// import { electronicsLevelThree } from "../../../data/category/levelThree/electronicsLevelThree";
// import { electronicsLevelTwo } from "../../../data/category/levelTwo/electronicsLavelTwo";
// import { furnitureLevelTwo } from "../../../data/category/levelTwo/furnitureLevleTwo";
// import { furnitureLevelThree } from "../../../data/category/levelThree/furnitureLevelThree";

// const categoryTwo: { [key: string]: any[] } = {
//   men: menLevelTwo,
//   women: womenLevelTwo,
//   kids: [],
//   home_furniture: furnitureLevelTwo,
//   beauty: [],
//   electronics: electronicsLevelTwo,
// };

// const categoryThree: { [key: string]: any[] } = {
//   men: menLevelThree,
//   women: womenLevelThree,
//   kids: [],
//   home_furniture: furnitureLevelThree,
//   beauty: [],
//   electronics: electronicsLevelThree,
// };

// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(5, "Title should be at least 5 characters long")
//     .required("Title is required"),
//   description: Yup.string()
//     .min(10, "Description should be at least 10 characters long")
//     .required("Description is required"),
//   mrpPrice: Yup.number()
//     .positive("Price should be greater than zero")
//     .required("Price is required"),
//   sellingPrice: Yup.number()
//     .positive("Selling Price should be greater than zero")
//     .required("Selling Price is required"),
//   quantity: Yup.number()
//     .positive("Quantity should be greater than zero")
//     .required("Quantity is required"),
//   color: Yup.string().required("Color is required"),
//   category: Yup.string().required("Category is required"),
//   sizes: Yup.string().required("Sizes are required"),
// });

// const AddProductForm = () => {
//   const [uploadImage, setUploadingImage] = useState(false);
//   const dispatch = useAppDispatch();
//   const { sellerProduct } = useAppSelector((store) => store);

//   const [snackbarOpen, setOpenSnackbar] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       title: "",
//       description: "",
//       mrpPrice: "",
//       sellingPrice: "",
//       quantity: "",
//       color: "",
//       images: [],
//       category: "",
//       category2: "",
//       category3: "",
//       sizes: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Calculate discount percentage
//       const mrp = parseFloat(values.mrpPrice as string);
//       const selling = parseFloat(values.sellingPrice as string);
//       const discountPercent =
//         mrp > 0 ? Math.round(((mrp - selling) / mrp) * 100) : 0;

//       // Create the product request object
//       const productRequest = {
//         title: values.title,
//         description: values.description,
//         mrpPrice: mrp,
//         sellingPrice: selling,
//         discountPercent: discountPercent,
//         quantity: parseInt(values.quantity as string),
//         color: values.color,
//         images: values.images,
//         category: {
//           categoryId: values.category3 || values.category2 || values.category,
//         },
//         sizes: values.sizes,
//       };

//       // Dispatch create product action
//       dispatch(
//         createProduct({
//           request: productRequest,
//           jwt: localStorage.getItem("jwt"),
//         })
//       );
//     },
//   });

//   const handleImageChange = async (event: any) => {
//     const file = event.target.files[0];
//     setUploadingImage(true);
//     const image = await uploadToCloudinary(file);
//     formik.setFieldValue("images", [...formik.values.images, image]);
//     setUploadingImage(false);
//   };

//   const handleRemoveImage = (index: number) => {
//     const updatedImages = [...formik.values.images];
//     updatedImages.splice(index, 1);
//     formik.setFieldValue("images", updatedImages);
//   };

//   const childCategory = (category: any, parentCategoryId: any) => {
//     return category.filter((child: any) => {
//       return child.parentCategoryId === parentCategoryId;
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//     if (sellerProduct.productCreated) {
//       dispatch(resetProductCreated());
//     }
//   };

//   useEffect(() => {
//     if (sellerProduct.productCreated || sellerProduct.error) {
//       setOpenSnackbar(true);
//     }
//   }, [sellerProduct.productCreated, sellerProduct.error]);

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
//         <Grid container spacing={2}>
//           <Grid size={{ xs: 12 }}>
//             <div className="flex flex-wrap gap-5">
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="fileInput"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />

//               <label className="relative" htmlFor="fileInput">
//                 <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
//                   <AddPhotoAlternateIcon className="text-gray-700" />
//                 </span>
//                 {uploadImage && (
//                   <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
//                     <CircularProgress />
//                   </div>
//                 )}
//               </label>

//               <div className="flex flex-wrap gap-2">
//                 {formik.values.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       className="w-24 h-24 object-cover"
//                       src={image}
//                       alt={`ProductImage ${index + 1}`}
//                     />
//                     <IconButton
//                       onClick={() => handleRemoveImage(index)}
//                       className=""
//                       size="small"
//                       color="error"
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         right: 0,
//                         outline: "none",
//                       }}
//                     >
//                       <CloseIcon sx={{ fontSize: "1rem" }} />
//                     </IconButton>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Grid>
//           <Grid size={{ xs: 12, sm: 12 }}>
//             <TextField
//               fullWidth
//               id="title"
//               name="title"
//               label="Title"
//               value={formik.values.title}
//               onChange={formik.handleChange}
//               error={formik.touched.title && Boolean(formik.errors.title)}
//               helperText={formik.touched.title && formik.errors.title}
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 12 }}>
//             <TextField
//               multiline
//               rows={4}
//               fullWidth
//               id="description"
//               name="description"
//               label="Description"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.description && Boolean(formik.errors.description)
//               }
//               helperText={
//                 formik.touched.description && formik.errors.description
//               }
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <TextField
//               fullWidth
//               id="mrpPrice"
//               name="mrpPrice"
//               label="MRP Price"
//               type="number"
//               value={formik.values.mrpPrice}
//               onChange={formik.handleChange}
//               error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
//               helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <TextField
//               fullWidth
//               id="sellingPrice"
//               name="sellingPrice"
//               label="Selling Price"
//               type="number"
//               value={formik.values.sellingPrice}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.sellingPrice &&
//                 Boolean(formik.errors.sellingPrice)
//               }
//               helperText={
//                 formik.touched.sellingPrice && formik.errors.sellingPrice
//               }
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <TextField
//               fullWidth
//               id="quantity"
//               name="quantity"
//               label="Quantity"
//               type="number"
//               value={formik.values.quantity}
//               onChange={formik.handleChange}
//               error={formik.touched.quantity && Boolean(formik.errors.quantity)}
//               helperText={formik.touched.quantity && formik.errors.quantity}
//               required
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <FormControl
//               fullWidth
//               error={formik.touched.color && Boolean(formik.errors.color)}
//               required
//             >
//               <InputLabel id="color-label">Color</InputLabel>
//               <Select
//                 labelId="color-label"
//                 id="color"
//                 name="color"
//                 value={formik.values.color}
//                 onChange={formik.handleChange}
//                 label="Color"
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>

//                 {colors.map((color, index) => (
//                   <MenuItem key={index} value={color.name}>
//                     <div className="flex gap-3">
//                       <span
//                         style={{ backgroundColor: color.hex }}
//                         className={`h-5 w-5 rounded-full ${
//                           color.name === "White" ? "border" : ""
//                         }`}
//                       ></span>
//                       <p>{color.name}</p>
//                     </div>
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched.color && formik.errors.color && (
//                 <FormHelperText>{formik.errors.color}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <FormControl
//               fullWidth
//               error={formik.touched.sizes && Boolean(formik.errors.sizes)}
//               required
//             >
//               <InputLabel id="sizes-label">Sizes</InputLabel>
//               <Select
//                 labelId="sizes-label"
//                 id="sizes"
//                 name="sizes"
//                 value={formik.values.sizes}
//                 onChange={formik.handleChange}
//                 label="Sizes"
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value="FREE">FREE</MenuItem>
//                 <MenuItem value="S">S</MenuItem>
//                 <MenuItem value="M">M</MenuItem>
//                 <MenuItem value="L">L</MenuItem>
//                 <MenuItem value="XL">XL</MenuItem>
//               </Select>
//               {formik.touched.sizes && formik.errors.sizes && (
//                 <FormHelperText>{formik.errors.sizes}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <FormControl
//               fullWidth
//               error={formik.touched.category && Boolean(formik.errors.category)}
//               required
//             >
//               <InputLabel id="category-label">Category</InputLabel>
//               <Select
//                 labelId="category-label"
//                 id="category"
//                 name="category"
//                 value={formik.values.category}
//                 onChange={formik.handleChange}
//                 label="Category"
//               >
//                 {mainCategory.map((item, index) => (
//                   <MenuItem key={index} value={item.categoryId}>
//                     {item.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {formik.touched.category && formik.errors.category && (
//                 <FormHelperText>{formik.errors.category}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>

//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <FormControl
//               fullWidth
//               error={
//                 formik.touched.category2 && Boolean(formik.errors.category2)
//               }
//             >
//               <InputLabel id="category2-label">Second Category</InputLabel>
//               <Select
//                 labelId="category2-label"
//                 id="category2"
//                 name="category2"
//                 value={formik.values.category2}
//                 onChange={formik.handleChange}
//                 label="Second Category"
//                 disabled={!formik.values.category}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 {formik.values.category &&
//                   categoryTwo[formik.values.category]?.map((item, index) => (
//                     <MenuItem key={index} value={item.categoryId}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//               </Select>
//               {formik.touched.category2 && formik.errors.category2 && (
//                 <FormHelperText>{formik.errors.category2}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
//             <FormControl
//               fullWidth
//               error={
//                 formik.touched.category3 && Boolean(formik.errors.category3)
//               }
//             >
//               <InputLabel id="category3-label">Third Category</InputLabel>
//               <Select
//                 labelId="category3-label"
//                 id="category3"
//                 name="category3"
//                 value={formik.values.category3}
//                 onChange={formik.handleChange}
//                 label="Third Category"
//                 disabled={!formik.values.category2}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 {formik.values.category2 &&
//                   childCategory(
//                     categoryThree[formik.values.category],
//                     formik.values.category2
//                   )?.map((item: any, index: number) => (
//                     <MenuItem key={index} value={item.categoryId}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//               </Select>
//               {formik.touched.category3 && formik.errors.category3 && (
//                 <FormHelperText>{formik.errors.category3}</FormHelperText>
//               )}
//             </FormControl>
//           </Grid>
//           <Grid size={{ xs: 12 }}>
//             <Button
//               sx={{ p: "14px" }}
//               color="primary"
//               variant="contained"
//               fullWidth
//               type="submit"
//               disabled={sellerProduct.loading}
//             >
//               {sellerProduct.loading ? (
//                 <CircularProgress size={24} />
//               ) : (
//                 "Add Product"
//               )}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={sellerProduct.error ? "error" : "success"}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {sellerProduct.error
//             ? sellerProduct.error
//             : "Product created successfully"}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AddProductForm;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/levelTwo/womenLevelTwo";
import { menLevelThree } from "../../../data/category/levelThree/menLevelThree";
import { womenLevelThree } from "../../../data/category/levelThree/womenLevelThree";
import { colors } from "../../../data/Filter/color";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  createProduct,
  resetProductState,
} from "../../../Redux/Seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../utils/uploadToCloudnary";
import { electronicsLevelThree } from "../../../data/category/levelThree/electronicsLevelThree";
import { electronicsLevelTwo } from "../../../data/category/levelTwo/electronicsLavelTwo";
import { furnitureLevelTwo } from "../../../data/category/levelTwo/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/levelThree/furnitureLevelThree";
import { useAuth } from "../../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title should be at least 5 characters long")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description should be at least 10 characters long")
    .required("Description is required"),
  mrpPrice: Yup.number()
    .positive("Price should be greater than zero")
    .required("Price is required"),
  sellingPrice: Yup.number()
    .positive("Selling Price should be greater than zero")
    .required("Selling Price is required"),
  quantity: Yup.number()
    .positive("Quantity should be greater than zero")
    .required("Quantity is required"),
  color: Yup.string().required("Color is required"),
  category: Yup.string().required("Category is required"),
  sizes: Yup.string().required("Sizes are required"),
});

const AddProductForm: React.FC = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const { sellerProduct } = useAppSelector((store) => store);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const calculateDiscountPercent = (mrp: number, selling: number): number => {
    if (!mrp || !selling || mrp <= 0) return 0;
    return Math.round(((mrp - selling) / mrp) * 100);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      images: [] as string[],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const discountPercent = calculateDiscountPercent(
        Number(values.mrpPrice),
        Number(values.sellingPrice)
      );

      const request = {
        title: values.title,
        description: values.description,
        mrpPrice: Number(values.mrpPrice),
        sellingPrice: Number(values.sellingPrice),
        discountPercent,
        quantity: Number(values.quantity),
        color: values.color,
        images: values.images,
        // Replace the nested category object with these three separate fields
        category: values.category,
        category2: values.category2,
        category3: values.category3,
        sizes: values.sizes,
      };

      dispatch(createProduct({ request, jwt: token }));
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setUploadingImage(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (category: any[], parentCategoryId: any) => {
    return category.filter((child) => {
      return child.parentCategoryId === parentCategoryId;
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    if (sellerProduct.productCreated) {
      dispatch(resetProductState());
      navigate("/seller/products");
    }
  };

  React.useEffect(() => {
    if (sellerProduct.productCreated || sellerProduct.error) {
      setSnackbarOpen(true);
    }
  }, [sellerProduct.productCreated, sellerProduct.error]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Add New Product
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Image Upload Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <label htmlFor="fileInput" style={{ position: "relative" }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed grey",
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                >
                  <AddPhotoAlternateIcon color="action" />
                </Box>
                {uploadingImage && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                )}
              </label>

              {formik.values.images.map((image, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {formik.touched.images && formik.errors.images && (
              <Typography color="error" variant="caption">
                {formik.errors.images as string}
              </Typography>
            )}
          </Grid>

          {/* Title and Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>

          {/* Price Information */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.sellingPrice &&
                Boolean(formik.errors.sellingPrice)
              }
              helperText={
                formik.touched.sellingPrice && formik.errors.sellingPrice
              }
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              required
            />
          </Grid>

          {/* Color Selection */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Color"
              >
                {colors.map((color, index) => (
                  <MenuItem key={index} value={color.name}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          bgcolor: color.hex,
                          border:
                            color.name === "White" ? "1px solid #ddd" : "none",
                        }}
                      />
                      <span>{color.name}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Size Selection */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Sizes"
              >
                <MenuItem value="FREE">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Category Selection */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Category"
              >
                {mainCategory.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Sub-category Selection */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth disabled={!formik.values.category}>
              <InputLabel id="category2-label">Sub Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Sub Category"
              >
                {formik.values.category &&
                  categoryTwo[formik.values.category]?.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sub-sub-category Selection */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth disabled={!formik.values.category2}>
              <InputLabel id="category3-label">Product Type</InputLabel>
              <Select
                labelId="category3-label"
                id="category3"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Product Type"
              >
                {formik.values.category &&
                  formik.values.category2 &&
                  childCategory(
                    categoryThree[formik.values.category],
                    formik.values.category2
                  )?.map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={sellerProduct.loading}
              sx={{ py: 1.5 }}
              fullWidth
            >
              {sellerProduct.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success/Error Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerProduct.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerProduct.error
            ? sellerProduct.error
            : "Product created successfully"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductForm;
