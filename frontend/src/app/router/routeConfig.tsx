import { RouteProps } from 'react-router-dom';
import { RegistrationPage } from '@pages/RegistrationPage';
import { LoginPage } from '@pages/LoginPage';
import { MainPage } from '@pages/MainPage';
import { SubjectDetailsPage } from '@pages/SubjectDetailsPage';

export enum AppRoutes {
  REGISTRATION = 'registration',
  LOGIN = 'login',
  SUBJECTS = 'subjects',
  SUBJECT_DETAILS = 'subject_details',
}

type CustomRouteProps = RouteProps & {
  authRequired: boolean;
};

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.REGISTRATION]: `/${AppRoutes.REGISTRATION}`,
  [AppRoutes.LOGIN]: `/${AppRoutes.LOGIN}`,
  [AppRoutes.SUBJECTS]: `/${AppRoutes.SUBJECTS}`,
  [AppRoutes.SUBJECT_DETAILS]: `/${AppRoutes.SUBJECTS}/:subjectId`,
};

export const routeConfig: Record<AppRoutes, CustomRouteProps> = {
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <RegistrationPage />,
    authRequired: false,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <LoginPage />,
    authRequired: false,
  },
  [AppRoutes.SUBJECTS]: {
    path: RoutePath.subjects,
    element: <MainPage />,
    authRequired: true,
  },
  [AppRoutes.SUBJECT_DETAILS]: {
    path: RoutePath.subject_details,
    element: <SubjectDetailsPage />,
    authRequired: true,
  },
};
