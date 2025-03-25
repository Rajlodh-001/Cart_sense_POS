import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  imgSrc: string;
  itemType: string;
  price: String;
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
        (item) => item.id === action.payload.id
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
        throw new Error("Failed in some way", { cause: err });
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
  },
});

export const { addToCart, removeFromCart,incrementQuantity,decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;
