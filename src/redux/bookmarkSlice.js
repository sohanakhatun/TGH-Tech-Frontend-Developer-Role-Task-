import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: [],
  reducers: {
    addBookmark(state, action) {
      state.push(action.payload);
    },
    removeBookmark(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
