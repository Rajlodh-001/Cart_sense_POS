import { combineReducers } from "@reduxjs/toolkit";

import cartSlice from "@/app/(dashboard)/pos/posSlice";
import authSlice from "@/app/auth/authSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

export default rootReducer;
