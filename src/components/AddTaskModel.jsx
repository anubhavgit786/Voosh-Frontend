import React, { useState } from 'react';
import moment from 'moment';


const AddTaskModal = ({ onClose, onSave }) => 
{
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 


  const handleSubmit = () => 
  {
    if (!title || !description) 
    {
      return;
    }

    const task = { title, description, status: "todo" };
    onSave(task);
    onClose();

  };

  return (
    <form onSubmit={handleSubmit}>
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/3 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className="w-full border p-2 rounded  outline-none"
            placeholder="Task title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            className="w-full border p-2 rounded  outline-none"
            placeholder="Task description"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type='submit'
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default AddTaskModal;
