import React, {Suspense, useEffect} from 'react';
import {Route, Routes } from "react-router-dom";
import {routeConfig} from "./routeConfig";
import RequireAuth from "./RequireAuth";
import {useAuthStore} from "../../stores/useAuthStore";

const AppRouter = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path, authRequired}) => {
                    const wrappedElement = authRequired ? <RequireAuth>{element}</RequireAuth> : element;
                    return <Route
                        key={path}
                        path={path}
                        element={wrappedElement}
                    />
                })}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;