import { Seller } from "./sellerTypes";

export interface Category {
  id?: number;
  name: string;
  categoryId: string;
  parentCategory?: Category;
  level: number;
}

export interface Product {
  id?: number;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  color: string;
  images: string[];
  category?: Category;
  seller?: Seller;
  createdAt?: string;
  sizes: string;
}