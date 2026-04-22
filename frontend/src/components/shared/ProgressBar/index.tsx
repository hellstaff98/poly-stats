import React, { FC } from 'react';
import { ProgressBarProps } from '@components/shared/ProgressBar/types';
import styles from './styles.module.scss';

const ProgressBar: FC<ProgressBarProps> = ({ currentProgress, maxProgress, style }) => {
    const completedPercent = (currentProgress / maxProgress) * 100;
    const isCompleted = currentProgress === maxProgress;
    return (
        <div className={`${styles.mainContainer} `} style={style}>
            <div className={styles.line}>
                <div className={styles.filledLine} style={{ width: `${completedPercent}%` }}></div>
            </div>
            <p
                className={`${styles.label}`}
                style={isCompleted ? { color: 'var(--accent-color)' } : {}}
            >
                {currentProgress} / {maxProgress}
            </p>
        </div>
    );
};

export default ProgressBar;
