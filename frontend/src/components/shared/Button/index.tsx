import React, { FC } from 'react';
import { ButtonProps } from './types';
import styles from './styles.module.scss';
import { SpinnerCircular } from 'spinners-react';

const Button: FC<ButtonProps> = ({
    label,
    disabled,
    onPress,
    style,
    variant = 'default',
    isLoading,
    className = '',
    icon: Icon,
}) => {
    return (
        <button
            className={`${styles.buttonCustom} ${styles[variant]} ${className}`.trim()}
            disabled={disabled}
            title={label}
            onClick={onPress}
            style={style}
        >
            {isLoading ? (
                <SpinnerCircular size={'1.6rem'} />
            ) : (
                <div className={styles.content}>
                    {Icon && (
                        <div className={styles.iconWrapper}>
                            <Icon width={20} />
                        </div>
                    )}
                    <span className={styles.label}>{label}</span>
                </div>
            )}
        </button>
    );
};

export default Button;
