import React from 'react';
import Title from '@components/shared/Title';
import Line from '@assets/icons/registration/Line.svg';

import styles from './styles.module.scss';
import { useAuthStore } from '../../stores/useAuthStore';
import { toast } from 'react-toastify';
import LoginForm from '@components/auth/LoginForm';
import { AppRoutes } from '../../app/router/routeConfig';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@components/shared/PageWrapper';

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const navigate = useNavigate();

  const handleLoginConfirm = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate(`/`);
      toast.success('Вход прошел успешно');
    } catch (e) {
      if (e.response.status === 400) {
        toast.error('Неверные данные');
      } else {
        toast.error('Ошибка при входе');
      }
    }
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title variant="primary">POLYSTATS</Title>
          <Line style={{ marginRight: 4, justifySelf: 'center', alignSelf: 'center' }} />
        </div>
        <LoginForm
          onConfirm={handleLoginConfirm}
          registrationLink={AppRoutes.REGISTRATION}
          isLoading={isLoading}
        />
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
