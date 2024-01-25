import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoutes() {
    const { currentUser } = useAuth();
    return (
        <>
            {currentUser ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}
