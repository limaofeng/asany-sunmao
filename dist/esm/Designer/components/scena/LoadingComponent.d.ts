import React, { CSSProperties } from 'react';
export interface LoadingComponentProps {
    className?: string;
    style?: CSSProperties;
    loading?: boolean;
}
declare function LoadingComponent(props: LoadingComponentProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof LoadingComponent>;
export default _default;
