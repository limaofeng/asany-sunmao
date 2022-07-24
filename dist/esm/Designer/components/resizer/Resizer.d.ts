import React, { CSSProperties } from 'react';
declare type ResizeFunc = (e: React.MouseEvent) => void;
export declare type ResizerProps = {
    className?: string;
    handleClassName?: string;
    direction?: 'x' | 'y';
    onResizeStart?: ResizeFunc;
    onResize: (diff: number) => void;
    onResizeEnd?: ResizeFunc;
    children: React.ReactNode;
    style?: CSSProperties;
};
declare function Resizer(props: ResizerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Resizer>;
export default _default;
