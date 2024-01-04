export const addBookmarkAction = (bookmarkData) => {
  return {
    type: "ADD_BOOKMARK",
    payload: bookmarkData,
  };
};

export const removeBookmarkAction = (bookmarkId) => {
  return {
    type: "REMOVE_BOOKMARK",
    payload: bookmarkId,
  };
};
