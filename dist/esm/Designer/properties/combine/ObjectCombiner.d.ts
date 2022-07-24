import React from 'react';
import { IField } from '../../../sunmao';
import { FormLayout } from 'antd/lib/form/Form';
interface ObjectCombinerProps {
    value?: any;
    layout?: FormLayout;
    onChange?: (value: any) => void;
    className?: string;
    fields: IField[];
}
declare function ObjectCombiner(props: ObjectCombinerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof ObjectCombiner>;
export default _default;
