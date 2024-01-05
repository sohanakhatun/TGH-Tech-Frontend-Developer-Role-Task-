import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  addBookmarkAction,
} from "./redux/BookmarkActions";
import Spinner from "./Spinner";
const Home = ({ addBookmarkAction }) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.quotable.io/random");

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setId(data._id);
    } catch (error) {
      toast.error(
        "Something went wrong in generating Quote,Please try again later!"
      );
    }
    setLoading(false);
  };

  const handleQueryClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.quotable.io/quotes?tags=${selectedTag}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setQuote(data.results[randomIndex].content);
      setAuthor(data.results[randomIndex].author);
      setId(data._id);
    } catch (error) {
      toast.error(
        "Something went wrong in generating Quote,Please try again later!"
      );
    }
    setLoading(false);
  };

  const bookmarkHandler = () => {
    const newBookmark = {
      id: id,
      content: quote,
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
        setTags(data);
      } catch (error) {
        toast.error("Error in fetching tags!");
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="flex flex-col">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-7">
          <div
            className={
              quote.length > 0
                ? "bg-[#D05252] w-fit rounded-[10px] p-4 justify-center items-center mx-auto text-center text-xl font-bold text-white"
                : "hidden"
            }
          >
            <h1>{quote}</h1>
            <div className="flex flex-row gap-3 items-baseline justify-around">
              {/* author */}
              <p className="mt-4">- {author}</p>
              {/* bookmark button */}
              <button onClick={bookmarkHandler} value={quote}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25 17.4375V2.25C2.25 1.65326 2.48705 1.08097 2.90901 0.65901C3.33097 0.237053 3.90326 0 4.5 0L13.5 0C14.0967 0 14.669 0.237053 15.091 0.65901C15.5129 1.08097 15.75 1.65326 15.75 2.25V17.4375C15.7501 17.5352 15.7247 17.6312 15.6764 17.7161C15.6281 17.801 15.5585 17.8718 15.4745 17.9217C15.3905 17.9715 15.2949 17.9986 15.1973 18.0003C15.0996 18.002 15.0032 17.9783 14.9175 17.9314L9 14.7026L3.0825 17.9314C2.99681 17.9783 2.90038 18.002 2.80272 18.0003C2.70505 17.9986 2.60951 17.9715 2.5255 17.9217C2.44149 17.8718 2.37191 17.801 2.3236 17.7161C2.2753 17.6312 2.24993 17.5352 2.25 17.4375ZM9.5625 5.0625C9.5625 4.91332 9.50324 4.77024 9.39775 4.66475C9.29226 4.55926 9.14918 4.5 9 4.5C8.85082 4.5 8.70774 4.55926 8.60225 4.66475C8.49676 4.77024 8.4375 4.91332 8.4375 5.0625V6.75H6.75C6.60082 6.75 6.45774 6.80926 6.35225 6.91475C6.24676 7.02024 6.1875 7.16332 6.1875 7.3125C6.1875 7.46168 6.24676 7.60476 6.35225 7.71025C6.45774 7.81574 6.60082 7.875 6.75 7.875H8.4375V9.5625C8.4375 9.71168 8.49676 9.85476 8.60225 9.96025C8.70774 10.0657 8.85082 10.125 9 10.125C9.14918 10.125 9.29226 10.0657 9.39775 9.96025C9.50324 9.85476 9.5625 9.71168 9.5625 9.5625V7.875H11.25C11.3992 7.875 11.5423 7.81574 11.6477 7.71025C11.7532 7.60476 11.8125 7.46168 11.8125 7.3125C11.8125 7.16332 11.7532 7.02024 11.6477 6.91475C11.5423 6.80926 11.3992 6.75 11.25 6.75H9.5625V5.0625Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tags input div */}
          <select
            className="bg-[#D9D9D9] rounded-[30px] w-32 p-2 mx-auto"
            id="tags"
            value={selectedTag}
            onChange={handleTagChange}
          >
            <option>Select Tag</option>
            {tags.map((tag) => (
              <option>{tag.name}</option>
            ))}
          </select>
          {/* next quote button */}
          <button
            className="bg-[#009C51] rounded-[30px] w-32 p-2 text-white font-Poppins mx-auto shadow-custom"
            onClick={selectedTag ? handleQueryClick : handleClick}
          >
            Next Quote
          </button>
        </div>
      )}
    </div>
  );
};

// connecting redux
const mapStateToProps = (state) => ({
  bookmarks: state.addBookmarksReducer.bookmarks,
});

const mapDispatchToProps = {
  addBookmarkAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
