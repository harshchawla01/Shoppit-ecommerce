import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./Seller/sellerSlice";
import sellerProductSlice from "./Seller/sellerProductSlice";
import ProductSlice from "./Customer/ProductSlice";
import CartSlice from "./Customer/CartSlice";
import AuthSlice from "./Customer/AuthSlice";
import UserSlice from "./Customer/UserSlice";
import OrderSlice from "./Customer/OrderSlice";
import sellerOrderSlice from "./Seller/sellerOrderSlice";
import WishlistSlice from "./Customer/WishlistSlice";
import AdminSlice from "./Admin/AdminSlice";
// import { 
//   FLUSH, 
//   REHYDRATE, 
//   PAUSE, 
//   PERSIST, 
//   PURGE, 
//   REGISTER 
// } from 'redux-persist';

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
