import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Title from '@components/shared/Title';
import SubjectCard from '@components/main/SubjectCard';
import { useSubjectsStore } from '../../stores/useSubjectsStore';
import PageWrapper from '@components/shared/PageWrapper';
import { SubjectID } from '@models/subjects/Subject';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigator = useNavigate();
  const fetchSubjectsList = useSubjectsStore((state) => state.fetchSubjectsList);
  const subjectsList = useSubjectsStore((state) => state.subjectsList);
  const isLoading = useSubjectsStore((state) => state.isLoading);

  useEffect(() => {
    fetchSubjectsList().then();
  }, []);

  const handleCardClick = (subjectId: SubjectID) => {
    navigator;
  };

  return (
    <PageWrapper>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <Title>Успеваемость</Title>
        </div>
        <div className={styles.subjectsList}>
          {subjectsList &&
            subjectsList.map((subject, key) => (
              <SubjectCard key={key} subject={subject} onClick={handleCardClick} />
            ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default MainPage;
