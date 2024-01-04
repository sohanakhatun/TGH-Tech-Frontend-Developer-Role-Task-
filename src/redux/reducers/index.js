import { combineReducers } from "redux";
import {
  addBookmarksReducer,
  removeBookmarksReducer,
} from "./BookmarkReducers";

const rootReducer = combineReducers({
  addBookmarksReducer: addBookmarksReducer,
  removeBookmarksReducer: removeBookmarksReducer,
});
export default rootReducer;
