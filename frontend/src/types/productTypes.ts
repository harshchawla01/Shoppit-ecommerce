// import { Seller } from "./sellerTypes";

// export interface Category {
//     id?: number; // Optional since id is auto-generated
//     name: string;
//     categoryId: string;
//     parentCategory?: Category; // Optional since a category might not have a parent
//     level: number;
//   }

// export interface Product {
//     id?: number; // Optional since id is auto-generated
//     title: string;
//     description: string;
//     mrpPrice: number;
//     sellingPrice: number;
//     discountPercent?: number;
//     quantity?: number;
//     color: string;
//     images: any[]; // Array of strings for image URLs
//     numRatings?: number;
//     category?: Category; // Optional since a product might not have a category assigned yet
//     seller?: Seller; // Placeholder for Seller interface (assuming it exists)
//     createdAt?: Date; // Assuming LocalDateTime can be mapped to Date
//     sizes: string; // Array of strings for product sizes
//     in_stock?: boolean; //
//   }

import { Seller } from "./sellerTypes";

export interface Category {
  id?: number; // Spring uses Long which typically maps to number in TS
  name: string;
  categoryId: string;
  parentCategory?: Category;
  level: number;
}

export interface Product {
  id?: number; // Optional since id is auto-generated
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  color: string;
  images: string[]; // This matches your @ElementCollection of Strings
  category?: Category;
  seller?: Seller;
  createdAt?: string; // LocalDateTime from Java typically comes as ISO string in JSON
  sizes: string;
}