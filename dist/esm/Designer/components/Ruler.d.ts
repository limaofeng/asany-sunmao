import React from 'react';
export interface RulerGuides {
    horizontal: number[];
    vertical: number[];
}
interface RulerProps {
    zoom: number;
    rulable: boolean;
    scrollX: number;
    scrollY: number;
    offsetLeft?: number;
    onResetScroll: () => void;
    onGuides?: (data: RulerGuides) => void;
}
declare function Ruler(props: RulerProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Ruler>;
export default _default;
