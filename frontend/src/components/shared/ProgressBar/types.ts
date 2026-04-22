import { CSSProperties } from 'react';

export interface ProgressBarProps {
    currentProgress: number;
    maxProgress: number;
    style?: CSSProperties;
}
