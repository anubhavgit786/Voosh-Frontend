import React from 'react';

const Error = ({ message, onClose }) => {
  const errorMessages = message.split(',').filter((msg) => msg.trim() !== ''); // Split and filter empty strings

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>

        {/* Render error messages */}
        <div className="text-gray-700 mb-4">
          {errorMessages.length > 0 ? (
            errorMessages.map((msg, index) => (
              <p key={index} className="mb-2">
               {msg.trim()}
              </p>
            ))
          ) : (
            <p>{message.trim()}</p>
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
