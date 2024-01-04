import { configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "./bookmarkSlice";

export const store = configureStore({
  reducer: {
    bookmarks: bookmarkSlice,
  },
});
