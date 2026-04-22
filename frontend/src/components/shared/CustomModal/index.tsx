import React, { FC } from 'react';
import Modal from 'react-modal';
import { CustomModalProps } from './types';

const CustomModal: FC<CustomModalProps> = ({ isOpen, onCancel, children }) => {
    return (
        <Modal onRequestClose={onCancel} isOpen={isOpen} style={customStyles} closeTimeoutMS={100}>
            {children}
        </Modal>
    );
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#222222',
        border: 'none',
        color: 'white',
        borderRadius: 16,
        padding: '24px',
        minWidth: '320px',
        maxWidth: '400px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
    },
};

export default CustomModal;
