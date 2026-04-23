import React, { FC } from 'react';
import styles from './styles.module.scss';
import Title from '@components/shared/Title';
import { SubjectCardProps } from '@components/main/SubjectCard/types';
import ArrowForward from '@assets/icons/main/arrow-forward.svg';
import { nameShortener } from '../../../utils/nameShortener';
import ProgressBar from '@components/shared/ProgressBar';
import { Link } from 'react-router-dom';
import { routeConfig } from '../../../app/router/routeConfig';

const SubjectCard: FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <Link to={`${routeConfig.subjects.path}/${subject.id}`} className={styles.mainContainer}>
      <div className={styles.header}>
        <Title variant="secondary" style={{ textAlign: 'left', maxWidth: '85%' }}>
          {nameShortener(subject.name)}
        </Title>
        <ArrowForward />
      </div>
      <div className={styles.content}>
        {subject.activities.length > 0 ? (
          subject.activities.map((activity, key) => {
            return (
              <div key={key} className={styles.activityLine}>
                <p className={styles.activityName}>{activity.name}</p>
                <ProgressBar
                  currentProgress={activity.current_progress}
                  maxProgress={activity.max_progress}
                />
              </div>
            );
          })
        ) : (
          <p className={styles.activityName} style={{ width: '100%' }}>
            Добавьте активности
          </p>
        )}
      </div>
    </Link>
  );
};

export default SubjectCard;
