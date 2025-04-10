import React, { useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

const Product = () => {
  const theme: Theme = useTheme(); // type is important
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          Name of 3rd level category
        </h1>
      </div>
      <div className="lg:flex">
        <section className="filter-section hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}

              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>
            {/* Sorting feature box on the right:- */}
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low to High</MenuItem>
                <MenuItem value={"price_high"}>Price: High to Low</MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 justify-center">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
              <ProductCard />
            ))}
          </section>
          <div className="flex justify-center py-10">
            <Pagination
              // page={page}
              onChange={(e, value) => handlePageChange(value)}
              color="primary"
              // count={products?.totalPages}
              count={10}
              shape="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

// import React, { useEffect, useState } from "react";
// import FilterSection from "./FilterSection";
// import ProductCard from "./ProductCard";
// import {
//   Box,
//   Divider,
//   FormControl,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Pagination,
//   Select,
//   Theme,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
// } from "@mui/material";
// import { FilterAlt } from "@mui/icons-material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import {
//   getAllProducts,
//   setCurrentPage,
//   setFilters,
//   selectProducts,
//   selectTotalPages,
//   selectCurrentPage,
//   selectProductLoading,
//   selectFilters,
// } from "../../../Redux Toolkit/Customer/ProductSlice";
// import { useParams, useSearchParams } from "react-router-dom";

// const Product = () => {
//   const theme: Theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
//   const [showFilters, setShowFilters] = useState(false);
//   const dispatch = useAppDispatch();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { categoryId } = useParams();

//   // Get products data from Redux store
//   const products = useAppSelector(selectProducts);
//   const totalPages = useAppSelector(selectTotalPages);
//   const currentPage = useAppSelector(selectCurrentPage);
//   const loading = useAppSelector(selectProductLoading);
//   const filters = useAppSelector(selectFilters);

//   // Local sort state
//   const [sort, setSort] = useState(filters.sort || "");

//   // Load products on initial render and when filters change
//   useEffect(() => {
//     const initialFilters = {
//       category: categoryId,
//       pageNumber: 0,
//       ...filters,
//     };

//     dispatch(getAllProducts(initialFilters));
//   }, [dispatch, categoryId]);

//   const handleSortChange = (event: any) => {
//     const value = event.target.value;
//     setSort(value);

//     // Update URL params
//     if (value) {
//       searchParams.set("sort", value);
//     } else {
//       searchParams.delete("sort");
//     }
//     setSearchParams(searchParams);

//     // Update Redux filters and fetch new products
//     dispatch(setFilters({ sort: value, pageNumber: 0 }));
//     dispatch(getAllProducts({ sort: value, pageNumber: 0 }));
//   };

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     page: number
//   ) => {
//     // Pages in UI are 1-based, but API expects 0-based
//     const pageIndex = page - 1;

//     // Update URL params
//     searchParams.set("page", String(pageIndex));
//     setSearchParams(searchParams);

//     // Update Redux store and fetch new products
//     dispatch(setCurrentPage(pageIndex));
//     dispatch(getAllProducts({ pageNumber: pageIndex }));
//   };

//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   return (
//     <div className="-z-10 mt-10">
//       <div>
//         <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
//           {categoryId || "All Products"}
//         </h1>
//       </div>
//       <div className="lg:flex">
//         <section className="filter-section hidden lg:block w-[20%]">
//           <FilterSection />
//         </section>
//         <div className="w-full lg:w-[80%] space-y-5">
//           <div className="flex justify-between items-center px-9 h-[40px]">
//             <div className="relative w-[50%]">
//               {!isLarge && (
//                 <IconButton onClick={toggleFilters}>
//                   <FilterAlt />
//                 </IconButton>
//               )}

//               {!isLarge && showFilters && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     zIndex: 10,
//                     width: "300px",
//                     boxShadow: 3,
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <FilterSection />
//                 </Box>
//               )}
//             </div>
//             {/* Sorting feature box on the right:- */}
//             <FormControl size="small" sx={{ width: "200px" }}>
//               <InputLabel id="sort-select-label">Sort</InputLabel>
//               <Select
//                 labelId="sort-select-label"
//                 id="sort-select"
//                 value={sort}
//                 label="Sort"
//                 onChange={handleSortChange}
//               >
//                 <MenuItem value="">Default</MenuItem>
//                 <MenuItem value="price_low">Price: Low to High</MenuItem>
//                 <MenuItem value="price_high">Price: High to Low</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//           <Divider />

//           {loading ? (
//             <div className="flex justify-center py-10">
//               <CircularProgress />
//             </div>
//           ) : (
//             <>
//               <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 justify-center">
//                 {products && products.length > 0 ? (
//                   products.map((product: any) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))
//                 ) : (
//                   <div className="col-span-full text-center py-10">
//                     No products found matching your criteria
//                   </div>
//                 )}
//               </section>

//               {totalPages > 1 && (
//                 <div className="flex justify-center py-10">
//                   <Pagination
//                     page={currentPage + 1} // Convert 0-based to 1-based for UI
//                     onChange={handlePageChange}
//                     color="primary"
//                     count={totalPages}
//                     shape="rounded"
//                   />
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
