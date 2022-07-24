function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var UISidebarActionType;

(function (UISidebarActionType) {
  UISidebarActionType["ChangeSymbols"] = "ChangeSymbols";
  UISidebarActionType["SidebarSelect"] = "UISidebar/ToolSelect";
  UISidebarActionType["SidebarUnSelect"] = "UISidebar/SidebarUnSelect";
  UISidebarActionType["ToolboardKey"] = "UISidebar/ToolboardKey";
  UISidebarActionType["API"] = "API";
  UISidebarActionType["ToolboardRef"] = "UISidebar/ToolboardRef";
  UISidebarActionType["SidebarVisible"] = "UISidebar/SidebarVisible";
  UISidebarActionType["SidebarRemoveContent"] = "UI/SetSidebar/RemoveContent";
  UISidebarActionType["SidebarSetContent"] = "UI/SetSidebar/Content";
  UISidebarActionType["SidebarContentMinimize"] = "UI/SetSidebar/minimizeContent";
  UISidebarActionType["SetSidebar"] = "UI/SetSidebar";
  UISidebarActionType["SidebarContentWidth"] = "UI/SetSidebar/ContentWidth";
})(UISidebarActionType || (UISidebarActionType = {}));

export var UIAsideActionType;

(function (UIAsideActionType) {
  UIAsideActionType["OpenAside"] = "OpenAside";
  UIAsideActionType["CloseAside"] = "CloseAside";
  UIAsideActionType["AsideRef"] = "AsideRef";
})(UIAsideActionType || (UIAsideActionType = {}));

export var UIScenaMoveableActionType;

(function (UIScenaMoveableActionType) {
  UIScenaMoveableActionType["MoveableSelectedTargets"] = "MoveableSelectedTargets";
  UIScenaMoveableActionType["MoveableDisable"] = "UI/Scena/Moveable/Disable";
  UIScenaMoveableActionType["MoveableEnable"] = "UI/Scena/Moveable/Enable";
  UIScenaMoveableActionType["MoveableRef"] = "UI/Scena/Moveable/Ref";
})(UIScenaMoveableActionType || (UIScenaMoveableActionType = {}));

export var UIScenaGlobalActionType;

(function (UIScenaGlobalActionType) {
  UIScenaGlobalActionType["ChangeScreenSize"] = "ChangeScreenSize";
  UIScenaGlobalActionType["ChangeMoveWay"] = "ChangeMoveWay";
  UIScenaGlobalActionType["ToggleSelecto"] = "ChangeSelecto";
  UIScenaGlobalActionType["CanvasZoom"] = "CanvasZoom";
  UIScenaGlobalActionType["CanvasZoomOut"] = "CanvasZoomOut";
  UIScenaGlobalActionType["CanvasZoomIn"] = "CanvasZoomIn";
  UIScenaGlobalActionType["ChangeSnapGuides"] = "ChangeSnapGuides";
  UIScenaGlobalActionType["SetScena"] = "SetScena";
  UIScenaGlobalActionType["Loading"] = "Loading";
  UIScenaGlobalActionType["ScenaReset"] = "ScenaSetResetFunc";
})(UIScenaGlobalActionType || (UIScenaGlobalActionType = {}));

export var UIScenaViewerActionType;

(function (UIScenaViewerActionType) {
  UIScenaViewerActionType["DUSTBIN_ACCEPT"] = "DUSTBIN_ACCEPT";
})(UIScenaViewerActionType || (UIScenaViewerActionType = {}));

export var UIScenaToolbarActionType;

(function (UIScenaToolbarActionType) {
  UIScenaToolbarActionType["ScenaToolbarSelect"] = "UIScenaToolbar/ToolSelect";
  UIScenaToolbarActionType["ScenaToolbarUnSelect"] = "UIScenaToolbar/ToolbarUnSelect";
  UIScenaToolbarActionType["ScenaToggleVisible"] = "UIScenaToolbar/ScenaToggleVisible";
  UIScenaToolbarActionType["ScenaSetToolbar"] = "UIScenaToolbar/SetToolbar";
})(UIScenaToolbarActionType || (UIScenaToolbarActionType = {}));

export var UIScenaActionType = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, UIScenaGlobalActionType), UIScenaMoveableActionType), UIScenaViewerActionType), UIScenaToolbarActionType);
export var UIToolbarActionType;

(function (UIToolbarActionType) {
  UIToolbarActionType["ToolbarSelect"] = "UIToolbar/ToolSelect";
  UIToolbarActionType["ToolbarUnSelect"] = "UIToolbar/ToolbarUnSelect";
  UIToolbarActionType["SetToolbar"] = "UI/SetToolbar";
})(UIToolbarActionType || (UIToolbarActionType = {}));

export var UIActionType = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, UISidebarActionType), UIAsideActionType), UIScenaActionType), UIToolbarActionType);
export var GlobalAsanyAction;

(function (GlobalAsanyAction) {
  GlobalAsanyAction["Init"] = "Init";
  GlobalAsanyAction["BindSave"] = "BindSave";
  GlobalAsanyAction["ChangeMode"] = "ChangeMode";
})(GlobalAsanyAction || (GlobalAsanyAction = {}));

export var ProjectActionType;

(function (ProjectActionType) {
  ProjectActionType["ChangeCase"] = "ChangeCase";
})(ProjectActionType || (ProjectActionType = {}));

export var WorkspaceActionType;

(function (WorkspaceActionType) {
  WorkspaceActionType["ChangeStateByPlugin"] = "ChangeStateByPlugin";
})(WorkspaceActionType || (WorkspaceActionType = {}));

export var IFeatureActionType;

(function (IFeatureActionType) {
  IFeatureActionType["FeatureZoom"] = "Features/Zoom";
  IFeatureActionType["FeatureRuler"] = "Features/Ruler";
  IFeatureActionType["SetFeatures"] = "SetFeatures";
  IFeatureActionType["FeatureDrag"] = "FeatureDrag";
  IFeatureActionType["FeatureSelecto"] = "FeatureSelecto";
})(IFeatureActionType || (IFeatureActionType = {}));

export var IPluginActionType;

(function (IPluginActionType) {
  IPluginActionType["addPlugin"] = "addPlugin";
  IPluginActionType["PluginStateInit"] = "PluginStateInit";
})(IPluginActionType || (IPluginActionType = {}));

export var ActionType = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, GlobalAsanyAction), UIActionType), ProjectActionType), WorkspaceActionType), IFeatureActionType), IPluginActionType);