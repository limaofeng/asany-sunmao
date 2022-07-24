import React, { CSSProperties } from 'react';
export interface TabPane {
    id?: string;
    title: string;
    content: React.ReactElement;
}
interface Extra {
    title: string;
    summary?: string;
    content: React.ReactElement;
}
export interface PropertiesPanelProps {
    className?: string;
    footer?: React.ReactElement;
    onClose: (e: React.MouseEvent) => void;
    title?: string;
    content?: React.ReactElement;
    tabs?: TabPane[];
    extras?: Extra[];
    children?: React.ReactElement;
    style?: CSSProperties;
}
export interface IPropertiesPanel {
    container: HTMLDivElement;
    width: number;
    back: () => Promise<void>;
    switch: (activeKey: string) => void;
    next: (title: string, content: React.ReactElement) => void;
}
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<PropertiesPanelProps & React.RefAttributes<IPropertiesPanel>>>;
export default _default;
