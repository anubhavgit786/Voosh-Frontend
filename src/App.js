import React from 'react';
import TaskBoard from './pages/TaskBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OAuthCallback from './pages/OAuthCallback';
import ProtectedRoute from './pages/ProtectedRoute';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';

const App = ()=> 
{
  return (
  <Router>
    <Routes>
      <Route path='/' element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/auth/google/callback' element={<OAuthCallback />} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  </Router>)  
}

export default App;

