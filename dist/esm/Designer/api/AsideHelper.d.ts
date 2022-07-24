import { ComponentType } from 'react';
import type { AsideHelper, AsideTabPane, IAsanyEditor, IUIAsideState, PanelOptions, SunmaoCustomizer, UndoFunc } from '../typings';
export default class AsideHelperImpl implements AsideHelper {
    private editor;
    constructor(editor: IAsanyEditor);
    get state(): IUIAsideState;
    next(title: string, body: ComponentType<any>): void;
    open(data: SunmaoCustomizer, options?: PanelOptions): void;
    open(tabs: AsideTabPane[], options?: PanelOptions): void | UndoFunc;
    open(title: string, body: ComponentType<any>, options?: PanelOptions): void | UndoFunc;
    close(): void;
}
