export declare enum UISidebarActionType {
    /**
     * 改变组件库
     */
    ChangeSymbols = "ChangeSymbols",
    /**
     * 切换工具
     */
    SidebarSelect = "UISidebar/ToolSelect",
    /**
     * 切换工具
     */
    SidebarUnSelect = "UISidebar/SidebarUnSelect",
    /**
     * 工具面板对应的 Key
     */
    ToolboardKey = "UISidebar/ToolboardKey",
    /**
     * 选择的API
     */
    API = "API",
    /**
     * 工具版引用对象
     */
    ToolboardRef = "UISidebar/ToolboardRef",
    /**
     * 设置可见性
     */
    SidebarVisible = "UISidebar/SidebarVisible",
    SidebarRemoveContent = "UI/SetSidebar/RemoveContent",
    SidebarSetContent = "UI/SetSidebar/Content",
    /**
     * 面板最小化
     */
    SidebarContentMinimize = "UI/SetSidebar/minimizeContent",
    /**
     *设置面板
     */
    SetSidebar = "UI/SetSidebar",
    /**
     * 设置侧边栏固定面板宽度
     */
    SidebarContentWidth = "UI/SetSidebar/ContentWidth"
}
export declare enum UIAsideActionType {
    /**
     * 打开右侧面板
     */
    OpenAside = "OpenAside",
    /**
     * 关闭右侧面板
     */
    CloseAside = "CloseAside",
    AsideRef = "AsideRef"
}
export declare enum UIScenaMoveableActionType {
    /**
     * 设置选中的元素
     */
    MoveableSelectedTargets = "MoveableSelectedTargets",
    /**
     * 禁用 Moveable
     */
    MoveableDisable = "UI/Scena/Moveable/Disable",
    /**
     * 启用 Moveable
     */
    MoveableEnable = "UI/Scena/Moveable/Enable",
    MoveableRef = "UI/Scena/Moveable/Ref"
}
export declare enum UIScenaGlobalActionType {
    /**
     * 改变屏幕尺寸
     */
    ChangeScreenSize = "ChangeScreenSize",
    /**
     * 改变屏幕尺寸拖拽方式
     */
    ChangeMoveWay = "ChangeMoveWay",
    /**
     * 切换鼠标选区操作
     */
    ToggleSelecto = "ChangeSelecto",
    /**
     * 画布缩放
     */
    CanvasZoom = "CanvasZoom",
    /**
     * 画布缩小
     */
    CanvasZoomOut = "CanvasZoomOut",
    /**
     * 画布放大
     */
    CanvasZoomIn = "CanvasZoomIn",
    /**
     * 参考线
     */
    ChangeSnapGuides = "ChangeSnapGuides",
    SetScena = "SetScena",
    Loading = "Loading",
    ScenaReset = "ScenaSetResetFunc"
}
export declare enum UIScenaViewerActionType {
    DUSTBIN_ACCEPT = "DUSTBIN_ACCEPT"
}
export declare enum UIScenaToolbarActionType {
    /**
     * 切换工具
     */
    ScenaToolbarSelect = "UIScenaToolbar/ToolSelect",
    /**
     * 切换工具
     */
    ScenaToolbarUnSelect = "UIScenaToolbar/ToolbarUnSelect",
    ScenaToggleVisible = "UIScenaToolbar/ScenaToggleVisible",
    ScenaSetToolbar = "UIScenaToolbar/SetToolbar"
}
export declare const UIScenaActionType: {
    ScenaToolbarSelect: UIScenaToolbarActionType.ScenaToolbarSelect;
    ScenaToolbarUnSelect: UIScenaToolbarActionType.ScenaToolbarUnSelect;
    ScenaToggleVisible: UIScenaToolbarActionType.ScenaToggleVisible;
    ScenaSetToolbar: UIScenaToolbarActionType.ScenaSetToolbar;
    DUSTBIN_ACCEPT: UIScenaViewerActionType.DUSTBIN_ACCEPT;
    MoveableSelectedTargets: UIScenaMoveableActionType.MoveableSelectedTargets;
    MoveableDisable: UIScenaMoveableActionType.MoveableDisable;
    MoveableEnable: UIScenaMoveableActionType.MoveableEnable;
    MoveableRef: UIScenaMoveableActionType.MoveableRef;
    ChangeScreenSize: UIScenaGlobalActionType.ChangeScreenSize;
    ChangeMoveWay: UIScenaGlobalActionType.ChangeMoveWay;
    ToggleSelecto: UIScenaGlobalActionType.ToggleSelecto;
    CanvasZoom: UIScenaGlobalActionType.CanvasZoom;
    CanvasZoomOut: UIScenaGlobalActionType.CanvasZoomOut;
    CanvasZoomIn: UIScenaGlobalActionType.CanvasZoomIn;
    ChangeSnapGuides: UIScenaGlobalActionType.ChangeSnapGuides;
    SetScena: UIScenaGlobalActionType.SetScena;
    Loading: UIScenaGlobalActionType.Loading;
    ScenaReset: UIScenaGlobalActionType.ScenaReset;
};
export declare enum UIToolbarActionType {
    /**
     * 切换工具
     */
    ToolbarSelect = "UIToolbar/ToolSelect",
    /**
     * 切换工具
     */
    ToolbarUnSelect = "UIToolbar/ToolbarUnSelect",
    /**
     * 设置工具栏
     */
    SetToolbar = "UI/SetToolbar"
}
export declare const UIActionType: {
    ToolbarSelect: UIToolbarActionType.ToolbarSelect;
    ToolbarUnSelect: UIToolbarActionType.ToolbarUnSelect;
    SetToolbar: UIToolbarActionType.SetToolbar;
    ScenaToolbarSelect: UIScenaToolbarActionType.ScenaToolbarSelect;
    ScenaToolbarUnSelect: UIScenaToolbarActionType.ScenaToolbarUnSelect;
    ScenaToggleVisible: UIScenaToolbarActionType.ScenaToggleVisible;
    ScenaSetToolbar: UIScenaToolbarActionType.ScenaSetToolbar;
    DUSTBIN_ACCEPT: UIScenaViewerActionType.DUSTBIN_ACCEPT;
    MoveableSelectedTargets: UIScenaMoveableActionType.MoveableSelectedTargets;
    MoveableDisable: UIScenaMoveableActionType.MoveableDisable;
    MoveableEnable: UIScenaMoveableActionType.MoveableEnable;
    MoveableRef: UIScenaMoveableActionType.MoveableRef;
    ChangeScreenSize: UIScenaGlobalActionType.ChangeScreenSize;
    ChangeMoveWay: UIScenaGlobalActionType.ChangeMoveWay;
    ToggleSelecto: UIScenaGlobalActionType.ToggleSelecto;
    CanvasZoom: UIScenaGlobalActionType.CanvasZoom;
    CanvasZoomOut: UIScenaGlobalActionType.CanvasZoomOut;
    CanvasZoomIn: UIScenaGlobalActionType.CanvasZoomIn;
    ChangeSnapGuides: UIScenaGlobalActionType.ChangeSnapGuides;
    SetScena: UIScenaGlobalActionType.SetScena;
    Loading: UIScenaGlobalActionType.Loading;
    ScenaReset: UIScenaGlobalActionType.ScenaReset;
    OpenAside: UIAsideActionType.OpenAside;
    CloseAside: UIAsideActionType.CloseAside;
    AsideRef: UIAsideActionType.AsideRef;
    ChangeSymbols: UISidebarActionType.ChangeSymbols;
    SidebarSelect: UISidebarActionType.SidebarSelect;
    SidebarUnSelect: UISidebarActionType.SidebarUnSelect;
    ToolboardKey: UISidebarActionType.ToolboardKey;
    API: UISidebarActionType.API;
    ToolboardRef: UISidebarActionType.ToolboardRef;
    SidebarVisible: UISidebarActionType.SidebarVisible;
    SidebarRemoveContent: UISidebarActionType.SidebarRemoveContent;
    SidebarSetContent: UISidebarActionType.SidebarSetContent;
    SidebarContentMinimize: UISidebarActionType.SidebarContentMinimize;
    SetSidebar: UISidebarActionType.SetSidebar;
    SidebarContentWidth: UISidebarActionType.SidebarContentWidth;
};
export declare enum GlobalAsanyAction {
    Init = "Init",
    BindSave = "BindSave",
    ChangeMode = "ChangeMode"
}
export declare enum ProjectActionType {
    ChangeCase = "ChangeCase"
}
export declare enum WorkspaceActionType {
    ChangeStateByPlugin = "ChangeStateByPlugin"
}
export declare enum IFeatureActionType {
    /**
     * 缩放
     */
    FeatureZoom = "Features/Zoom",
    /**
     * 标尺
     */
    FeatureRuler = "Features/Ruler",
    SetFeatures = "SetFeatures",
    FeatureDrag = "FeatureDrag",
    FeatureSelecto = "FeatureSelecto"
}
export declare enum IPluginActionType {
    /**
     * 添加插件
     */
    addPlugin = "addPlugin",
    PluginStateInit = "PluginStateInit"
}
export declare const ActionType: {
    addPlugin: IPluginActionType.addPlugin;
    PluginStateInit: IPluginActionType.PluginStateInit;
    FeatureZoom: IFeatureActionType.FeatureZoom;
    FeatureRuler: IFeatureActionType.FeatureRuler;
    SetFeatures: IFeatureActionType.SetFeatures;
    FeatureDrag: IFeatureActionType.FeatureDrag;
    FeatureSelecto: IFeatureActionType.FeatureSelecto;
    ChangeStateByPlugin: WorkspaceActionType.ChangeStateByPlugin;
    ChangeCase: ProjectActionType.ChangeCase;
    ToolbarSelect: UIToolbarActionType.ToolbarSelect;
    ToolbarUnSelect: UIToolbarActionType.ToolbarUnSelect;
    SetToolbar: UIToolbarActionType.SetToolbar;
    ScenaToolbarSelect: UIScenaToolbarActionType.ScenaToolbarSelect;
    ScenaToolbarUnSelect: UIScenaToolbarActionType.ScenaToolbarUnSelect;
    ScenaToggleVisible: UIScenaToolbarActionType.ScenaToggleVisible;
    ScenaSetToolbar: UIScenaToolbarActionType.ScenaSetToolbar;
    DUSTBIN_ACCEPT: UIScenaViewerActionType.DUSTBIN_ACCEPT;
    MoveableSelectedTargets: UIScenaMoveableActionType.MoveableSelectedTargets;
    MoveableDisable: UIScenaMoveableActionType.MoveableDisable;
    MoveableEnable: UIScenaMoveableActionType.MoveableEnable;
    MoveableRef: UIScenaMoveableActionType.MoveableRef;
    ChangeScreenSize: UIScenaGlobalActionType.ChangeScreenSize;
    ChangeMoveWay: UIScenaGlobalActionType.ChangeMoveWay;
    ToggleSelecto: UIScenaGlobalActionType.ToggleSelecto;
    CanvasZoom: UIScenaGlobalActionType.CanvasZoom;
    CanvasZoomOut: UIScenaGlobalActionType.CanvasZoomOut;
    CanvasZoomIn: UIScenaGlobalActionType.CanvasZoomIn;
    ChangeSnapGuides: UIScenaGlobalActionType.ChangeSnapGuides;
    SetScena: UIScenaGlobalActionType.SetScena;
    Loading: UIScenaGlobalActionType.Loading;
    ScenaReset: UIScenaGlobalActionType.ScenaReset;
    OpenAside: UIAsideActionType.OpenAside;
    CloseAside: UIAsideActionType.CloseAside;
    AsideRef: UIAsideActionType.AsideRef;
    ChangeSymbols: UISidebarActionType.ChangeSymbols;
    SidebarSelect: UISidebarActionType.SidebarSelect;
    SidebarUnSelect: UISidebarActionType.SidebarUnSelect;
    ToolboardKey: UISidebarActionType.ToolboardKey;
    API: UISidebarActionType.API;
    ToolboardRef: UISidebarActionType.ToolboardRef;
    SidebarVisible: UISidebarActionType.SidebarVisible;
    SidebarRemoveContent: UISidebarActionType.SidebarRemoveContent;
    SidebarSetContent: UISidebarActionType.SidebarSetContent;
    SidebarContentMinimize: UISidebarActionType.SidebarContentMinimize;
    SetSidebar: UISidebarActionType.SetSidebar;
    SidebarContentWidth: UISidebarActionType.SidebarContentWidth;
    Init: GlobalAsanyAction.Init;
    BindSave: GlobalAsanyAction.BindSave;
    ChangeMode: GlobalAsanyAction.ChangeMode;
};
export declare type IActionType = GlobalAsanyAction | UISidebarActionType | UIAsideActionType | UIScenaGlobalActionType | UIScenaMoveableActionType | UIScenaViewerActionType | UIScenaToolbarActionType | UIToolbarActionType | ProjectActionType | WorkspaceActionType | IFeatureActionType | IPluginActionType;
