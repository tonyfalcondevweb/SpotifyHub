import React from 'react'
import { useSpotifyAuth } from '../Contexts/SpotifyContext';
import Loading from '../Components/Commons/Loading';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {

    const { isAuthenticated, loading } = useSpotifyAuth();
    
    if (loading) return <Loading />;

    return isAuthenticated ? <Navigate to="/top10"/> :  <Outlet />;
}

export default PublicRoutes
