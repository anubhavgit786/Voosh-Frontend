import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../features/users/usersSlice";

const Header = () => 
{
    const dispatch = useDispatch();
    const { user } = useSelector((state)=> state.users);
    
    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between mt-0 mx-0 fixed top-0 left-0 right-0">
            <div className='cursor-pointer'>
                <i className="fa-solid fa-calendar"></i>
            </div>
            <h1 className="text-white font-bold">Welcome, {user.user.firstname} {user.user.lastname}!</h1>
            <nav className="flex space-x-4">
                <button type="button" className="bg-red-500 text-white font-bold py-2 px-4 rounded-md" onClick={()=> dispatch(logoutUser())} >Logout</button>
            </nav>
        </header>
    );
};

export default Header;