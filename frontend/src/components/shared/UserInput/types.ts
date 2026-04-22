import { ChangeEvent, CSSProperties, HTMLInputTypeAttribute } from 'react';

export interface UserInputProps {
    value?: string;
    id?: string;
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    style?: CSSProperties;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min?: number;
}
