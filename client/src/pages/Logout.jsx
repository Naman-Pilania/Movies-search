import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

function Logout() {
  const navigate = useNavigate();
    const {logoutUser} = useAuth();
    useEffect(()=>{
      logoutUser();
    },[logoutUser]);
    // navigate('/login')

  return (<Navigate to='/login'/>
  )
}

export default Logout