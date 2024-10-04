import React, { useEffect, useState } from 'react';
import TaskHeader from '../components/TaskHeader';
import TaskColumn from '../components/TaskColumn';
import AddTaskModal from "../components/AddTaskModel";
import EditTaskModal from '../components/EditTaskModel';
import SearchTask from '../components/SearchTask';
import SortTask from '../components/SortTask';
import Loader from '../components/Loader';
import Error from '../components/Error';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { useSelector, useDispatch } from 'react-redux';
import { useBoardStore } from '../features/board/board-store'; 


import { fetchTasks, addTask, updateTask, updateTaskStatus,  deleteTask, clearError } from '../features/tasks/tasksSlice';


function getTimeStamp(createdAt) 
{
  const timestamp = Date.parse(createdAt);
  return timestamp;
}


const TaskBoard = () => 
{
  const dispatch = useDispatch();
  
  const { token } = useSelector((state)=> state.users.user);

  const draggingTask = useBoardStore((state) => state.draggingTask);

  const { tasks, isLoading, error } = useSelector((state) => state.tasks);


  const handleCloseError = ()=>
  {
    dispatch(clearError());
  }

  const [selectedTask, setSelectedTask] = useState(null);
  // To toggle edit modal
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  

  const handleDelete = (taskId) => 
  {
    dispatch(deleteTask([token, taskId]));  
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsViewing(true); 
  };

  const handleCloseViewDetails = () => 
  {
    setSelectedTask(null);
    setIsViewing(false);    
  }

  const handleEditTask = (task) => 
  {
    setSelectedTask(task);
    setIsEditing(true); // Enable edit mode
  };

  const handleSaveTask = (updatedTask) => {
    // Update the task in the corresponding category
    dispatch(updateTask([token, updatedTask]));
    setIsEditing(false); // Close modal
  };

  const handleSaveTaskStatus = (updatedTask, index) => 
  {
    dispatch(updateTaskStatus([token, updatedTask, index]));
  }

  const handleCloseEditTask = () => 
  {
      setSelectedTask(null);
      setIsEditing(false);    
  }

  const handleAddTask = (newTask) => {
    dispatch(addTask([token, newTask]));
    setIsAdding(false);  // Close the Add Task modal after saving
  };

  const filterAndSortTasks = (categoryTasks) => 
  {
    if (!categoryTasks || !Array.isArray(categoryTasks)) {
      return [];
    }
    
    let filteredTasks = categoryTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    filteredTasks = filteredTasks.sort((a, b) => {
      if (sortOrder === "recent") {
        return getTimeStamp(b.createdAt) - getTimeStamp(a.createdAt);
      } else {
        return getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt);
      }
    });
    
    return filteredTasks;
  };

  const onDrop = (status, index) => 
  {
    if (!draggingTask) return;

    const updatedTask = {...draggingTask, status };

    handleSaveTaskStatus(updatedTask, index);

  }
  

  useEffect(()=>
  {
    dispatch(fetchTasks(token));
  }, [dispatch, token])

  return (
    <div className={`min-h-screen ${ isLoading || isAdding || selectedTask ? "bg-slate-500" : "bg-gray-100"}  relative`}>
      <TaskHeader />
      <div className={`p-4 mt-16 transition-all duration-300 ${ isLoading || isAdding || selectedTask ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <button onClick={() => setIsAdding(true)} className="bg-blue-600 text-white px-4 py-2 rounded sm:w-fit w-full">Add Task</button>

        {/* Search & Sort section */}
        <div className="flex sm:flex-row flex-col sm:justify-between justify-center sm:items-center items-center mt-2 bg-white shadow-lg shadow-gray-700/10 rounded p-2 gap-y-4 sm:gap-0">
        <SearchTask searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortTask sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
       
        {/* Task columns */}
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mt-4">
          {/* Todo */}
          <TaskColumn
            title="TODO"
            onDelete={(id) => handleDelete(id)}
            onViewDetails={handleViewDetails}
            onEditTask={handleEditTask}
            tasks={filterAndSortTasks(tasks.todo)}
            status={"todo"}
            onDrop={onDrop}
            key={"1"}
          />

          {/* In Progress */}
          <TaskColumn
            title="IN PROGRESS"
            onDelete={(id) => handleDelete(id)}
            onViewDetails={handleViewDetails}
            onEditTask={handleEditTask}
            tasks={filterAndSortTasks(tasks.inprogress)}
            status={"inprogress"}
            onDrop={onDrop}
            key={"2"}
          />

          {/* Done */}
          <TaskColumn
            title="DONE"
            onDelete={(id) => handleDelete(id)}
            onViewDetails={handleViewDetails}
            onEditTask={handleEditTask}
            tasks={filterAndSortTasks(tasks.done)}
            status={"done"}
            onDrop={onDrop}
            key={"3"}
          />
        </div>
     
      </div>

      {/* Task Details Modal */}
      {selectedTask && isViewing && (
        <TaskDetailsModal task={selectedTask} onClose={() => handleCloseViewDetails()} />
      )}

      {/* Edit Task Modal */}
      {selectedTask && isEditing && (
        <EditTaskModal
          task={selectedTask}
          onSave={handleSaveTask}
          onClose={() => handleCloseEditTask()}
        />
      )}

      {/* Add Task Modal */}
      {isAdding && (
        <AddTaskModal
          onSave={handleAddTask}
          onClose={() => setIsAdding(false)}
        />
      )}

      { isLoading && <Loader /> }
      { error && <Error message={error} onClose={handleCloseError} />}
    </div>
  );
};

export default TaskBoard;
