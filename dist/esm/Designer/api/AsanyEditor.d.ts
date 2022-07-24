import { IAsanyStoreContext } from '../AsanyContext';
import { AsanyProject, AsideHelper, FeaturesHelper, IAsanyEditor, ScenaHelper, SidebarHelper, ToolbarHelper } from '../typings';
export default class AsanyEditorObject implements IAsanyEditor {
    private _store;
    private _features;
    private _toolbar;
    private _sidebar;
    private _aside;
    private _scena;
    constructor(store: IAsanyStoreContext<any>);
    get scena(): ScenaHelper;
    get toolbar(): ToolbarHelper;
    get aside(): AsideHelper;
    get sidebar(): SidebarHelper;
    get features(): FeaturesHelper;
    get store(): IAsanyStoreContext<any>;
    get dispatch(): import("../AsanyContext").DispatchWithoutAction<any>;
    get state(): import("../typings").IAsanyState;
    save(project: AsanyProject): void;
}
