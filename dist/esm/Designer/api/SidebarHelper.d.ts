import { ComponentType } from 'react';
import { IAsanyEditor, IUISidebarState, SidebarHelper } from '../typings';
export default class SidebarHelperImpl implements SidebarHelper {
    private editor;
    constructor(editor: IAsanyEditor);
    content(content: ComponentType, width?: number, minWidth?: number): void;
    removeContent(): void;
    get state(): IUISidebarState;
    visible(visible: boolean): void;
    hasSelected(key: string): boolean;
    select(key: string, toolboard?: boolean): void;
    unselect(...keys: string[]): void;
    reopen(toolKey: string): void;
    next(content: ComponentType<any>, width?: number): void;
    next(title: string, content: ComponentType<any>): void;
    next(title: string, content: ComponentType<any>, width?: number): void;
    next(index: number, content: ComponentType<any>, width?: number): void;
    next(index: number, title: string, content: ComponentType<any>, width?: number): void;
    open(key: string, title: string, body: ComponentType): any;
    close(index?: number): Promise<void>;
    back(): void;
    tools(): import("../typings").AsanyTool[];
}
