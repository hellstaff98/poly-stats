import React, { FC, useState } from 'react';
import UserInput from '@components/shared/UserInput';
import styles from './styles.module.scss';
import Button from '@components/shared/Button';
import { LoginFormProps } from './types';
import { Link } from 'react-router-dom';

const LoginForm: FC<LoginFormProps> = ({ onConfirm, registrationLink, isLoading }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className={styles.mainContainer}>
            <div className={styles.inputGroup}>
                <UserInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="e-mail"
                    type="email"
                    placeholder="Введите e-mail"
                />
                <UserInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    placeholder="Придумайте пароль"
                />
            </div>
            <div className={styles.buttonGroup}>
                <Button
                    label={'Продолжить'}
                    onPress={() => onConfirm(email, password)}
                    isLoading={isLoading}
                />
                <Link to={`/${registrationLink}`} className={styles.loginLink}>
                    Еще нет аккаунта? <span className={styles.underlinedText}>Регистрация </span>
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
