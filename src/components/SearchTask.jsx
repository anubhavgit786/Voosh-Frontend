import React from "react";

const SearchTask = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="sm:w-1/3 w-full">
      <label htmlFor="search" className="inline text-gray-700 font-bold w-1/3">
        Search:{" "}
      </label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-2/3 outline-none"
      />
    </div>
  );
};

export default SearchTask;
