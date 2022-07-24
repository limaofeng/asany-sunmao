import React from 'react';
import { IField } from 'sunmao';
interface FormFieldProps {
    field: IField;
    layout: 'Inline' | 'Stacked';
    className?: string;
    children: React.ReactElement;
}
declare function FormField({ field, className, children, layout, ...props }: FormFieldProps): JSX.Element;
export default FormField;
