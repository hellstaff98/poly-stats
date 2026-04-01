import React, {FC} from 'react';
import styles from './styles.module.scss';
import {UserInputProps} from "./types";

const UserInput: FC<UserInputProps> = ({ name, type, placeholder, style, id = name }) => {
    return (
        <input
           className={styles.field}
           style={style}
           type={type}
           placeholder={placeholder}
           id={id}
           name={name}
           required
           aria-autocomplete={"none"}
        />
    );
};

export default UserInput;