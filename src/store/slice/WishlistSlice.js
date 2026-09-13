import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { slug, name, price, image, color }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const { slug } = action.payload;
      const exists = state.items.some((item) => item.slug === slug);
      if (exists) {
        state.items = state.items.filter((item) => item.slug !== slug);
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.slug !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
