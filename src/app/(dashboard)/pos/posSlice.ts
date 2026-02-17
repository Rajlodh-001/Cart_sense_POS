import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
interface CartItem {
  id: number;
  name: string;
  imgSrc: string;
  itemType: string;
  price: number;
  quantity: number;
}

interface cartState {
  items: CartItem[];
}

const initialState: cartState = {
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
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      try {
        if (item) item.quantity += 1;
      } catch (err) {
        throw new Error("ERROR : ", { cause: err });
      }
    },

    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    editItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      // if (item && item.quantity > 1) {
      //   item.quantity -= 1;
      // }
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

// export const selectSingleItem = (state: RootState) =>
//   state.cart.items.find((item) => item.id === action.payload);;

export const selectSingleItem = (itemId: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === itemId);

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
