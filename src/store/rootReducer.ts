import { combineReducers } from "@reduxjs/toolkit";

import cartSlice from "@/app/(dashboard)/pos/posSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
});

export default rootReducer;
