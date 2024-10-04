import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../features/users/usersSlice';


const SignupForm = () => 
{
    const [firstname, setFirstName]  = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e) => 
    {
        e.preventDefault();
        const userData = { firstname, lastname, email, password, confirmPassword };
        await dispatch(signupUser(userData));
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
    };

    const handleClick = async()=>
    {
        const userData = { firstname, lastname, email, password, confirmPassword };
        await dispatch(signupUser(userData));
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <input type="text" placeholder='First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} className="w-full border rounded-md p-2 outline-none mb-2" required />
            <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} className="w-full border rounded-md p-2 outline-none mb-2" required />          
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md p-2 outline-none mb-2" required />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-md p-2 outline-none mb-2" required />
            <input type="password" value={confirmPassword} placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border rounded-md p-2 outline-none" required />
            <div className='flex flex-col justify-center items-center w-full'>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-2 w-full">Signup</button>
                <p className="text-gray-500 mt-2">Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
                <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 mt-2" onClick={handleClick} >Signup with Google</button>
            </div>
        </form>
    );
};

export default SignupForm;