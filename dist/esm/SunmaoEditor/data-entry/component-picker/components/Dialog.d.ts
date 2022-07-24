import React from 'react';
import type { SelectPopoverProps } from '@asany/editor/dist/typings';
interface DialogProps extends SelectPopoverProps {
    close: () => void;
    visible: boolean;
    value?: string;
    onChange: (name: string) => void;
}
declare function Dialog({ value, close, visible, onChange, options: treeData }: DialogProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Dialog>;
export default _default;
