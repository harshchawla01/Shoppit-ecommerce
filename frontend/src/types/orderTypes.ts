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

  totalMrpPrice: number;
  totalSellingPrice: number;
  discount: number;
  
  numberOfItems: number;
  orderStatus: OrderStatus;
  orderDate: string;
  shippingDate: string;
  
  totalItem?: number;     // numberOfItems
  deliverDate?: string;   // shippingDate
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