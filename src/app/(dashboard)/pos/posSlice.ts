import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Types
export interface CartItem {
  id: string | number;
  name: string;
  imgSrc: string;
  itemType: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
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
        state.items.push({ ...action.payload, quantity: 1 });
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

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  editItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
