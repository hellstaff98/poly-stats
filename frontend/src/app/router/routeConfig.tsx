import { RouteProps } from "react-router-dom"
import {RegistrationPage} from "@pages/RegistrationPage"
import {LoginPage} from "@pages/LoginPage";
import {MainPage} from "@pages/MainPage";


export enum AppRoutes {
    REGISTRATION = 'registration',
    LOGIN = 'login',
    MAIN = 'main',
}

type CustomRouteProps = RouteProps & {
    authRequired: boolean,
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.REGISTRATION]: `/${AppRoutes.REGISTRATION}`,
    [AppRoutes.LOGIN]: `/${AppRoutes.LOGIN}`,
    [AppRoutes.MAIN]: '',
}

export const routeConfig: Record<AppRoutes, CustomRouteProps> = {
    [AppRoutes.REGISTRATION]: {
        path: RoutePath.registration,
        element: <RegistrationPage/>,
        authRequired: false,
    },
    [AppRoutes.LOGIN] : {
        path: RoutePath.login,
        element: <LoginPage/>,
        authRequired: false,
    },
    [AppRoutes.MAIN] : {
        path: RoutePath.main,
        element: <MainPage/>,
        authRequired: true,
    }
}