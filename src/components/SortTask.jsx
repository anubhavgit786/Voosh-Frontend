import React from "react";

const SortTask = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="sm:w-[13%] w-full">
      <label htmlFor="sortby" className="inline text-gray-700 font-bold w-1/3">
        Sort By:{" "}
      </label>
      <select className="border p-2 px-6 rounded outline-none"  value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SortTask;
