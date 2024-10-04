import React from 'react';
import moment from 'moment';

const TaskDetailsModal = ({ task, onClose })=> 
{
  

    
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Task Details</h2>
        <p><span className="font-semibold">Title:</span> {task.title}</p>
        <p><span className="font-semibold">Description:</span> {task.description}</p>
        <p><span className="font-semibold">Created at:</span> {moment(task.createdAt).format("DD/MM/YYYY, HH:mm:ss")}</p>
        <div className="text-right mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
