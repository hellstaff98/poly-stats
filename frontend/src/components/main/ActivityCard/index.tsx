import React, { FC } from 'react';
import { ActivityCardProps } from '@components/main/ActivityCard/types';
import styles from './styles.module.scss';
import Title from '@components/shared/Title';
import ProgressBar from '@components/shared/ProgressBar';

import PlusBordered from '@assets/icons/main/plus-bordered.svg';
import MinusBordered from '@assets/icons/main/minus-bordered.svg';
import Trash from '@assets/icons/main/trash.svg';

const ActivityCard: FC<ActivityCardProps> = ({
    activity,
    handleIncrement,
    handleDecrement,
    handleDelete,
}) => {
    const isCompleted = activity.current_progress === activity.max_progress;
    return (
        <div
            className={styles.mainContainer}
            style={isCompleted ? { borderColor: 'var(--accent-color)' } : {}}
        >
            <div className={styles.content}>
                <Title style={{ fontSize: 'var(--font-size-s)', textAlign: 'left' }}>
                    {activity.name}
                </Title>
                <ProgressBar
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                    currentProgress={activity.current_progress}
                    maxProgress={activity.max_progress}
                />
            </div>
            <div className={styles.actions}>
                <div className={styles.amountControls}>
                    <PlusBordered onClick={() => handleIncrement(activity.id)} />
                    <MinusBordered onClick={() => handleDecrement(activity.id)} />
                </div>
                <div className={styles.trash}>
                    <Trash onClick={() => handleDelete(activity.id)} />
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
