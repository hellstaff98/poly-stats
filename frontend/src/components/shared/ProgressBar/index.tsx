import React, { FC } from 'react';
import { ProgressBarProps } from '@components/shared/ProgressBar/types';
import styles from './styles.module.scss';

const ProgressBar: FC<ProgressBarProps> = ({ currentProgress, maxProgress }) => {
  const completedPercent = (currentProgress / maxProgress) * 100;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.line}>
        <div className={styles.filledLine} style={{ width: `${completedPercent}%` }}></div>
      </div>
      <p className={styles.label}>
        {currentProgress} / {maxProgress}
      </p>
    </div>
  );
};

export default ProgressBar;
