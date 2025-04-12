import React from "react";
import { menLevelThree } from "../../../assets/data/category/levelThree/menLevelThree";
import { menLevelTwo } from "../../../assets/data/category/levelTwo/menLevelTwo";
import { womenLevelThree } from "../../../assets/data/category/levelThree/womenLevelThree";
import { womenLevelTwo } from "../../../assets/data/category/levelTwo/womenLevelTwo";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { electronicsLevelTwo } from "../../../assets/data/category/levelTwo/electronicsLavelTwo";
import { furnitureLevelTwo } from "../../../assets/data/category/levelTwo/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../assets/data/category/levelThree/furnitureLevelThree";
import { electronicsLevelThree } from "../../../assets/data/category/levelThree/electronicsLevelThree";

const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({
  selectedCategory,
  // toggleDrawer,
  setShowSheet,
}: any) => {
  const navigate = useNavigate();

  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      // console.log("Category", parentCategoryId, child)
      return child.parentCategoryId == parentCategoryId;
    });
  };
  const handleCategoryClick = (category: string) => {
    // if (toggleDrawer) {
    //   toggleDrawer(false)();
    // }
    if (setShowSheet) {
      setShowSheet(false);
    }

    navigate("/products/" + category);
  };
  return (
    <Box className="bg-white shadow-lg  lg:h-[500px] overflow-y-auto">
      <div className=" flex text-sm flex-wrap">
        {categoryTwo[selectedCategory]?.map((item: any, index) => (
          <div
            key={item.name}
            className={`p-8 lg:w-[20%] ${
              index % 2 == 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <p className="text-[#00927c] mb-5 font-semibold">{item.name}</p>

            <ul className="space-y-3">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId // outside the scope of the map below, so the above item is referred that means the parent category id
              )?.map((item: any) => (
                <div key={item.name}>
                  <li
                    onClick={() => handleCategoryClick(item.categoryId)}
                    className="hover:text-[#00927c] cursor-pointer"
                  >
                    {item.name}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
