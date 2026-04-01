import React from 'react';
import Title from "@components/shared/Title"
import Line from '@assets/icons/registration/Line.svg'

import styles from './styles.module.scss'
import UserInput from "@components/shared/UserInput";
import Button from "@components/shared/Button";


const RegistrationPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title variant='primary'>POLYSTATS</Title>
                <Line style={{ marginRight: 4, justifySelf: 'center', alignSelf: 'center' }}/>
            </div>
            <div className={styles.inputGroup}>
                <UserInput
                    name="e-mail"
                    type="email"
                    placeholder="Введите e-mail"
                />
                <UserInput
                    name="password"
                    type="password"
                    placeholder="Придумайте пароль"
                />
                <UserInput
                    name="group-name"
                    type="text"
                    placeholder="Введите номер учебной группы"
                />
            </div>
            <Button label={"Продолжить"} onPress={() => {}}/>
            <Button label={"Уже есть аккаунт? Войти"} variant='transparent' onPress={() => {}}/>
        </div>
    );
};

export default RegistrationPage;