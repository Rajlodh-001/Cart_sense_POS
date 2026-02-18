import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const cartSlicem = createSlice({
  name: 'cartm',
  initialState,
  reducers: {
    // ... (Your existing reducers can stay here) ...

    // --- NEW "M" FUNCTIONS (Separated Logic) ---

    // 1. Add To Cart M
    addToCartM: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      
      if (existing) {
        // If it exists, just increase quantity
        existing.qty += 1;
      } else {
        // If new, add to array with qty 1
        state.items.push({ ...action.payload, qty: 1 });
      }
    },

    // 2. Update Quantity M (+/-)
    updateQuantityM: (state, action: PayloadAction<{ id: number; change: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      
      if (item) {
        item.qty += action.payload.change;
        
        // If quantity drops to 0 or less, remove the item
        if (item.qty <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
    },

    // 3. Remove Item Completely M (Trash Can Icon)
    removeFromCartM: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // 4. Clear Cart M
    clearCartM: (state) => {
      state.items = [];
    }
  },
});

// Export the new "M" actions
export const { 
  addToCartM, 
  updateQuantityM, 
  removeFromCartM, 
  clearCartM 
} = cartSlicem.actions;

export default cartSlicem.reducer;