const initialState = {
  bookmarks: [],
};
// Reducer for adding bookmarks
export const addBookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };

    default:
      return state;
  }
};

export const removeBookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
