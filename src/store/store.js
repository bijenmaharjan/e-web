import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authorization-slice/auths";
import adminProductSlice from "./admin/admin";
import shopProductsSlice from "./shop/shop";
import cartSlice from "./shop/cart";
import addressSlice from "./shop/address";
import shoppingOrderSlice from "./shop/order";
import shoppingOrderAdminSlice from "./admin/orderAdmin";
import searchSlice from "./shop/search";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminproducts: adminProductSlice,
    shopproducts: shopProductsSlice,
    cart: cartSlice,
    address: addressSlice,
    order: shoppingOrderSlice,
    adminOrder: shoppingOrderAdminSlice,
    shopSearch: searchSlice,
  },
});

export default store;
