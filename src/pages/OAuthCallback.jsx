import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const OAuthCallback = () => 
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => 
    {
        const fetchUser = async () => 
        {
            try 
            {
                const response = await fetch('https://voosh-backend-anxu.onrender.com/api/v1/auth/login/success', 
                {
                    method: 'GET',
                    credentials: 'include', // To send cookies with request
                });

                const data = await response.json();

                

                if (data.user && data.token) 
                {
                
                    await dispatch(loginSuccess());
                    navigate("/"); // Redirect to homepage
                } 
                else 
                {
                    navigate("/login");
                }

            } 
            catch (error) 
            {
                console.error('Error fetching user:', error);
                navigate("/login");
            }
        };

        fetchUser();
    }, [dispatch, navigate]);

    return <Loader/>; 
};

export default OAuthCallback;
