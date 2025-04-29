import React, { useContext } from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { GlobalContext } from '../..'
import Dashboard from '../Dashboard/Dashboard';
// import { set } from 'date-fns';

const ProtectedRoute = () => {
  const {userInfo,loading,loggedIn}=useContext(GlobalContext);
    // console.log('userinfo:',userInfo)
    if(loading){
        return <p>Loading......</p>
    }

    return loggedIn  ? <Outlet/>: <>{alert("You are not logged In")} <Navigate to='/login'/></>
}

export default ProtectedRoute

