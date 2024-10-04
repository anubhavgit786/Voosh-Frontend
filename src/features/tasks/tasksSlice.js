import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = "https://voosh-backend-anxu.onrender.com/api/v1";

// Initial state for tasks
const initialState = 
{
    tasks: 
    {
        todo: [],
        inProgress: [],
        done: [],
    },
    isLoading: false,
    error: null,
};

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (token, { rejectWithValue }) => 
{
  try 
  {
    const response = await fetch(`${baseURL}/tasks`, 
    { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json', "x-auth-token": token }
    });

    const data = await response.json();

    if (!response.ok) 
    {
      throw new Error(data.error);
    }

    
    return data.tasks;
  } 
  catch (error) 
  {
    return rejectWithValue(error.message);
  }
});

// Async thunk for adding a task
export const addTask = createAsyncThunk('tasks/addTask', async ([token, newTask], { rejectWithValue }) => 
{
  try 
  {
    
    const response = await fetch(`${baseURL}/tasks`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "x-auth-token": token },
      body: JSON.stringify(newTask),
    });

    



    const data = await response.json();

    

    if (!response.ok) 
    {
      throw new Error(data.error);
    }

    
    return data.task;

    

  } 
  catch (error) 
  {
    return rejectWithValue(error.message);
  }
});

// Async thunk for updating a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ([token, updatedTask], { rejectWithValue }) => 
{
  try 
  {
    const response = await fetch(`${baseURL}/tasks/${updatedTask._id}`, 
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', "x-auth-token": token },
      body: JSON.stringify(updatedTask),
    });

    const data = await response.json();

    if (!response.ok) 
    {
      throw new Error(data.error);
    }

    
    return data.updatedTask;
    
  } 
  catch (error) 
  {
    return rejectWithValue(error.message);
  }
});


// Async thunk for updating sttaus of a task
export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ([token, updatedTask, index], { rejectWithValue }) => 
  {
    try 
    {
      const response = await fetch(`${baseURL}/tasks/${updatedTask._id}`, 
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', "x-auth-token": token },
        body: JSON.stringify(updatedTask),
      });
  
      const data = await response.json();
  
      if (!response.ok) 
      {
        throw new Error(data.error);
      }

      data.index = index;
      
      return  data;
      
    } 
    catch (error) 
    {
      return rejectWithValue(error.message);
    }
  });


// Async thunk for deleting a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async ([token, taskId], { rejectWithValue }) => {
  try {
    const response = await fetch(`${baseURL}/tasks/${taskId}`, 
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', "x-auth-token": token },
    });

    
    const data = await response.json();

    if (!response.ok) 
    {
      throw new Error(data.error);
    }

    
    return data.taskId;

  } 
  catch (error) 
  {
    return rejectWithValue(error.message);
  }
});

// Create the taskSlice
const taskSlice = createSlice(
{
  name: 'tasks',
  initialState,
  reducers: 
  {
    clearError: (state) => 
    {
      state.error = null;
    },
  },
  extraReducers: (builder) => 
  {
    builder
      .addCase(fetchTasks.pending, (state) => 
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => 
      {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => 
      {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => 
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => 
      {
        state.isLoading = false;
        state.tasks.todo.push(action.payload); // Assuming the new task goes into "Todo"
      })
      .addCase(addTask.rejected, (state, action) => 
      {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => 
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => 
      {
        state.isLoading = false;
        const updatedTask = action.payload;
        
        // Find the category of the updated task and update the task in that category
        
        for (const category in state.tasks) {
          state.tasks[category] = state.tasks[category].map(task =>
            task._id === updatedTask._id ? updatedTask : task
          );
        }
        
      })
      .addCase(updateTask.rejected, (state, action) => 
      {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTaskStatus.pending, (state) => 
        {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(updateTaskStatus.fulfilled, (state, action) => 
        {
          state.isLoading = false;
          const { updatedTask, index } = action.payload;
        
          // Remove the task from its current category
          for (const category in state.tasks) {
            state.tasks[category] = state.tasks[category].filter(task => task._id !== updatedTask._id);
          }
        
          // Insert the task at the specified index in the new status category
          // Insert at the index in the new category
          const category = updatedTask.status;

          state.tasks[category] = [...state.tasks[category].slice(0, index), updatedTask, ...state.tasks[category].slice(index)];
          
        })
        .addCase(updateTaskStatus.rejected, (state, action) => 
        {
          state.isLoading = false;
          state.error = action.payload;
        })
      .addCase(deleteTask.pending, (state) => 
      {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const taskId = action.payload;
        for (const category in state.tasks) {
          state.tasks[category] = state.tasks[category].filter(task => task._id !== taskId);
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
