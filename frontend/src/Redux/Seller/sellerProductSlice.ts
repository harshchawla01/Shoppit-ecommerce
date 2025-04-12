import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { Product } from "../../types/productTypes";

const API_URL = "api/sellers/product";

// Fetch all products for a seller
export const fetchSellerProducts = createAsyncThunk<Product[], string>(
  "sellerProduct/fetchSellerProducts",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get<Product[]>(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("seller products ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Interface matching the backend CreateProductRequest
interface CreateProductRequest {
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  color: string;
  images: string[];
  category: any;
  sizes: string;
}

// Create a new product
export const createProduct = createAsyncThunk<
  Product,
  { request: CreateProductRequest; jwt: string | null }
>(
  "sellerProduct/createProduct",
  async ({ request, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post<Product>(API_URL, request, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("product created ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update an existing product
export const updateProduct = createAsyncThunk<
  Product,
  { productId: number; product: Partial<Product> }
>(
  "sellerProduct/updateProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("kc_token");
      const response = await api.patch<Product>(`${API_URL}/${productId}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("product updated ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk<number, number>(
  "sellerProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("kc_token");
      await api.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface SellerProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  productCreated: boolean;
  productUpdated: boolean;
}

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: null,
  productCreated: false,
  productUpdated: false,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.productCreated = false;
      state.productUpdated = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSellerProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productCreated = false;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.loading = false;
          state.productCreated = true;
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
        state.productCreated = false;
      })
      
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productUpdated = false;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          state.loading = false;
          state.productUpdated = true;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
        state.productUpdated = false;
      })
      
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export const { resetProductState } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;