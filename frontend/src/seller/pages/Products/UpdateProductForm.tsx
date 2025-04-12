import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../../../assets/data/Filter/color";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import { updateProduct } from "../../../Redux/Seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../utils/uploadToCloudnary";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../Redux/Customer/ProductSlice";
import { Product } from "../../../types/productTypes";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title should be at least 5 characters long")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description should be at least 10 characters long")
    .required("Description is required"),
  mrpPrice: Yup.number()
    .positive("MRP Price should be greater than zero")
    .required("MRP Price is required"),
  sellingPrice: Yup.number()
    .positive("Selling Price should be greater than zero")
    .required("Selling Price is required"),
  discountPercent: Yup.number()
    .min(0, "Discount Percent cannot be negative")
    .max(100, "Discount Percent cannot exceed 100")
    .required("Discount Percent is required"),
  quantity: Yup.number()
    .positive("Quantity should be greater than zero")
    .required("Quantity is required"),
  color: Yup.string().required("Color is required"),
  sizes: Yup.string().required("Sizes are required"),
});

const UpdateProductForm = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const dispatch = useAppDispatch();
  const { sellerProduct, products } = useAppSelector((store) => store);
  const { productId } = useParams();
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik<Partial<Product>>({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: 0,
      sellingPrice: 0,
      discountPercent: 0,
      quantity: 0,
      color: "",
      images: [],
      sizes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateProduct({ productId: Number(productId), product: values })
      );
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setUploadingImage(true);

    try {
      const image = await uploadToCloudinary(file);
      formik.setFieldValue("images", [...(formik.values.images || []), image]);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...(formik.values.images || [])];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Calculate discount percent when either mrpPrice or sellingPrice changes
  useEffect(() => {
    if (formik.values.mrpPrice && formik.values.sellingPrice) {
      const mrp = Number(formik.values.mrpPrice);
      const selling = Number(formik.values.sellingPrice);

      if (mrp > 0 && selling <= mrp) {
        const discount = Math.round(((mrp - selling) / mrp) * 100);
        formik.setFieldValue("discountPercent", discount);
      }
    }
  }, [formik.values.mrpPrice, formik.values.sellingPrice]);

  // Fetch product data when component mounts
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [productId, dispatch]);

  // Show snackbar when product is updated or there's an error
  useEffect(() => {
    if (sellerProduct.productUpdated || sellerProduct.error) {
      setOpenSnackbar(true);
    }
  }, [sellerProduct.productUpdated, sellerProduct.error]);

  // Set form values when product data is loaded
  useEffect(() => {
    if (products.product) {
      formik.setValues({
        title: products.product.title || "",
        description: products.product.description || "",
        mrpPrice: products.product.mrpPrice || 0,
        sellingPrice: products.product.sellingPrice || 0,
        discountPercent: products.product.discountPercent || 0,
        quantity: products.product.quantity || 0,
        category: products.product.category,
        seller: products.product.seller,
        createdAt: products.product.createdAt || "",
        color: products.product.color || "",
        images: products.product.images || [],
        sizes: products.product.sizes || "",
      });
    }
  }, [products.product]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          {/* Image Upload Section */}
          <Grid size={{ xs: 12 }}>
            <div className="flex flex-wrap gap-5">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                  <AddPhotoAlternateIcon className="text-gray-700" />
                </span>
                {uploadingImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images &&
                  formik.values.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        className="w-24 h-24 object-cover"
                        src={image}
                        alt={`ProductImage ${index + 1}`}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        size="small"
                        color="error"
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          outline: "none",
                        }}
                      >
                        <CloseIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  ))}
              </div>
            </div>
          </Grid>

          {/* Product Title */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
            />
          </Grid>

          {/* Product Description */}
          <Grid size={{ xs: 12 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
            />
          </Grid>

          {/* MRP Price */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="mrpPrice"
              name="mrpPrice"
              label="MRP Price"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
            />
          </Grid>

          {/* Selling Price */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="sellingPrice"
              name="sellingPrice"
              label="Selling Price"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
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

          {/* Discount Percent - Calculated automatically but can be overridden */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="discountPercent"
              name="discountPercent"
              label="Discount Percent"
              type="number"
              InputProps={{
                readOnly: false, // Allow manual override if needed
              }}
              value={formik.values.discountPercent}
              onChange={formik.handleChange}
              error={
                formik.touched.discountPercent &&
                Boolean(formik.errors.discountPercent)
              }
              helperText={
                formik.touched.discountPercent && formik.errors.discountPercent
              }
              required
            />
          </Grid>

          {/* Quantity */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Quantity"
              type="number"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              required
            />
          </Grid>

          {/* Color Selection */}
          <Grid size={{ xs: 12, sm: 6 }}>
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
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color, index) => (
                  <MenuItem key={index} value={color.name}>
                    <div className="flex gap-3">
                      <span
                        style={{ backgroundColor: color.hex }}
                        className={`h-5 w-5 rounded-full ${
                          color.name === "White" ? "border" : ""
                        }`}
                      ></span>
                      <p>{color.name}</p>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Size Selection */}
          <Grid size={{ xs: 12, sm: 6 }}>
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
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={sellerProduct.loading}
            >
              {sellerProduct.loading ? (
                <CircularProgress
                  size={24}
                  sx={{ width: "24px", height: "24px" }}
                />
              ) : (
                "Update Product"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Success/Error Notification */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerProduct.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {sellerProduct.error
            ? sellerProduct.error
            : "Product updated successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateProductForm;
