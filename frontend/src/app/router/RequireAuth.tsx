import React, { ReactNode } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { AppRoutes } from './routeConfig';
import { Navigate } from 'react-router-dom';
import Loader from '@components/shared/Loader';

const RequireAuth = ({ children }: { children: ReactNode }) => {
    const isAuth = useAuthStore((state) => state.isAuth);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading) {
        return <Loader />;
    }

    if (isAuth === false) {
        return <Navigate to={`/${AppRoutes.LOGIN}`} replace />;
    }
    return children;
};

export default RequireAuth;
