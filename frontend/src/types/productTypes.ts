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