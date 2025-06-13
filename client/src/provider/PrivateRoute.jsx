import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-dots loading-xl"></span>;
  }

  if (!user || !user?.email) {
    return <Navigate to="/sign-in" state={location.pathname} />;
  }

  // return <Navigate state={location.pathname} to="/sign-in"></Navigate>;

  if (user && user?.email) {
    return children;
  }
};

export default PrivateRoute;
