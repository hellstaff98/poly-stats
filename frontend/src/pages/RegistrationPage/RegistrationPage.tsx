import React from 'react';
import Title from '@components/shared/Title';
import Line from '@assets/icons/registration/Line.svg';

import styles from './styles.module.scss';
import RegistrationForm from '@components/auth/RegistrationForm';
import { useAuthStore } from '../../stores/useAuthStore';
import { toast } from 'react-toastify';
import { AppRoutes } from '../../app/router/routeConfig';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@components/shared/PageWrapper';

const RegistrationPage = () => {
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const navigate = useNavigate();

  const handleRegistrationConfirm = async (email: string, password: string, group_name: string) => {
    try {
      await register(email, password, group_name);
      await login(email, password);
      navigate(`/`);
      toast.success('Регистрация прошла успешно');
    } catch (e) {
      toast.error('Ошибка при регистрации');
    }
  };

  return (
    <PageWrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title variant="primary">POLYSTATS</Title>
          <Line style={{ marginRight: 4, justifySelf: 'center', alignSelf: 'center' }} />
        </div>
        <RegistrationForm
          isLoading={isLoading}
          onConfirm={(email, password, group_name) =>
            handleRegistrationConfirm(email, password, group_name)
          }
          loginLink={AppRoutes.LOGIN}
        />
      </div>
    </PageWrapper>
  );
};

export default RegistrationPage;
