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
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  getAllProducts,
  setCurrentPage,
  setFilters,
  searchProduct,
} from "../../../redux/customer/productSlice";
import { useSearchParams } from "react-router-dom";
import { ProductFilters } from "../../../redux/customer/productSlice";

const Product = () => {
  const theme: Theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useAppDispatch();

  // Get the product state from Redux
  const {
    products,
    searchProduct: searchResults,
    paginatedProducts,
    totalPages,
    currentPage,
    loading,
    filters,
  } = useAppSelector((state) => state.products);

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      dispatch(searchProduct(searchQuery));
    } else {
      setIsSearching(false);
    }

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

    dispatch(setFilters(initialFilters));
    dispatch(getAllProducts(initialFilters));
  }, [dispatch, searchParams]);

  // Update searchedProducts whenever products or searchResults change
  useEffect(() => {
    if (searchQuery && searchResults && searchResults.length > 0) {
      setSearchedProducts(searchResults);
    } else {
      setSearchedProducts(products);
    }
  }, [products, searchResults, searchQuery]);

  // Handle sort change
  const handleSortChange = (event: any) => {
    const sortValue = event.target.value;

    if (sortValue) {
      searchParams.set("sort", sortValue);
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);

    dispatch(setFilters({ ...filters, sort: sortValue }));
    dispatch(getAllProducts({ sort: sortValue }));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value - 1)); // API uses 0-based indexing
    dispatch(getAllProducts({ pageNumber: value - 1 }));
  };

  // for mobile view
  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // Determine which products to display
  const productsToDisplay = searchQuery ? searchedProducts : products;

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : searchParams.get("category") || "All Products"}
        </h1>
      </div>
      <div className="lg:flex">
        {isLarge ? (
          <section className="filter-section w-[20%]">
            <FilterSection />
          </section>
        ) : (
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
          {loading && (
            <div className="flex justify-center py-10">
              <p>Loading products...</p>
            </div>
          )}
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 justify-center">
            {productsToDisplay && productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : !loading ? (
              <div className="col-span-full text-center py-10">
                <p>
                  {searchQuery
                    ? `No products found for "${searchQuery}"`
                    : "No products found. Try adjusting your filters."}
                </p>
              </div>
            ) : null}
          </section>
          {/* Pagination - only show for non-search results */}
          {!searchQuery && !loading && totalPages > 1 && (
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
