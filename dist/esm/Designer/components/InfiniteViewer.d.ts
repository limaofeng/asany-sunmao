import React, { CSSProperties } from 'react';
interface InfiniteViewerProps {
    className?: string;
    style?: CSSProperties;
    children: JSX.Element;
    drag?: boolean;
    zoom?: number;
    isZoom?: boolean;
    scrollX?: number;
    scrollY?: number;
    onScroll: (x: number, y: number) => void;
    onZoom: (zoom: number, original: number) => void;
}
declare function InfiniteViewer(props: InfiniteViewerProps): JSX.Element;
declare namespace InfiniteViewer {
    var defaultProps: {
        scrollX: number;
        scrollY: number;
    };
}
declare const _default: React.MemoExoticComponent<typeof InfiniteViewer>;
export default _default;
