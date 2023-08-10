import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
    const { myUser } = useUserContext();
    // const { user } = useAuth0();

    // console.log('children: ', myUser);

    if (!myUser) {
        return <Navigate to='/' />;
    }
    return children;
};
export default PrivateRoute;
