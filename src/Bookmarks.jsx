import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { removeBookmarkAction } from "./redux/BookmarkActions";
import toast from "react-hot-toast";
const Bookmarks = ({ bookmarks, removeBookmarkAction }) => {
 
  return (
    <div>
      <h2>Bookmarks</h2>
      <div>
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <p> {bookmark.content}</p>
            <p>{bookmark.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bookmarks: state.addBookmarksReducer.bookmarks,
});

const mapDispatchToProps = {
  removeBookmarkAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
