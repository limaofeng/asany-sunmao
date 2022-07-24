import React, { CSSProperties } from 'react';
export interface OptionButtonProps {
    onChange?: (value: boolean) => void;
    value?: boolean;
    icon: string;
    disabled?: boolean;
    className?: string;
    tooltip?: string;
    style?: CSSProperties;
    classString?: string;
}
declare const _default: React.MemoExoticComponent<(props: OptionButtonProps) => JSX.Element>;
export default _default;
