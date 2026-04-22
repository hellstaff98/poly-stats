import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Link, useParams } from 'react-router-dom';
import { Subject, SubjectID } from '@models/subjects/Subject';
import { toast } from 'react-toastify';
import { useSubjectsStore } from '../../stores/useSubjectsStore';
import PageWrapper from '@components/shared/PageWrapper';
import Title from '@components/shared/Title';
import ArrowBack from '@assets/icons/main/arrow-back.svg';
import ActivityCard from '@components/main/ActivityCard';
import useLongPress from '../../hooks/useLongPress';
import DeleteActivityModal from '@components/main/DeleteActivityModal';
import { ActivityID } from '@models/subjects/Activity';
import Button from '@components/shared/Button';
import PlusUnbordered from '@assets/icons/main/plus-unbordered.svg';
import AddActivityModal from '@components/main/AddActivityModal';
import Loader from '@components/shared/Loader';

const SubjectDetailsPage = () => {
    const params = useParams();
    const isLoading = useSubjectsStore((state) => state.isLoading);
    const currentSubject = useSubjectsStore((state) => state.currentSubject);
    const setCurrentSubject = useSubjectsStore((state) => state.setCurrentSubject);
    const handleIncrement = useSubjectsStore((state) => state.incrementActivityProgress);
    const handleDecrement = useSubjectsStore((state) => state.decrementActivityProgress);
    const deleteActivity = useSubjectsStore((state) => state.deleteActivity);
    const addActivity = useSubjectsStore((state) => state.createActivity);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [deletingId, setDeletingId] = useState<ActivityID>(null);
    const [deletingName, setDeletingName] = useState<string>('');

    let subjectId: SubjectID;

    if (params && params.subjectId && +params.subjectId) {
        subjectId = +params.subjectId;
    } else {
        toast.error('Некорректный ID дисциплины');
        return <div></div>;
    }

    const handleDelete = async () => {
        try {
            if (deletingId) {
                await deleteActivity(deletingId);
                setDeletingId(null);
            }
        } catch (error) {
            console.error(error);
            toast.error('Не удалось удалить активность');
        } finally {
            setIsDeleteModalOpen(false);
        }
    };

    const handleActivityAdd = async (name: string, maxProgress: number) => {
        try {
            if (name !== '' && maxProgress > 0) {
                await addActivity(currentSubject.id, name, maxProgress);
                setIsAddModalOpen(false);
            } else {
                toast.error('Введены некорректные данные');
            }
        } catch (error) {
            console.error(error);
            toast.error('Не удалось добавить активность');
        } finally {
        }
    };

    useEffect(() => {
        setCurrentSubject(subjectId);
    }, []);

    const longPress = useLongPress(() => setIsDeleteModalOpen(true), 500);

    const getDeletingActivityName = (subject: Subject, id: SubjectID): string => {
        let result: string = '';
        if (subject && id) {
            if (currentSubject.activities.find((value, index) => value.id === deletingId)) {
                result = currentSubject.activities.find(
                    (activity, index) => activity.id === deletingId,
                ).name;
                setDeletingName(result);
            } else {
                result = deletingName;
            }
        }
        return result;
    };
    useEffect(() => {
        getDeletingActivityName(currentSubject, deletingId);
    }, [currentSubject, deletingId]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PageWrapper>
            {currentSubject && (
                <div className={styles.mainContainer}>
                    <div className={styles.header}>
                        <Link to={'/subjects'}>
                            <ArrowBack
                                style={{
                                    minWidth: 27,
                                    position: 'absolute',
                                    left: 'var(--spacing-s)',
                                    marginRight: 'var(--spacing-s)',
                                }}
                            />
                        </Link>
                        <Title style={{ fontSize: '1.5rem' }}>{currentSubject.name}</Title>
                    </div>
                    <div className={styles.content}>
                        {currentSubject.activities && (
                            <div className={styles.activitiesList}>
                                {currentSubject.activities.map((activity, index) => (
                                    <button
                                        style={{ outline: 'none' }}
                                        key={activity.id}
                                        onMouseDown={(e) => {
                                            setDeletingId(activity.id);
                                            longPress.onMouseDown();
                                        }}
                                        onTouchStart={(e) => {
                                            setDeletingId(activity.id);
                                            longPress.onTouchStart();
                                        }}
                                        onMouseUp={longPress.onMouseUp}
                                        onMouseLeave={longPress.onMouseLeave}
                                        onTouchEnd={longPress.onTouchEnd}
                                    >
                                        <ActivityCard
                                            activity={activity}
                                            handleIncrement={handleIncrement}
                                            handleDecrement={handleDecrement}
                                            handleDelete={(activityId) => {
                                                setDeletingId(activityId);
                                                setIsDeleteModalOpen(true);
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                        {currentSubject.activities.length === 0 && (
                            <Title variant="covered">Ничего не добавлено</Title>
                        )}
                        <Button
                            label="Добавить активность"
                            onPress={() => setIsAddModalOpen(true)}
                            style={{ maxWidth: 350, fontSize: 16, fontWeight: 500 }}
                            icon={PlusUnbordered}
                        />
                    </div>
                </div>
            )}
            <DeleteActivityModal
                isOpen={isDeleteModalOpen}
                activityName={deletingName}
                onConfirm={handleDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
            <AddActivityModal
                isOpen={isAddModalOpen}
                onConfirm={handleActivityAdd}
                onCancel={() => setIsAddModalOpen(false)}
                isLoading={isLoading}
            />
        </PageWrapper>
    );
};

export default SubjectDetailsPage;
