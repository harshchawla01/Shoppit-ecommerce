// // import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// // import axios from "axios";
// // import { Product } from "../../types/productTypes";
// // import { RootState } from "../Store";
// // import { api } from "../../Config/Api";

// // // Define the base URL for the API
// // const API_URL = "/products";

// // // Define the initial state type
// // interface ProductState {
// //   product: Product | null;
// //   products: Product[];
// //   paginatedProducts: any;
// //   totalPages:number;
// //   loading: boolean;
// //   error: string | null;
// //   searchProduct:Product[]
// // }

// // // Define the initial state
// // const initialState: ProductState = {
// //   product: null,
// //   products: [],
// //   paginatedProducts: null,
// //   totalPages:1,
// //   loading: false,
// //   error: null,
// //   searchProduct: []
// // };

// // // Create async thunks for API calls
// // export const fetchProductById = createAsyncThunk<Product, number>(
// //   "products/fetchProductById",
// //   async (productId, { rejectWithValue }) => {
// //     try {
// //       const response = await api.get<Product>(`${API_URL}/${productId}`);
// //       console.log("product details ", response.data);
// //       return response.data;
// //     } catch (error: any) {
// //       console.log("error ", error.response);
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // export const searchProduct = createAsyncThunk<Product[], string>(
// //   "products/searchProduct",
// //   async (query, { rejectWithValue }) => {
// //     try {
// //       const response = await api.get<Product[]>(`${API_URL}/search`, {
// //         params: { query },
// //       });
// //       console.log("search products ",response.data)
// //       return response.data;
// //     } catch (error: any) {
// //       console.log("error ",error.response)
// //       return rejectWithValue(error.response.data);
// //     }
// //   }
// // );

// // export const getAllProducts = createAsyncThunk<
// //   any,
// //   {
// //     category?: string;
// //     brand?:string;
// //     color?: string;
// //     size?: string;
// //     minPrice?: number;
// //     maxPrice?: number;
// //     minDiscount?: number;
// //     sort?: string;
// //     stock?: string;
// //     pageNumber?: number;
// //   }
// // >("products", async (params, { rejectWithValue }) => {
// //   try {
// //     const response = await api.get<any>(API_URL, {
// //       params: {
// //         ...params,
// //         pageNumber: params.pageNumber || 0,
// //       },
// //     });
// //     console.log("all products ", response.data);
// //     return response.data;
// //   } catch (error: any) {
// //     console.log("error ", error.response);
// //     return rejectWithValue(error.response.data);
// //   }
// // });

// // // Create the slice
// // const productSlice = createSlice({
// //   name: "products",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchProductById.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(
// //         fetchProductById.fulfilled,
// //         (state, action: PayloadAction<Product>) => {
// //           state.product = action.payload;
// //           state.loading = false;
// //         }
// //       )
// //       .addCase(fetchProductById.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message || "Failed to fetch product";
// //       })
// //       .addCase(searchProduct.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(
// //         searchProduct.fulfilled,
// //         (state, action: PayloadAction<Product[]>) => {
// //           state.searchProduct = action.payload;
// //           state.loading = false;
// //         }
// //       )
// //       .addCase(searchProduct.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message || "Failed to search products";
// //       })
// //       .addCase(getAllProducts.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(
// //         getAllProducts.fulfilled,
// //         (state, action: PayloadAction<any>) => {
// //           state.paginatedProducts = action.payload;
// //           state.products = action.payload.content;
// //           state.totalPages=action.payload.totalPages
// //           state.loading = false;
// //           console.log("-----" ,  action.payload.totalPages)
// //         }
// //       )
// //       .addCase(getAllProducts.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message || "Failed to fetch products";
// //       });
// //   },
// // });

// // export default productSlice.reducer;

// // // Define selector functions
// // export const selectProduct = (state: RootState) => state.products.product;
// // export const selectProducts = (state: RootState) => state.products.products;
// // export const selectPaginatedProducts = (state: RootState) =>
// //   state.products.paginatedProducts;
// // export const selectProductLoading = (state: RootState) =>
// //   state.products.loading;
// // export const selectProductError = (state: RootState) => state.products.error;


// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { Product, Category } from "../../types/productTypes";
// import { RootState } from "../store";
// import { api } from "../../Config/Api";

// // Define the base URL for the API
// const API_URL = "/products";

// // Define filter parameters type
// export interface ProductFilters {
//   category?: string;
//   brand?: string;
//   color?: string;
//   size?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   minDiscount?: number;
//   sort?: "price_low" | "price_high" | string;
//   stock?: string;
//   pageNumber?: number;
// }

// // Define page response type
// export interface PageResponse<T> {
//   content: T[];
//   pageable: {
//     pageNumber: number;
//     pageSize: number;
//     sort: {
//       empty: boolean;
//       sorted: boolean;
//       unsorted: boolean;
//     };
//     offset: number;
//     unpaged: boolean;
//     paged: boolean;
//   };
//   last: boolean;
//   totalElements: number;
//   totalPages: number;
//   size: number;
//   number: number;
//   sort: {
//     empty: boolean;
//     sorted: boolean;
//     unsorted: boolean;
//   };
//   first: boolean;
//   numberOfElements: number;
//   empty: boolean;
// }

// // Define the initial state type
// interface ProductState {
//   product: Product | null;
//   products: Product[];
//   paginatedProducts: PageResponse<Product> | null;
//   totalPages: number;
//   currentPage: number;
//   loading: boolean;
//   error: string | null;
//   searchProduct: Product[];
//   filters: ProductFilters;
// }

// // Define the initial state
// const initialState: ProductState = {
//   product: null,
//   products: [],
//   paginatedProducts: null,
//   totalPages: 1,
//   currentPage: 0,
//   loading: false,
//   error: null,
//   searchProduct: [],
//   filters: {
//     category: undefined,
//     brand: undefined,
//     color: undefined,
//     size: undefined,
//     minPrice: undefined,
//     maxPrice: undefined,
//     minDiscount: undefined,
//     sort: undefined,
//     stock: undefined,
//     pageNumber: 0,
//   }
// };

// // Create async thunks for API calls
// export const fetchProductById = createAsyncThunk<Product, number>(
//   "products/fetchProductById",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await api.get<Product>(`${API_URL}/${productId}`);
//       return response.data;
//     } catch (error: any) {
//       console.error("Error fetching product details:", error.response);
//       return rejectWithValue(error.response?.data || "Failed to fetch product");
//     }
//   }
// );

// export const searchProduct = createAsyncThunk<Product[], string>(
//   "products/searchProduct",
//   async (query, { rejectWithValue }) => {
//     try {
//       const response = await api.get<Product[]>(`${API_URL}/search`, {
//         params: { query },
//       });
//       return response.data;
//     } catch (error: any) {
//       console.error("Error searching products:", error.response);
//       return rejectWithValue(error.response?.data || "Failed to search products");
//     }
//   }
// );

// export const getAllProducts = createAsyncThunk<
//   PageResponse<Product>,
//   ProductFilters | undefined
// >("products/getAllProducts", async (params = {}, { getState, rejectWithValue }) => {
//   try {
//     // Get current filters from state
//     const state = getState() as RootState;
//     const currentFilters = state.products.filters;
    
//     // Merge current filters with new params (new params take precedence)
//     const mergedParams = { ...currentFilters, ...params };
    
//     // Ensure pageNumber is at least 0
//     if (mergedParams.pageNumber === undefined) {
//       mergedParams.pageNumber = 0;
//     }
    
//     const response = await api.get<PageResponse<Product>>(API_URL, { params: mergedParams });
//     return response.data;
//   } catch (error: any) {
//     console.error("Error fetching products:", error.response);
//     return rejectWithValue(error.response?.data || "Failed to fetch products");
//   }
// });

// // Create the slice
// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     // Add reducer to update filters
//     setFilters: (state, action: PayloadAction<ProductFilters>) => {
//       state.filters = { ...state.filters, ...action.payload };
//     },
    
//     // Add reducer to reset filters
//     resetFilters: (state) => {
//       state.filters = { ...initialState.filters };
//     },
    
//     // Add reducer to set current page
//     setCurrentPage: (state, action: PayloadAction<number>) => {
//       state.currentPage = action.payload;
//       state.filters.pageNumber = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle fetchProductById
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchProductById.fulfilled,
//         (state, action: PayloadAction<Product>) => {
//           state.product = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch product";
//       })
      
//       // Handle searchProduct
//       .addCase(searchProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         searchProduct.fulfilled,
//         (state, action: PayloadAction<Product[]>) => {
//           state.searchProduct = action.payload;
//           state.loading = false;
//         }
//       )
//       .addCase(searchProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to search products";
//       })
      
//       // Handle getAllProducts
//       .addCase(getAllProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         getAllProducts.fulfilled,
//         (state, action: PayloadAction<PageResponse<Product>>) => {
//           state.paginatedProducts = action.payload;
//           state.products = action.payload.content;
//           state.totalPages = action.payload.totalPages;
//           state.currentPage = action.payload.number;
//           state.loading = false;
//         }
//       )
//       .addCase(getAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch products";
//       });
//   },
// });

// // Export actions
// export const { setFilters, resetFilters, setCurrentPage } = productSlice.actions;

// export default productSlice.reducer;

// // Define selector functions
// export const selectProduct = (state: RootState) => state.products.product;
// export const selectProducts = (state: RootState) => state.products.products;
// export const selectPaginatedProducts = (state: RootState) => state.products.paginatedProducts;
// export const selectProductLoading = (state: RootState) => state.products.loading;
// export const selectProductError = (state: RootState) => state.products.error;
// export const selectTotalPages = (state: RootState) => state.products.totalPages;
// export const selectCurrentPage = (state: RootState) => state.products.currentPage;
// export const selectFilters = (state: RootState) => state.products.filters;
// export const selectSearchResults = (state: RootState) => state.products.searchProduct;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, Category } from "../../types/productTypes";
import { RootState } from "../store";
import { api } from "../../Config/Api";

// Define the base URL for the API
const API_URL = "/products";

// Define filter parameters type to match backend controller
export interface ProductFilters {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  sort?: string;
  stock?: string;
  pageNumber?: number;
}

// Define page response type to match Spring Data Page
export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Define the initial state type
interface ProductState {
  product: Product | null;
  products: Product[];
  paginatedProducts: PageResponse<Product> | null;
  totalPages: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  searchProduct: Product[];
  filters: ProductFilters;
}

// Define the initial state
const initialState: ProductState = {
  product: null,
  products: [],
  paginatedProducts: null,
  totalPages: 1,
  currentPage: 0,
  loading: false,
  error: null,
  searchProduct: [],
  filters: {
    category: undefined,
    brand: undefined,
    color: undefined,
    size: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minDiscount: undefined,
    sort: undefined,
    stock: undefined,
    pageNumber: 0,
  }
};

// Create async thunks for API calls
export const fetchProductById = createAsyncThunk<Product, number>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get<Product>(`${API_URL}/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching product details:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
    }
  }
);

export const searchProduct = createAsyncThunk<Product[], string>(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get<Product[]>(`${API_URL}/search`, {
        params: { query },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error searching products:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to search products");
    }
  }
);

export const getAllProducts = createAsyncThunk<
  PageResponse<Product>,
  ProductFilters | undefined
>("products/getAllProducts", async (params = {}, { getState, rejectWithValue }) => {
  try {
    // Get current filters from state
    const state = getState() as RootState;
    const currentFilters = state.products.filters;
    
    // Merge current filters with new params (new params take precedence)
    const mergedParams = { ...currentFilters, ...params };
    
    // Ensure pageNumber is at least 0
    if (mergedParams.pageNumber === undefined) {
      mergedParams.pageNumber = 0;
    }
    
    const response = await api.get<PageResponse<Product>>(API_URL, { params: mergedParams });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error.response);
    return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
  }
});

// Create the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Add reducer to update filters
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      // Reset pageNumber to 0 when filters change to start from first page
      state.filters = { ...state.filters, ...action.payload, pageNumber: 0 };
    },
    
    // Add reducer to reset filters
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    
    // Add reducer to set current page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.filters.pageNumber = action.payload;
    },
    
    // Add reducer to clear search results
    clearSearchResults: (state) => {
      state.searchProduct = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Failed to fetch product";
      })
      
      // Handle searchProduct
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchProduct.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.searchProduct = action.payload;
          state.loading = false;
        }
      )
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Failed to search products";
      })
      
      // Handle getAllProducts
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<PageResponse<Product>>) => {
          state.paginatedProducts = action.payload;
          state.products = action.payload.content;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.number;
          state.loading = false;
        }
      )
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Failed to fetch products";
      });
  },
});

// Export actions
export const { setFilters, resetFilters, setCurrentPage, clearSearchResults } = productSlice.actions;

export default productSlice.reducer;

// Define selector functions
export const selectProduct = (state: RootState) => state.products.product;
export const selectProducts = (state: RootState) => state.products.products;
export const selectPaginatedProducts = (state: RootState) => state.products.paginatedProducts;
export const selectProductLoading = (state: RootState) => state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;
export const selectTotalPages = (state: RootState) => state.products.totalPages;
export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectFilters = (state: RootState) => state.products.filters;
export const selectSearchResults = (state: RootState) => state.products.searchProduct;