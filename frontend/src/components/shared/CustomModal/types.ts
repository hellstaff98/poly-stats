import { ReactNode } from 'react';

export interface CustomModalProps {
    isOpen: boolean;
    onCancel: () => void;
    children: ReactNode;
}
