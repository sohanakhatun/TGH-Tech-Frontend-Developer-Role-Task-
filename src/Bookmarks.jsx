import React from "react";
import { connect } from "react-redux";
import { addBookmarkAction } from "./redux/BookmarkActions";
const Bookmarks = ({ bookmarks}) => {
  return (
    <div>
      <h2 className="text-white font-Poppins font-semibold text-center mb-4">
        Bookmarks
      </h2>
      {bookmarks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {bookmarks.map((bookmark) => (
            <div
              className={
                bookmarks.length > 0
                  ? "bg-[#D05252] w-fit rounded-[10px] p-4  justify-center items-center mx-auto text-center text-xl font-bold text-white"
                  : "hidden"
              }
              key={bookmark.id}
            >
              <p> {bookmark.content}</p>
              <p className="text-center">- {bookmark.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-4xl text-white font-Poppins font-semibold mt-10">No Bookmarks Added Yet!</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  bookmarks: state.addBookmarksReducer.bookmarks,
});

const mapDispatchToProps = {
  addBookmarkAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);
