import React, { FC } from 'react';
import styles from './styles.module.scss';
import { UserInputProps } from './types';

const UserInput: FC<UserInputProps> = ({
    value,
    name,
    type,
    placeholder,
    style,
    id = name,
    onChange,
    className = '',
    min,
}) => {
    return (
        <input
            value={value}
            className={`${styles.field} ${className}`.trim()}
            style={style}
            type={type}
            min={min}
            placeholder={placeholder}
            id={id}
            name={name}
            required
            aria-autocomplete={'none'}
            onChange={onChange}
        />
    );
};

export default UserInput;
