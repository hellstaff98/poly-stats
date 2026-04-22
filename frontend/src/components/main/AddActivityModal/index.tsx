import React, { FC, useState } from 'react';
import { AddActivityModalProps } from '@components/main/AddActivityModal/types';
import styles from './styles.module.scss';
import Title from '@components/shared/Title';
import Button from '@components/shared/Button';
import CustomModal from '@components/shared/CustomModal';
import UserInput from '@components/shared/UserInput';

const AddActivityModal: FC<AddActivityModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    isLoading,
}) => {
    const [activityName, setActivityName] = useState<string>('');
    const [maxProgress, setMaxProgress] = useState<number>();
    return (
        <CustomModal onCancel={onCancel} isOpen={isOpen}>
            <div className={styles.mainContainer}>
                <div>
                    <Title style={{ fontSize: '1.4rem', margin: 0 }}>Добавить активность</Title>
                </div>
                <form className={styles.inputGroup}>
                    <UserInput
                        name={'activity-name'}
                        onChange={(e) => setActivityName(e.target.value)}
                        type={'text'}
                        className={styles.input}
                        placeholder={'Название (например, Лабораторные работы)'}
                    />
                    <UserInput
                        name={'max-progress'}
                        onChange={(e) => setMaxProgress(+e.target.value)}
                        type={'number'}
                        min={0}
                        className={styles.input}
                        placeholder={'Цель по количеству (например, 10)'}
                    />
                </form>
                <div className={styles.buttonContainer}>
                    <Button label={'Отмена'} onPress={onCancel} variant={'transparent'} />
                    <Button
                        style={{ borderColor: '#00FF73', fontSize: 15 }}
                        label={'Добавить'}
                        onPress={() => onConfirm(activityName, maxProgress)}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </CustomModal>
    );
};

export default AddActivityModal;
