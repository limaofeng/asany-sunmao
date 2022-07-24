import type { IAsanyEditor, IUIScenaState, ScenaHelper, Toolbar } from '../typings';
declare class ScenaHelperImpl implements ScenaHelper {
    private editor;
    private _toolbar;
    constructor(editor: IAsanyEditor);
    get toolbar(): Toolbar;
    get state(): IUIScenaState;
    mask(): Promise<void>;
    unmask(delay?: number): Promise<void>;
    viewport(id: string): void;
    viewport(width: number, height: number): void;
    reset(): void;
    setSelectedTargets(targets: (HTMLElement | SVGElement)[]): void;
    moveable(): import("react-moveable").default<{}> | null | undefined;
}
export default ScenaHelperImpl;
