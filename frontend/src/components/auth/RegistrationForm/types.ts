import {AppRoutes} from "../../../app/router/routeConfig";

export interface RegistrationFormProps {
    onConfirm: (email: string, password: string, group_name:string) => void;
    loginLink: AppRoutes;
    isLoading?: boolean;
}