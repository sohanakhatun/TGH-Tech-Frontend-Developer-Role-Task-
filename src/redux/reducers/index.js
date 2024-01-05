import { combineReducers } from "redux";
import { addBookmarksReducer } from "./BookmarkReducers";

const rootReducer = combineReducers({
  addBookmarksReducer: addBookmarksReducer,
});
export default rootReducer;
