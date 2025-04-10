import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import ShopByCategory from "./ShopByCategory/ShopByCategory";

const Home = () => {
  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative">
        <ElectricCategory />
        <CategoryGrid />
        <div className="mt-17">
          <h1 className="flex items-center justify-center text-lg lg:text-4xl mb-5 lg:mb-10 font-bold">
            SHOP BY CATEGORY
          </h1>
          <ShopByCategory />
        </div>
      </div>
    </>
  );
};

export default Home;
