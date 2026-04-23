import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routeConfig } from './routeConfig';
import RequireAuth from './RequireAuth';
import Loader from '@components/shared/Loader';

const AppRouter = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                {Object.values(routeConfig).map(({ element, path, authRequired }) => {
                    const wrappedElement = authRequired ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        element
                    );
                    return <Route key={path} path={path} element={wrappedElement} />;
                })}
                <Route path={'/*'} element={<Navigate to={routeConfig.subjects.path} />} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
