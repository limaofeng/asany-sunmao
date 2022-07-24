import { IAsanyEditor, IUIToolbarState, ToolbarHelper } from '../typings';
export default class ToolbarHelperImpl implements ToolbarHelper {
    private editor;
    constructor(editor: IAsanyEditor);
    get state(): IUIToolbarState;
    hasSelected(key: string): boolean;
    select(key: string): void;
    unselect(...keys: string[]): void;
    tools(): import("../typings").AsanyTool[];
}
