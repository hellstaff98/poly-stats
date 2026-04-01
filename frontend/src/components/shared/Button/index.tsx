import React, {FC} from 'react';
import {ButtonProps} from "./types";
import styles from './styles.module.scss'

const Button: FC<ButtonProps> = ({ label, disabled, onPress, style, variant = 'default' }) => {
    return (
        <button
            className={`${styles.buttonCustom} ${styles[variant]}`}
            disabled={disabled}
            title={label}
            onClick={onPress}
            style={style}
        >{label}</button>
    );
};

export default Button;