import React from 'react';
import { ICustomizer, IField } from '../../sunmao';
interface DynaActionFormProps {
    customizer: ICustomizer;
    library?: string;
    layout?: 'Inline' | 'Stacked';
    onChange?(value: any): void;
    value?: any;
}
interface FormItemWrapperProps {
    component: React.ComponentType<any>;
    field: IField;
    defaultValue?: any;
    size?: string;
}
export declare function FormItemWrapper({ component: Item, field, defaultValue, ...props }: FormItemWrapperProps): JSX.Element;
export declare const visibleFilter: (props: any) => ({ visible }: any) => any;
declare const _default: React.MemoExoticComponent<{
    ({ library, ...props }: DynaActionFormProps): JSX.Element;
    defaultProps: {
        layout: string;
    };
}>;
export default _default;
