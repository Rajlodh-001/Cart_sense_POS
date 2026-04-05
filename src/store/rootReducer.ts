import { combineReducers } from "@reduxjs/toolkit";

import cartSlice from "@/app/(dashboard)/pos/posSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  user: userReducer,
});

export default rootReducer;
