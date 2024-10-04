import React from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import SignupHeader from "../components/SignupHeader";
import SignupForm from "../components/SignupForm";
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../features/users/usersSlice'; 

const Signup = () => 
{
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.users);
  const handleCloseError = ()=>
  {
    dispatch(clearError());
  }

  return (
    <div className="container max-w-full">
      <SignupHeader />
      <main className="mt-8">
        <h1 className="text-3xl text-blue-500 font-bold max-w-md mx-auto py-4">
          Signup
        </h1>
        <div className="max-w-md mx-auto p-4 border-2 border-blue-500 rounded">
          <SignupForm />
        </div>
      </main>
      { isLoading && <Loader/> }
      { error && <Error message={error} onClose={handleCloseError} />}
    </div>
  );
};

export default Signup;