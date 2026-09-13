import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { slug, name, price, image, color, quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { slug, quantity = 1, ...rest } = action.payload;
      const existing = state.items.find((item) => item.slug === slug);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ slug, quantity, ...rest });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.slug !== action.payload);
    },
    setQuantity: (state, action) => {
      const { slug, quantity } = action.payload;
      const item = state.items.find((i) => i.slug === slug);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    hydrateCart: (state, action) => {
      state.items = action.payload || [];
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
