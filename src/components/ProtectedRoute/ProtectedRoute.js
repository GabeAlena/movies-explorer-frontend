import React from 'react';
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  //return (isLoggedIn ? children : <Navigate to="/" />)

  const location = useLocation().pathname;
  if (isLoggedIn && location.pathname === '/profile') {
    return <Navigate to="/profile" replace />;
  }

  if (isLoggedIn && location.pathname === '/movies') {
    return <Navigate to="/movies" replace />;
  }

  if (isLoggedIn && location.pathname === '/saved-movies') {
    return <Navigate to="/saved-movies" replace />;
  }

  return children;
}

export default ProtectedRoute;