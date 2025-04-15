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
import { colors } from "../../../assets/data/Filter/color";
import { useSearchParams } from "react-router-dom";
import { price } from "../../../assets/data/Filter/price";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  getAllProducts,
  ProductFilters,
  resetFilters,
  setFilters,
} from "../../../redux/customer/productSlice";

const FilterSection = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandColorSection, setExpandColorSection] = useState(false);

  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || filters.color || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    searchParams.get("price") || filters.minPrice?.toString() || ""
  );

  // syncing local state with redux
  useEffect(() => {
    console.log(filters);
    setSelectedColor(filters.color || "");
    setSelectedPrice(filters.minPrice?.toString() || "");
  }, [filters]);

  const handleExpandColorSection = () => {
    setExpandColorSection(!expandColorSection);
  };

  const updateFilterParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(e);
    if (name === "color") setSelectedColor(value);
    if (name === "price") setSelectedPrice(value);

    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);

    // for redux
    let newFilter: ProductFilters = {};

    if (name === "color") {
      newFilter = { color: value || undefined };
    } else if (name === "price") {
      const priceObj = price.find((p) => p.value === value);
      console.log(priceObj);
      if (priceObj) {
        const [min, max] = priceObj.value.split("-").map(Number);
        // console.log("dfsfds", priceObj.value.split("-").map(Number));

        newFilter = {
          minPrice: min || 0,
          maxPrice: max || 9999999, // Assumed max price
        };
        console.log(newFilter);
      }
    }
    newFilter.pageNumber = 0;

    dispatch(setFilters(newFilter));
    dispatch(getAllProducts(newFilter));
  };

  const clearAllFilters = () => {
    setSelectedColor("");
    setSelectedPrice("");

    searchParams.delete("color");
    searchParams.delete("price");
    searchParams.delete("query");
    setSearchParams(searchParams);

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

      {/* Colors */}
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

      {/* Price filter */}
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
    </div>
  );
};

export default FilterSection;
