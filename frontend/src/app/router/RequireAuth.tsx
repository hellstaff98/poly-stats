import React, {FC, ReactNode} from 'react';
import {SpinnerCircular} from "spinners-react";
import {useAuthStore} from "../../stores/useAuthStore";
import {AppRoutes} from "./routeConfig";
import {Navigate} from "react-router-dom";



const RequireAuth = ({children} : {children: ReactNode}) => {

    const isAuth = useAuthStore(state => state.isAuth);
    const isLoading = useAuthStore(state => state.isLoading);
    console.log("IS AUTH", isAuth, "IS LOADING", isLoading);

    if (isLoading) {
       return <SpinnerCircular/>;
    }

    if (isAuth === false) {
        return <Navigate to={`/${AppRoutes.LOGIN}`} replace/>
    }
    return children;
};

export default RequireAuth;