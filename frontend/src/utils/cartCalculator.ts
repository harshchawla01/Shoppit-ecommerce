// import { CartItem } from "../types/cartTypes"

// export const sumCartItemSellingPrice=(items:CartItem[]):number=>{

   
//     return items.reduce((acc, item)=>{return item?.sellingPrice+acc},0)

// }

// export const sumCartItemMrpPrice=(items:CartItem[]):number=>{
    
//     return items.reduce((acc, item)=>{return item?.mrpPrice+acc},0)
// }

// utils/cartCalculator.ts

import { CartItem } from "../types/cartTypes";

/**
 * Calculate the sum of MRP prices for all cart items
 */
export const sumCartItemMrpPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + (item.mrpPrice * item.quantity);
  }, 0);
};

/**
 * Calculate the sum of selling prices for all cart items
 */
export const sumCartItemSellingPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + (item.sellingPrice * item.quantity);
  }, 0);
};

/**
 * Calculate the total number of items in the cart
 */
export const countTotalItems = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

/**
 * Calculate the discount amount (difference between MRP and selling price)
 */
export const calculateDiscount = (mrpTotal: number, sellingTotal: number): number => {
  return Math.max(0, mrpTotal - sellingTotal);
};