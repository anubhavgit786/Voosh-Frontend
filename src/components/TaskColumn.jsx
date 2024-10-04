import React from 'react';
import TaskCard from './TaskCard';
import DropArea from './DropArea';

const TaskColumn = ({ title, tasks, onDelete, onViewDetails, onEditTask, onDrop, status }) => 
{



  return (
    <div className="bg-white shadow-md rounded-lg">
      <h2 className="bg-blue-500 text-white p-2 text-center font-bold">{title}</h2>
      <div className="p-4">
      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks.map((task, index) => (
          
            <React.Fragment key={task._id}>
              <TaskCard  task={task} onDelete={onDelete} onViewDetails={onViewDetails} onEditTask={onEditTask} />
              <DropArea onDrop={() => onDrop(status, index+1)} />
            </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default TaskColumn;
