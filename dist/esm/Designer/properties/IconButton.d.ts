import React, { CSSProperties } from 'react';
interface IconButtonProps {
    tooltip?: string;
    className?: string;
    icon: string;
    checked?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLSpanElement>>>;
export default _default;
