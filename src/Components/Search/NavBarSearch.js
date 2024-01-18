import React from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const handleClick = () => {
    const letters = /^[A-Za-z]+$/;
    if (title !== "" && letters.test(title)) {
      navigate(`/shop/${title}`);
    } else {
      setSearchError("Please enter product name to start searching");
    }
  };

  return (
    <div className="flex">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-4/5 sm:w-40 md:w-80 lg:w-4/6 xl:w-4/5 2xl:w-5/6">
        <input
          type="text"
          value={title}
          onChangeCapture={(event) => setTitle(event.target.value)}
          id="simple-search"
          className="bg-white italic  border-red-200 text-gray-900  focus:ring-red-300 focus:border-red-500 block w-full p-2.5"
          placeholder={
            searchError ? searchError : "Enter Products from here..."
          }
          required
        />
      </div>
      <button
        type="submit"
        onClick={handleClick}
        className="p-2.5 text-sm font-medium text-white bg-red-700 border-red-200 hover:bg-red-800  focus:outline-none  dark:bg-red-600 dark:hover:bg-red-700"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap=""
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default Search;
