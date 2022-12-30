import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import {
    BeatLoader
} from 'react-spinners';
import { AuthContext } from '../../context/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <BeatLoader
            className='mx-auto mt-10'></BeatLoader>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;