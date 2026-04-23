import React, { FC } from 'react';
import { PageWrapperProps } from '@components/shared/PageWrapper/types';
import styles from './styles.module.scss';

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return <div className={styles.pageWrapper}>{children}</div>;
};

export default PageWrapper;
