import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, loginSuccess } from '../features/users/usersSlice';

const LoginForm = () => 
{
    const baseURL = "https://voosh-backend-anxu.onrender.com/api/v1";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        const credentials = { email, password };
        await dispatch(loginUser(credentials));
        setEmail("");
        setPassword("");
        navigate("/");
    };

    const handleClick = async () =>
    {
     
        window.open(`${baseURL}/auth/google`,"_self");
    }

    return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md p-2 outline-none mb-2" required />
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md p-2 outline-none mb-2" required />
        <div className='flex flex-col justify-center items-center w-full'>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-2 w-full">Login</button>
            <p className="text-gray-500 mt-2">Don't have an account? <Link to="/signup" className='text-blue-500'>Signup</Link></p>
            <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-2" onClick={handleClick}>Login with Google</button>
        </div>
    </form>
    );
};

export default LoginForm;