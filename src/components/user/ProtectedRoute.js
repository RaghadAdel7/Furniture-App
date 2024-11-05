import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(prop) {
    const { isUserDataLoading, isAuthenticated, element, userData, adminRole} = prop;
    if (isUserDataLoading) {
        return <div>Loading..</div>;}
    if (adminRole){
        return isAuthenticated && userData.role === "Admin" ? ( 
            element
        ):(
        <Navigate to="/UserLogin"/>);
    }

 return isAuthenticated ? element:<Navigate to="/UserLogin"/>
}
