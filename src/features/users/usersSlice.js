import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = "https://voosh-backend-anxu.onrender.com/api/v1";

const loadFromLocalStorage = () => 
{
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return { user, isAuthenticated };
};

const initialState = 
{
    ...loadFromLocalStorage(), 
    isLoading: false,
    error: null,
};

// Async thunk for user signup
export const signupUser = createAsyncThunk('users/signup', async (userData, { rejectWithValue }) => 
{
    try 
    {
        const response = await fetch(`${baseURL}/auth/signup`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });

        const data = await response.json();    

        if (!response.ok) 
        {
            let message = "";
            if(data.errors.length > 0)
            {
                
                data.errors.forEach(error=> message += "," + error.msg);     
            }
            else
            {
                message += "User registeration Failed";
            }


            throw new Error(message);
        }

        return data;


    } 
    catch (error) 
    {
        return rejectWithValue(error.message || 'An unexpected error occurred.');
    }
});

// Async thunk for user login
export const loginUser = createAsyncThunk('users/login', async (credentials, { rejectWithValue }) => 
{
    try 
    {
        const response = await fetch(`${baseURL}/auth/login`, 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(credentials),
        });
        
           
        
        const data = await response.json();    
        
        if (!response.ok) 
        {
            let message = "";
            
            if(data.errors && data.errors.length > 0)
            {
                data.errors.forEach(error=> message += "," + error.msg);     
            }
            else
            {
                message = data.message;
            }
        
        
            throw new Error(message);
        }
        
        return data;    
    } 
    catch (error) 
    {
        return rejectWithValue(error.message || 'An unexpected error occurred.');
    }
});



// Async thunk for user logout
export const logoutUser = createAsyncThunk('users/logout', async () => 
{
    const response = await fetch(`${baseURL}/auth/logout`, 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) 
    {
        throw new Error('Logout failed!');
    }

    return await response.json();
});


// Async thunk for login success (fetch user info after authentication)
export const loginSuccess = createAsyncThunk('users/loginSuccess', async (_, { rejectWithValue }) => 
{
    try 
    {
        const response = await fetch(`${baseURL}/auth/login/success`, 
        {
            method: 'GET',
            credentials: 'include',  // Include credentials to handle sessions
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) 
        {
            let message = "";
            
            if(data.errors && data.errors.length > 0) 
            {
                data.errors.forEach(error => message += "," + error.msg);
            } 
            else 
            {
                message = data.message;
            }

            throw new Error(message);
        }

        return data;  // Return the user and token
    } 
    catch (error) 
    {
        return rejectWithValue(error.message || 'An unexpected error occurred.');
    }
});


// Slice definition
const usersSlice = createSlice(
{
    name: 'users',
    initialState,
    reducers: {
        clearError: (state) => 
        {
            state.error = null;
        }
    },
    extraReducers: (builder) => 
    {
        builder
            .addCase(signupUser.pending, (state) => 
            {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => 
            {
                state.isLoading = false;
            })
            .addCase(signupUser.rejected, (state, action) => 
            {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => 
            {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => 
            {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;

                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(loginUser.rejected, (state, action) => 
            {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginSuccess.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginSuccess.fulfilled, (state, action) => 
            {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                
                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(loginSuccess.rejected, (state, action) => 
            {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => 
            {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => 
            {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null; 

                localStorage.removeItem('user');
                localStorage.removeItem('isAuthenticated');
            })
            .addCase(logoutUser.rejected, (state, action) => 
            {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;
