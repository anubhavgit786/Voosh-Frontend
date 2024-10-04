import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Login from './Login';

import { logoutUser } from "../features/users/usersSlice";

const ProtectedRoute = ({ children }) => 
{ 
    const { isAuthenticated, user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => 
    {
        const checkAuthenticationAndTokenValidity = async () => 
        {
            try 
            {
                if (!isAuthenticated || !user?.token)  
                {
                    navigate("/login");
                    return;
                }
        
                const response = await fetch('https://voosh-backend-anxu.onrender.com/api/v1/auth/verify-token', 
                {
                    method: 'GET',
                    headers: { "x-auth-token": user?.token },
                });
        
                if (response.ok) 
                {
                    setIsLoading(false);
                } 
                else 
                {
                    dispatch(logoutUser()); 
                    navigate('/login');
                }
            } 
            catch (error) 
            {
                dispatch(logoutUser()); 
                navigate('/login');
            }
        };

        checkAuthenticationAndTokenValidity();
    }, [isAuthenticated, user?.token, dispatch, navigate]);

    if (isLoading) 
    {
        return <Loader />;
    }

    return isAuthenticated ? children : <Login />;
};

export default ProtectedRoute;
