
// import { Product } from './productTypes';
// import { Address, User } from './userTypes';

// export interface OrderState {
//     orders: Order[];
//     orderItem:OrderItem | null;
//     currentOrder: Order | null;
//     paymentOrder: any | null;
//     loading: boolean;
//     error: string | null;
//     orderCanceled: boolean
// }

// export interface Order {
//     id: number;
//     orderId: string;
//     user: User;
//     sellerId: number;
//     orderItems: OrderItem[];
//     orderDate: string; 
//     shippingAddress: Address;
//     paymentDetails: any;
//     totalMrpPrice: number;
//     totalSellingPrice?: number; // Optional field
//     discount?: number; // Optional field
//     orderStatus: OrderStatus;
//     totalItem: number;
//     deliverDate:string;
// }

// export enum OrderStatus {
//     PENDING = 'PENDING',
//     SHIPPED = 'SHIPPED',
//     DELIVERED = 'DELIVERED',
//     CANCELLED = 'CANCELLED'
// }

// export interface OrderItem {
//     id: number;
//     order: Order;
//     product: Product;
//     size: string;
//     quantity: number;
//     mrpPrice: number;
//     sellingPrice: number; 
//     userId: number;
// }


// src/types/orderTypes.ts

// src/types/orderTypes.ts

import { Product } from './productTypes';
import { Address, User } from './userTypes';

export interface OrderState {
  orders: Order[];
  orderItem: OrderItem | null;
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  orderCanceled: boolean;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: number;
  orderId: string;
  user: User;
  sellerId: number;
  orderItems: OrderItem[];
  shippingAddress: Address;
  
  // Pricing fields
  totalMrpPrice: number;
  totalSellingPrice: number;
  discount: number;
  
  // Order metadata
  numberOfItems: number;  // Matching backend field name
  orderStatus: OrderStatus;
  orderDate: string;
  shippingDate: string;  // Matching backend field
  
  // For frontend display compatibility
  totalItem?: number;     // Alias for numberOfItems
  deliverDate?: string;   // Alias for shippingDate
}

export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  size: string;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
  userId: number;
}