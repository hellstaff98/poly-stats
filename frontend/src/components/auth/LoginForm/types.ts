import {AppRoutes} from "../../../app/router/routeConfig";

export interface LoginFormProps {
    onConfirm: (email: string, password: string) => void;
    registrationLink: AppRoutes;
    isLoading?: boolean;
}