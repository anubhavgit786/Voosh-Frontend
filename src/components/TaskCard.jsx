import React from 'react';
import { useBoardStore } from "../features/board/board-store";
import moment from 'moment';


const TaskCard = ({ task, onDelete, onViewDetails, onEditTask }) => 
{
  const setDraggingTask = useBoardStore(state => state.setDraggingTask);

  return (
    <div className="bg-blue-100 p-4 rounded-lg mb-4 cursor-grab active:animate-pulse active:cursor-grabbing" draggable="true" onDragStart={()=> setDraggingTask(task)} onDragEnd={()=> setDraggingTask(null)}  style={{ viewTransitionName: `task-${task._id}` }}>
    <h3 className="font-bold">{task.title}</h3>
    <p>{task.description}</p>
    <p className="text-sm text-gray-500">Created at: {moment(task.createdAt).format("DD/MM/YYYY, HH:mm:ss")}</p>
    <div className="mt-2 flex flex-row-reverse gap-x-4">
      <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => onViewDetails(task)}>View Details</button>
      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => onEditTask(task)}>Edit</button>
      <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  </div>
  )
}

export default TaskCard
