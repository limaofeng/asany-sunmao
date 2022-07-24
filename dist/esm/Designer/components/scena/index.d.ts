import React from 'react';
export interface ScenaStatus {
    dragStatus: boolean;
}
interface ScenaProps {
    offsetLeft: number;
    children: React.ReactNode;
}
declare function Scena(props: ScenaProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Scena>;
export default _default;
