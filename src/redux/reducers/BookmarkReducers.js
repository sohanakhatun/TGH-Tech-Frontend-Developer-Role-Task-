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


