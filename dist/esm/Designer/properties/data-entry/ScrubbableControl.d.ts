import React, { CSSProperties } from 'react';
import { InputFormat, InputText } from '../typings';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export interface ScrubbableControlProps {
    icon?: string | React.ReactElement;
    autoSelect?: boolean;
    width?: number | 'adaptive';
    className?: string;
    disabled?: boolean;
    format?: InputFormat;
    placeholder?: string;
    inputType?: 'input' | 'textarea' | 'number';
    autoSize?: boolean | AutoSizeType;
    label?: string;
    value?: InputText;
    trigger?: 'change' | 'blur';
    onChange?: (value: InputText) => void;
    style?: CSSProperties;
}
declare const _default: React.MemoExoticComponent<(props: ScrubbableControlProps) => JSX.Element>;
export default _default;
