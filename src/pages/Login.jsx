import React from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../features/users/usersSlice'; 

const Login = () => 
{
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.users);
  const handleCloseError = ()=>
  {
    dispatch(clearError());
  }

  return (
    <div className="container max-w-full">
      <LoginHeader />
      <main className="mt-8">
        <h1 className="text-3xl text-blue-500 font-bold max-w-md mx-auto py-4">
          Login
        </h1>
        <div className="max-w-md mx-auto p-4 border-2 border-blue-500 rounded">
          <LoginForm />
        </div>
      </main>
      { isLoading && <Loader/> }
      { error && <Error message={error} onClose={handleCloseError} />}
    </div>
  );
};

export default Login;