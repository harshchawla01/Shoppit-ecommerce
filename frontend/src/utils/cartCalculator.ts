import { CartItem } from "../types/cartTypes";

export const sumCartItemMrpPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + (item.mrpPrice * item.quantity);
  }, 0);
};

export const sumCartItemSellingPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + (item.sellingPrice * item.quantity);
  }, 0);
};

export const countTotalItems = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

export const calculateDiscount = (mrpTotal: number, sellingTotal: number): number => {
  return Math.max(0, mrpTotal - sellingTotal);
};