import React, { useState } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    // Call onSave function and pass updated task details
    onSave({ ...task, title, description });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        {/* Title */}
        <label className="block font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="border w-full p-2 mt-2 mb-4 rounded outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label className="block font-medium text-gray-700">Description</label>
        <textarea
          className="border w-full p-2 mt-2 mb-4 rounded h-24 resize-none  outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Save and Cancel buttons */}
        <div className="flex justify-end space-x-4">
          <button type='submit'
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button type='button'
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default EditTaskModal;

