import React from 'react';
import { IAsanyEditor, IToolboard } from '../../typings';
interface ToolboardProps {
    editor: IAsanyEditor;
    setCollapsed(collapsed: boolean): void;
    children: React.ReactNode;
    onResize: (x: number) => void;
}
interface ToolPanelProps {
    visible?: boolean;
    index?: number;
    title?: string;
    left?: number;
    width?: number;
    collapsed?: boolean;
    closable?: boolean;
    collapseLocation?: number;
    className?: string;
    onClose?: (index: number) => void;
    children: React.ReactNode;
}
export declare function ToolPanel(props: ToolPanelProps): JSX.Element;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<ToolboardProps & React.RefAttributes<IToolboard>>>;
export default _default;
