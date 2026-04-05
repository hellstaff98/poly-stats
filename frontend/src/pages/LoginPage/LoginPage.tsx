import React from 'react';
import Title from "@components/shared/Title"
import Line from '@assets/icons/registration/Line.svg'

import styles from './styles.module.scss'
import {useAuthStore} from "../../stores/useAuthStore";
import {toast} from "react-toastify";
import LoginForm from "@components/auth/LoginForm";
import {AppRoutes} from "../../app/router/routeConfig";


const LoginPage = () => {

    const login = useAuthStore(state => state.login);
    const isLoading = useAuthStore(state => state.isLoading);

    const handleLoginConfirm = async (email: string, password: string) => {
        try {
            await login(email, password);
            toast.success("Вход прошел успешно");
        } catch (e) {
            if (e.response.status === 400) {
                toast.error("Неверные данные");
            } else {
                toast.error("Ошибка при входе");
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title variant='primary'>POLYSTATS</Title>
                <Line style={{ marginRight: 4, justifySelf: 'center', alignSelf: 'center' }}/>
            </div>
            <LoginForm onConfirm={handleLoginConfirm} registrationLink={AppRoutes.REGISTRATION} isLoading={isLoading}/>
        </div>
    );
};

export default LoginPage;