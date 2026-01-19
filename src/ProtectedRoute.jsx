import {useUser} from './query/auth/useUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '@components/Spinner';

function ProtectedRoute ({children}) {
    const navigate = useNavigate();

    // 1. Load the authenticated user
    const {isLoading, isAuthenticated} = useUser();

    // 2. If there is No Authenticated user, redirect to the /login
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate("/login");
        },
        [isAuthenticated, isLoading, navigate]
    );

    // 3. While loading, show a spinner
    if (isLoading) return <Spinner />

    // 4. If there Is a user, render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoute;