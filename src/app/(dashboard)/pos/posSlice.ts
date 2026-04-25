import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Types
export interface CartItem {
  description: string;
  id: string | number;
  name: string;
  imgSrc: string;
  itemType: string;
  price: number;
  quantity: number;
  note: string;
  modifiers?: string[];
  availableModifiers?: string[];
}

export type OrderType = "dine-in" | "take-away" | "timed-order";

export interface OrderInfo {
  orderType: OrderType;
  tableId: string | null;
  capacity: number | null;
  customerName: string;
  coupon: string | null;
  discountAmount: number;
}

interface CartState {
  items: CartItem[];
  orderInfo: OrderInfo;
}

const initialState: CartState = {
  items: [],
  orderInfo: {
    orderType: "take-away",
    tableId: null,
    capacity: null,
    customerName: "",
    coupon: null,
    discountAmount: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          note: action.payload.note || "",
          modifiers: action.payload.modifiers || [],
          availableModifiers: action.payload.availableModifiers || [],
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string | number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    editItemQuantity: (
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setItemNote: (
      state,
      action: PayloadAction<{ id: string | number; note: string }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.note = action.payload.note;
      }
    },
    setItemModifiers: (
      state,
      action: PayloadAction<{ id: string | number; modifiers: string[] }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.modifiers = action.payload.modifiers;
      }
    },

    // ─── Order Info Actions ───
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.orderInfo.orderType = action.payload;
      // Clear table if not dine-in
      if (action.payload !== "dine-in") {
        state.orderInfo.tableId = null;
      }
    },
    setTableId: (state, action: PayloadAction<string | null>) => {
      state.orderInfo.tableId = action.payload;
    },
    setCustomerName: (state, action: PayloadAction<string>) => {
      state.orderInfo.customerName = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.orderInfo.customerName = "";
      state.orderInfo.coupon = null;
      state.orderInfo.discountAmount = 0;
    },
    setCoupon: (state, action: PayloadAction<string | null>) => {
      state.orderInfo.coupon = action.payload;
    },
    setDiscountAmount: (state, action: PayloadAction<number>) => {
      state.orderInfo.discountAmount = action.payload;
    },
    clearCoupon: (state) => {
      state.orderInfo.coupon = null;
      state.orderInfo.discountAmount = 0;
    },
  },
});

export const selectTotalQuantity = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0,
  );

export const cartHasItems = (state: RootState) => state.cart.items.length > 0;

export const selectTotalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + Number(item.price) * item.quantity,
    0,
  );

export const selectSingleItem =
  (itemId: string | number) => (state: RootState) =>
    state.cart.items.find((item) => item.id === itemId);

export const selectOrderInfo = (state: RootState) => state.cart.orderInfo;

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  editItemQuantity,
  setItemNote,
  setItemModifiers,
  setOrderType,
  setTableId,
  setCustomerName,
  clearCart,
  setCoupon,
  clearCoupon,
  setDiscountAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
