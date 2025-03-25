"use client"

import { Store } from "@reduxjs/toolkit";
import { Children } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
