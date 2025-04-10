import axios from "axios";

const api = "http://localhost:8081/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(api);
    console.log("response", response);
  } catch (error) {
    console.log(error);
  }
};

// const data = await response.json();
// console.log("Fetched products:", data);
// Dispatch action to store products in Redux
// dispatch(setProducts(data));
// Optionally, you can also set the total pages if your API returns it
// dispatch(setTotalPages(data.totalPages));
// dispatch(setCurrentPage(data.currentPage));
// dispatch(setProductLoading(false));
// Optionally, you can also set the filters if your API returns them
// dispatch(setFilters(data.filters));
