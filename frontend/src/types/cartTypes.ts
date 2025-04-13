// import { Product } from "./productTypes";
// import { User } from "./userTypes";

// export interface CartItem {
//     id: number;
//     cart?: Cart;
//     product: Product;
//     size: string;
//     quantity: number;
//     mrpPrice: number;
//     sellingPrice: number;
//     userId: number;
// }


// export interface Cart {
//     id: number;
//     user: User;
//     cartItems: CartItem[];
//     totalSellingPrice: number;
//     totalItem: number;
//     totalMrpPrice: number;
//     discount: number;
//     couponCode: string | null;
//   }

// types/cartTypes.ts
import { Product } from "./productTypes";
import { User } from "./userTypes";

export interface CartItem {
    id: number;
    cart?: Cart;
    product: Product;
    size: string;  // small medium large
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
}

export interface Cart {
    id: number;
    user: User;
    cartItems: CartItem[];
    totalSellingPrice: number;
    totalMrpPrice: number;
    discount: number;
    numberOfItems: number;  // Added to match backend
}