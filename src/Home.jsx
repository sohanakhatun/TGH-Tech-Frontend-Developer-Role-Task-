import React, { useState } from "react";
import {toast} from 'react-hot-toast';
const Home = () => {
  const [quote, setQuote] = useState("");
  const [author,setAuthor]=useState("");
  
  const handleClick = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const data = await response.json();
      console.log(data);
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
        toast.error("Something went wrong in generating Quote,Please try again later!");
    }
  };

  const bookmarkHandler = () =>{

  }
  return (
    <div>
      <div>
        <h1 className="text-center text-4xl font-bold">{quote}</h1>
        {/* author */}
        <p>{author}</p>
        {/* bookmark button */}
        <button onClick={bookmarkHandler}>bookmark</button>
      </div>

      {/* Tags input div */}
      <div>
        <select>
          <option value="" selected disabled hidden>
            Select a tag
          </option>
        </select>
      </div>
      {/* next quote button */}
      <button onClick={handleClick}>Next Quote</button>
    </div>
  );
};

export default Home;
