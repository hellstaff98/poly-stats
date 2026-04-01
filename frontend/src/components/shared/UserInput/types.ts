import {CSSProperties, HTMLInputTypeAttribute} from "react";

export interface UserInputProps {
    id?: string;
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    style?: CSSProperties;
}