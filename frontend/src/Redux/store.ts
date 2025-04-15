import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import ProductSlice from "./customer/productSlice";
import CartSlice from "./customer/cartSlice";
import AuthSlice from "./customer/authSlice";
import UserSlice from "./customer/userSlice";
import OrderSlice from "./customer/orderSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import WishlistSlice from "./customer/wishlistSlice";
import AdminSlice from "./admin/adminSlice";

const rootReducer = combineReducers({
  
  // customer
  auth: AuthSlice,
  user: UserSlice,
  products: ProductSlice,
  cart: CartSlice,
  orders: OrderSlice,
  wishlist: WishlistSlice,

  // seller
  sellers: sellerSlice,
  sellerProduct: sellerProductSlice,
  sellerOrder: sellerOrderSlice,

  // admin
  admin:AdminSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
