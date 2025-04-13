// import {
//   Button,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { teal } from "@mui/material/colors";
// import React, { useState } from "react";
// import { colors } from "../../../data/Filter/color";
// import { useSearchParams } from "react-router-dom";
// import { price } from "../../../data/Filter/price";
// import { discount } from "../../../data/Filter/discount";

// const FilterSection = () => {
//   // const clearAllFilters = () => {};

//   const [expandColorSection, setExpandColorSection] = useState(false);

//   const [searchParams, setSearchParams] = useSearchParams(); // If the main.tsx is not surrounded with the BrowserRouter tag, the website becos blank on including this statement

//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState("");
//   const [selectedDiscount, setSelectedDiscount] = useState("");

//   const handleExpandColorSection = () => {
//     setExpandColorSection(!expandColorSection);
//   };

//   // const updateFilterParams = (e: any) => {
//   //   const { value, name } = e.target;
//   //   if (value) {
//   //     searchParams.set(name, value);
//   //   } else {
//   //     searchParams.delete(name);
//   //   }
//   //   setSearchParams(searchParams);
//   // };

//   // const clearAllFilters = () => {
//   //   console.log("clearAllFilters", searchParams);
//   //   searchParams.forEach((value: any, key: any) => {
//   //     searchParams.delete(key);
//   //   });
//   //   setSearchParams(searchParams);
//   // };

//   // Update your updateFilterParams function
//   const updateFilterParams = (e: any) => {
//     const { value, name } = e.target;

//     // Update the appropriate state based on filter type
//     if (name === "color") setSelectedColor(value);
//     if (name === "price") setSelectedPrice(value);
//     if (name === "discount") setSelectedDiscount(value);

//     // Update URL params as before
//     if (value) {
//       searchParams.set(name, value);
//     } else {
//       searchParams.delete(name);
//     }
//     setSearchParams(searchParams);
//   };

//   const clearAllFilters = () => {
//     setSelectedColor("");
//     setSelectedPrice("");
//     setSelectedDiscount("");

//     // Clear the params only for the radio values
//     searchParams.delete("color");
//     searchParams.delete("price");
//     searchParams.delete("discount");

//     setSearchParams(searchParams);

//     // // Clear URL params as before
//     // In this approach, I have to click clear all button twice to clear the price from params. Don't know why
//     // searchParams.forEach((value, key) => {
//     //   searchParams.delete(key);
//     // });
//     // setSearchParams(searchParams);

//     // Another approach to clear all params
//     // setSearchParams(new URLSearchParams());
//   };

//   return (
//     <div className="-z-50 space-y-5 bg-white">
//       <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
//         <p className="text-lg font-semibold">Filters</p>
//         <Button
//           onClick={clearAllFilters}
//           size="small"
//           className="text-teal-600 cursor-pointer font-semibold"
//         >
//           clear all
//         </Button>
//       </div>
//       <Divider />

//       <section>
//         <FormControl sx={{ zIndex: 0 }}>
//           <FormLabel
//             sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               pb: "14px",
//               color: teal[600],
//             }}
//             className="text-2xl font-semibold"
//             id="color"
//           >
//             Color
//           </FormLabel>
//           <RadioGroup
//             value={selectedColor}
//             onChange={updateFilterParams}
//             aria-labelledby="color"
//             defaultValue=""
//             name="color"
//           >
//             {colors
//               .slice(0, expandColorSection ? colors.length : 5)
//               .map((item, index) => (
//                 <FormControlLabel
//                   sx={{ fontSize: "12px" }}
//                   key={item.name}
//                   value={item.name}
//                   control={<Radio size="small" />}
//                   label={
//                     <div className="flex items-center gap-3">
//                       <p>{item.name}</p>
//                       <span
//                         style={{ backgroundColor: item.hex }}
//                         className={` h-5 w-5 rounded-full ${
//                           item.name === "White" ? "border" : ""
//                         }`}
//                       ></span>
//                     </div>
//                   }
//                 />
//               ))}
//           </RadioGroup>
//         </FormControl>
//         <div>
//           <button
//             onClick={handleExpandColorSection}
//             className="text-teal-600 cursor-pointer hover:text-teal-900 flex items-center"
//           >
//             {expandColorSection ? "hide" : `+ ${colors.length - 5} more`}
//           </button>
//         </div>
//       </section>
//       <Divider />

//       <section>
//         <FormControl>
//           <FormLabel
//             sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               pb: "14px",
//               color: teal[600],
//             }}
//             className="text-2xl font-semibold"
//             id="price"
//           >
//             Price
//           </FormLabel>
//           <RadioGroup
//             value={selectedPrice}
//             name="price"
//             onChange={updateFilterParams}
//             aria-labelledby="price"
//             defaultValue=""
//           >
//             {price.map((item, index) => (
//               <FormControlLabel
//                 key={item.name}
//                 value={item.value}
//                 control={<Radio size="small" />}
//                 label={item.name}
//               />
//             ))}
//           </RadioGroup>
//         </FormControl>
//       </section>
//       <Divider />
//       <section>
//         <FormControl>
//           <FormLabel
//             sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               pb: "14px",
//               color: teal[600],
//             }}
//             className="text-2xl font-semibold"
//             id="brand"
//           >
//             Discount
//           </FormLabel>
//           <RadioGroup
//             value={selectedDiscount}
//             name="discount"
//             onChange={updateFilterParams}
//             aria-labelledby="brand"
//             defaultValue=""
//           >
//             {discount.map((item, index) => (
//               <FormControlLabel
//                 key={item.name}
//                 value={item.value}
//                 control={<Radio size="small" />}
//                 label={item.name}
//               />
//             ))}
//           </RadioGroup>
//         </FormControl>
//       </section>
//     </div>
//   );
// };

// export default FilterSection;

// // import {
// //   Button,
// //   Divider,
// //   FormControl,
// //   FormControlLabel,
// //   FormLabel,
// //   Radio,
// //   RadioGroup,
// // } from "@mui/material";
// // import { teal } from "@mui/material/colors";
// // import React, { useEffect, useState } from "react";
// // import { colors } from "../../../data/Filter/color";
// // import { useSearchParams } from "react-router-dom";
// // import { price } from "../../../data/Filter/price";
// // import { discount } from "../../../data/Filter/discount";
// // import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// // import {
// //   resetFilters,
// //   setFilters,
// //   selectFilters,
// // } from "../../../Redux Toolkit/Customer/ProductSlice";

// // const FilterSection = () => {
// //   const dispatch = useAppDispatch();
// //   const filters = useAppSelector(selectFilters);
// //   const [expandColorSection, setExpandColorSection] = useState(false);
// //   const [searchParams, setSearchParams] = useSearchParams();

// //   // Get filter values from Redux state or from URL params with fallbacks
// //   const [selectedColor, setSelectedColor] = useState(
// //     filters.color || searchParams.get("color") || ""
// //   );
// //   const [selectedPrice, setSelectedPrice] = useState(
// //     filters.minPrice && filters.maxPrice
// //       ? `${filters.minPrice}-${filters.maxPrice}`
// //       : searchParams.get("price") || ""
// //   );
// //   const [selectedDiscount, setSelectedDiscount] = useState(
// //     filters.minDiscount
// //       ? `${filters.minDiscount}`
// //       : searchParams.get("discount") || ""
// //   );

// //   // Synchronize URL parameters with Redux state on component mount
// //   useEffect(() => {
// //     const newFilters: any = {};

// //     if (searchParams.has("color")) {
// //       newFilters.color = searchParams.get("color");
// //     }

// //     if (searchParams.has("price")) {
// //       const priceRange = searchParams.get("price")?.split("-");
// //       if (priceRange && priceRange.length === 2) {
// //         newFilters.minPrice = parseInt(priceRange[0]);
// //         newFilters.maxPrice = parseInt(priceRange[1]);
// //       }
// //     }

// //     if (searchParams.has("discount")) {
// //       newFilters.minDiscount = parseInt(searchParams.get("discount") || "0");
// //     }

// //     if (Object.keys(newFilters).length > 0) {
// //       dispatch(setFilters(newFilters));
// //     }
// //   }, []);

// //   const handleExpandColorSection = () => {
// //     setExpandColorSection(!expandColorSection);
// //   };

// //   // Update filter params in both URL and Redux store
// //   const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { value, name } = e.target;

// //     // Update local state based on filter type
// //     if (name === "color") setSelectedColor(value);
// //     if (name === "price") setSelectedPrice(value);
// //     if (name === "discount") setSelectedDiscount(value);

// //     // Update URL params
// //     if (value) {
// //       searchParams.set(name, value);
// //     } else {
// //       searchParams.delete(name);
// //     }
// //     setSearchParams(searchParams);

// //     // Update Redux store
// //     const newFilters: any = {};

// //     if (name === "color") {
// //       newFilters.color = value;
// //     }

// //     if (name === "price" && value) {
// //       const priceRange = value.split("-");
// //       if (priceRange && priceRange.length === 2) {
// //         newFilters.minPrice = parseInt(priceRange[0]);
// //         newFilters.maxPrice = parseInt(priceRange[1]);
// //       }
// //     }

// //     if (name === "discount" && value) {
// //       newFilters.minDiscount = parseInt(value);
// //     }

// //     // Reset page number to 0 when changing filters
// //     newFilters.pageNumber = 0;

// //     dispatch(setFilters(newFilters));
// //   };

// //   const clearAllFilters = () => {
// //     // Reset local state
// //     setSelectedColor("");
// //     setSelectedPrice("");
// //     setSelectedDiscount("");

// //     // Clear URL params
// //     searchParams.delete("color");
// //     searchParams.delete("price");
// //     searchParams.delete("discount");
// //     setSearchParams(searchParams);

// //     // Reset Redux filters
// //     dispatch(resetFilters());
// //   };

// //   return (
// //     <div className="-z-50 space-y-5 bg-white">
// //       <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
// //         <p className="text-lg font-semibold">Filters</p>
// //         <Button
// //           onClick={clearAllFilters}
// //           size="small"
// //           className="text-teal-600 cursor-pointer font-semibold"
// //         >
// //           clear all
// //         </Button>
// //       </div>
// //       <Divider />

// //       <section>
// //         <FormControl sx={{ zIndex: 0 }}>
// //           <FormLabel
// //             sx={{
// //               fontSize: "16px",
// //               fontWeight: "bold",
// //               pb: "14px",
// //               color: teal[600],
// //             }}
// //             className="text-2xl font-semibold"
// //             id="color"
// //           >
// //             Color
// //           </FormLabel>
// //           <RadioGroup
// //             value={selectedColor}
// //             onChange={updateFilterParams}
// //             aria-labelledby="color"
// //             name="color"
// //           >
// //             {colors
// //               .slice(0, expandColorSection ? colors.length : 5)
// //               .map((item) => (
// //                 <FormControlLabel
// //                   sx={{ fontSize: "12px" }}
// //                   key={item.name}
// //                   value={item.name}
// //                   control={<Radio size="small" />}
// //                   label={
// //                     <div className="flex items-center gap-3">
// //                       <p>{item.name}</p>
// //                       <span
// //                         style={{ backgroundColor: item.hex }}
// //                         className={`h-5 w-5 rounded-full ${
// //                           item.name === "White" ? "border" : ""
// //                         }`}
// //                       ></span>
// //                     </div>
// //                   }
// //                 />
// //               ))}
// //           </RadioGroup>
// //         </FormControl>
// //         <div>
// //           <button
// //             onClick={handleExpandColorSection}
// //             className="text-teal-600 cursor-pointer hover:text-teal-900 flex items-center"
// //           >
// //             {expandColorSection ? "hide" : `+ ${colors.length - 5} more`}
// //           </button>
// //         </div>
// //       </section>
// //       <Divider />

// //       <section>
// //         <FormControl>
// //           <FormLabel
// //             sx={{
// //               fontSize: "16px",
// //               fontWeight: "bold",
// //               pb: "14px",
// //               color: teal[600],
// //             }}
// //             className="text-2xl font-semibold"
// //             id="price"
// //           >
// //             Price
// //           </FormLabel>
// //           <RadioGroup
// //             value={selectedPrice}
// //             name="price"
// //             onChange={updateFilterParams}
// //             aria-labelledby="price"
// //           >
// //             {price.map((item) => (
// //               <FormControlLabel
// //                 key={item.name}
// //                 value={item.value}
// //                 control={<Radio size="small" />}
// //                 label={item.name}
// //               />
// //             ))}
// //           </RadioGroup>
// //         </FormControl>
// //       </section>
// //       <Divider />

// //       <section>
// //         <FormControl>
// //           <FormLabel
// //             sx={{
// //               fontSize: "16px",
// //               fontWeight: "bold",
// //               pb: "14px",
// //               color: teal[600],
// //             }}
// //             className="text-2xl font-semibold"
// //             id="discount"
// //           >
// //             Discount
// //           </FormLabel>
// //           <RadioGroup
// //             value={selectedDiscount}
// //             name="discount"
// //             onChange={updateFilterParams}
// //             aria-labelledby="discount"
// //           >
// //             {discount.map((item) => (
// //               <FormControlLabel
// //                 key={item.name}
// //                 value={item.value}
// //                 control={<Radio size="small" />}
// //                 label={item.name}
// //               />
// //             ))}
// //           </RadioGroup>
// //         </FormControl>
// //       </section>
// //     </div>
// //   );
// // };

// // export default FilterSection;

import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { colors } from "../../../data/Filter/color";
import { useSearchParams } from "react-router-dom";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import {
  getAllProducts,
  resetFilters,
  setFilters,
} from "../../../Redux/Customer/ProductSlice";

const FilterSection = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandColorSection, setExpandColorSection] = useState(false);

  // Initialize local state with URL params or Redux state
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || filters.color || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get("price") || filters.minPrice?.toString() || ""
  );
  const [selectedDiscount, setSelectedDiscount] = useState(
    searchParams.get("discount") || filters.minDiscount?.toString() || ""
  );

  // Sync local state with Redux when filters change
  useEffect(() => {
    console.log(filters);
    setSelectedColor(filters.color || "");
    setSelectedPrice(filters.minPrice?.toString() || "");
    setSelectedDiscount(filters.minDiscount?.toString() || "");
  }, [filters]);

  const handleExpandColorSection = () => {
    setExpandColorSection(!expandColorSection);
  };

  // Update filter params and fetch products
  const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(e);
    // Update the appropriate state based on filter type
    if (name === "color") setSelectedColor(value);
    if (name === "price") setSelectedPrice(value);
    if (name === "discount") setSelectedDiscount(value);

    // Update URL params
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);

    // Create filter object for Redux
    let newFilter: any = {};

    if (name === "color") {
      newFilter = { color: value || undefined };
    } else if (name === "price") {
      // Parse price range
      const priceObj = price.find((p) => p.value === value);
      console.log(priceObj);
      if (priceObj) {
        const [min, max] = priceObj.value.split("-").map(Number);
        // console.log("dfsfds", priceObj.value.split("-").map(Number));

        newFilter = {
          minPrice: min || 0,
          maxPrice: max || 9999999,
        };
        console.log(newFilter);
      }
    } else if (name === "discount") {
      newFilter = { minDiscount: parseInt(value) || undefined };
    }

    // Reset to first page when filter changes
    newFilter.pageNumber = 0;

    // Update Redux filters and fetch products
    dispatch(setFilters(newFilter));
    dispatch(getAllProducts(newFilter));
  };

  // Clear all filters
  const clearAllFilters = () => {
    // Reset local state
    setSelectedColor("");
    setSelectedPrice("");
    setSelectedDiscount("");

    // Clear URL params
    searchParams.delete("color");
    searchParams.delete("price");
    searchParams.delete("discount");
    setSearchParams(searchParams);

    // Reset Redux filters and fetch products
    dispatch(resetFilters());
    dispatch(getAllProducts());
  };

  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilters}
          size="small"
          className="text-teal-600 cursor-pointer font-semibold"
        >
          clear all
        </Button>
      </div>
      <Divider />

      {/* Color filter section */}
      <section className="px-4">
        <FormControl sx={{ zIndex: 0 }}>
          <FormLabel
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              pb: "14px",
              color: teal[600],
            }}
            className="text-2xl font-semibold"
            id="color"
          >
            Color
          </FormLabel>
          <RadioGroup
            value={selectedColor}
            onChange={updateFilterParams}
            aria-labelledby="color"
            name="color"
          >
            {colors
              .slice(0, expandColorSection ? colors.length : 5)
              .map((item) => (
                <FormControlLabel
                  sx={{ fontSize: "12px" }}
                  key={item.name}
                  value={item.name}
                  control={<Radio size="small" />}
                  label={
                    <div className="flex items-center gap-3">
                      <p>{item.name}</p>
                      <span
                        style={{ backgroundColor: item.hex }}
                        className={`h-5 w-5 rounded-full ${
                          item.name === "White" ? "border" : ""
                        }`}
                      ></span>
                    </div>
                  }
                />
              ))}
          </RadioGroup>
        </FormControl>
        <div>
          <button
            onClick={handleExpandColorSection}
            className="text-teal-600 cursor-pointer hover:text-teal-900 flex items-center"
          >
            {expandColorSection ? "hide" : `+ ${colors.length - 5} more`}
          </button>
        </div>
      </section>
      <Divider />

      {/* Price filter section */}
      <section className="px-4">
        <FormControl>
          <FormLabel
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              pb: "14px",
              color: teal[600],
            }}
            className="text-2xl font-semibold"
            id="price"
          >
            Price
          </FormLabel>
          <RadioGroup
            value={selectedPrice}
            name="price"
            onChange={updateFilterParams}
            aria-labelledby="price"
          >
            {price.map((item) => (
              // console.log(item),
              <FormControlLabel
                key={item.name}
                value={item.value}
                control={<Radio size="small" />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </section>
      <Divider />

      {/* Discount filter section */}
      <section className="px-4">
        <FormControl>
          <FormLabel
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              pb: "14px",
              color: teal[600],
            }}
            className="text-2xl font-semibold"
            id="discount"
          >
            Discount
          </FormLabel>
          <RadioGroup
            value={selectedDiscount}
            name="discount"
            onChange={updateFilterParams}
            aria-labelledby="discount"
          >
            {discount.map((item) => (
              <FormControlLabel
                key={item.name}
                value={item.value}
                control={<Radio size="small" />}
                label={item.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </section>
    </div>
  );
};

export default FilterSection;
