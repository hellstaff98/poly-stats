import { CSSProperties, FC, SVGProps } from 'react';

type ButtonVariants = 'default' | 'transparent';

export interface ButtonProps {
    label: string;
    disabled?: boolean;
    onPress: () => void;
    style?: CSSProperties;
    className?: string;
    variant?: ButtonVariants;
    isLoading?: boolean;
    icon?: FC<SVGProps<SVGElement>>;
}
