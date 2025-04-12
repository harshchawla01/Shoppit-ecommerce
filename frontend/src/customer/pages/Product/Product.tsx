import React, { useEffect, useState } from "react";
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
  Drawer,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  getAllProducts,
  setCurrentPage,
  setFilters,
} from "../../../Redux/Customer/ProductSlice";
import { useSearchParams } from "react-router-dom";
import { ProductFilters } from "../../../Redux/Customer/ProductSlice";

const Product = () => {
  const theme: Theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  // Get the product state from Redux
  const {
    products,
    paginatedProducts,
    totalPages,
    currentPage,
    loading,
    filters,
  } = useAppSelector((state) => state.products);
  // console.log(products[0]);
  // const filteredproducts = products.slice(1, products.length - 1);
  const filteredproducts = products;
  // Initialize with URL params if present
  useEffect(() => {
    const initialFilters: ProductFilters = {
      category: searchParams.get("category") || undefined,
      color: searchParams.get("color") || undefined,
      size: searchParams.get("size") || undefined,
      minPrice: searchParams.get("minPrice")
        ? parseInt(searchParams.get("minPrice")!)
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? parseInt(searchParams.get("maxPrice")!)
        : undefined,
      minDiscount: searchParams.get("discount")
        ? parseInt(searchParams.get("discount")!)
        : undefined,
      sort: searchParams.get("sort") || undefined,
      pageNumber: 0,
    };

    // Set the initial filters in Redux
    dispatch(setFilters(initialFilters));

    // Fetch products based on these filters
    dispatch(getAllProducts(initialFilters));
  }, [dispatch]);

  // Handle sort change
  const handleSortChange = (event: any) => {
    const sortValue = event.target.value;

    // Update URL params
    if (sortValue) {
      searchParams.set("sort", sortValue);
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);

    // Update Redux filters and fetch products
    dispatch(setFilters({ ...filters, sort: sortValue }));
    dispatch(getAllProducts({ sort: sortValue }));
  };

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    // Update Redux page number and fetch products for that page
    dispatch(setCurrentPage(value - 1)); // API uses 0-based indexing
    dispatch(getAllProducts({ pageNumber: value - 1 }));
  };

  // Toggle filter drawer for mobile view
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {searchParams.get("category") || "All Products"}
        </h1>
      </div>
      <div className="lg:flex">
        {/* Filter section for large screens */}
        <section className="filter-section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        {/* Filter drawer for mobile/tablet */}
        {!isLarge && (
          <Drawer
            anchor="left"
            open={filterDrawerOpen}
            onClose={toggleFilterDrawer}
          >
            <Box sx={{ width: 280 }}>
              <FilterSection />
            </Box>
          </Drawer>
        )}

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative">
              {!isLarge && (
                <IconButton onClick={toggleFilterDrawer}>
                  <FilterAlt />
                </IconButton>
              )}
            </div>

            {/* Sorting dropdown */}
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={filters.sort || ""}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="price_low">Price: Low to High</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-10">
              <p>Loading products...</p>
            </div>
          )}

          {/* Products grid */}
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 justify-center">
            {filteredproducts && filteredproducts.length > 0 ? (
              filteredproducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : !loading ? (
              <div className="col-span-full text-center py-10">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            ) : null}
          </section>
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center py-10">
              <Pagination
                page={currentPage + 1} // API uses 0-based indexing, UI uses 1-based
                onChange={handlePageChange}
                color="primary"
                count={totalPages}
                shape="rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
