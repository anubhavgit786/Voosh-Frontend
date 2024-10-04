import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between mt-0 mx-0">
            <div className='cursor-pointer'>
                <i className="fa-solid fa-calendar"></i>
            </div>
            <nav className="flex space-x-4">
                <Link to="/login" className="bg-white text-blue-500 font-bold py-2 px-4 rounded-md">Login</Link>
                <Link to="/signup" className="text-white font-bold py-2 px-4">Signup</Link>
            </nav>
        </header>
    );
};

export default Header;