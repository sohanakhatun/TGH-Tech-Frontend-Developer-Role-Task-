import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  addBookmarkAction,
  removeBookmarkAction,
} from "./redux/BookmarkActions";
const Home = ({ bookmarks, addBookmarkAction }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const navigate = useNavigate();
  // console.log("book marks in reducer", bookmarks);
  const handleClick = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      // console.log(data);
      setQuote(data.content);
      setAuthor(data.author);
      setId(data._id);
    } catch (error) {
      toast.error(
        "Something went wrong in generating Quote,Please try again later!"
      );
    }
  };

  const handleQueryClick = async () => {
    try {
      const response = await fetch(
        `https://api.quotable.io/quotes?tags=${selectedTag}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      console.log(data);
      const randomIndex = Math.floor(Math.random() * data.results.length);
      console.log(randomIndex);
      
      setQuote(data.results[randomIndex].content);
      setAuthor(data.results[randomIndex].author);
      setId(data._id);
      console.log("quote set",quote);
    } catch (error) {
      toast.error(
        "Something went wrong in generating Quote,Please try again later!"
      );
    }
  };

  const bookmarkHandler = (event) => {
    const { value } = event.target;
    const newBookmark = {
      id: id,
      content: value,
      author: author,
    };
    console.log("newbookmark", newBookmark);
    addBookmarkAction(newBookmark);
    toast.success("Bookmark added");
    navigate("/bookmarks");
  };
  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://api.quotable.io/tags");
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        // console.log(data);
        setTags(data);
        console.log("tags", tags);
      } catch (error) {}
    };
    fetchTags();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-center text-4xl font-bold">{quote}</h1>
        {/* author */}
        <p>{author}</p>
        {/* bookmark button */}
        <button onClick={bookmarkHandler} value={quote}>
          bookmark
        </button>
      </div>

      {/* Tags input div */}
      <div>
        <label htmlFor="tags">Select a tag:</label>
        <select id="tags" value={selectedTag} onChange={handleTagChange}>
          <option value="">Select Tag</option>
          {tags.map((tag) => (
            <option>{tag.name}</option>
          ))}
        </select>
      </div>
      {/* next quote button */}
      <button onClick={selectedTag ? handleQueryClick : handleClick}>
        Next Quote
      </button>
    </div>
  );
};

// connecting redux
const mapStateToProps = (state) => ({
  bookmarks: state.addBookmarksReducer.bookmarks,
});

const mapDispatchToProps = {
  addBookmarkAction,
  removeBookmarkAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
