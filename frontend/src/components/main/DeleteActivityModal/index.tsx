import React, { FC } from 'react';
import { DeleteActivityModalProps } from '@components/main/DeleteActivityModal/types';
import styles from './styles.module.scss';
import Button from '@components/shared/Button';
import Title from '@components/shared/Title';
import CustomModal from '@components/shared/CustomModal';

const DeleteActivityModal: FC<DeleteActivityModalProps> = ({
    isOpen,
    activityName,
    onConfirm,
    onCancel,
}) => {
    return (
        <CustomModal onCancel={onCancel} isOpen={isOpen}>
            <div className={styles.mainContainer}>
                <div>
                    <Title style={{ fontSize: '1.4rem', margin: 0 }}>Удалить активность?</Title>
                    <p className={styles.description}>
                        Вы уверены, что хотите удалить <b>{activityName}</b>? Это действие нельзя
                        будет отменить.
                    </p>
                </div>

                <div className={styles.buttonContainer}>
                    <Button label={'Отмена'} onPress={onCancel} variant={'transparent'} />
                    <Button
                        style={{ borderColor: '#E04300', color: '#E04300' }}
                        label={'Удалить'}
                        onPress={onConfirm}
                    />
                </div>
            </div>
        </CustomModal>
    );
};

export default DeleteActivityModal;
