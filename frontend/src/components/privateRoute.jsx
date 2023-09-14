import { Navigate, Outlet } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";


import React from 'react';

const privateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default privateRoute;
