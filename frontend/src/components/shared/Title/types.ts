import { CSSProperties, ReactNode } from 'react';

type TitleVariant = 'default' | 'primary' | 'secondary' | 'covered';

export interface TitleProps {
    children: ReactNode;
    variant?: TitleVariant;
    style?: CSSProperties;
}
