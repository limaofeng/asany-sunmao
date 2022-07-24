import { getFeatures, getScena, getSidebar, getToolbar } from "../utils/plugin";
import { ActionType, GlobalAsanyAction, ProjectActionType } from "./actions";
import featureReducer from "./features.reducer";
import pluginReducer from "./plugin.reducer";
import projectReducer from "./project.reducer";
import { combineReducers } from "./thunk";
import uiReducer from "./ui.reducer";
import workspaceReducer from "./workspace.reducer";
export var defaultReducer = function defaultReducer(state, action) {
  if (action.type === GlobalAsanyAction.Init) {
    state.isReady = true;
  }

  if (action.type === GlobalAsanyAction.ChangeMode) {
    state.mode = action.payload;
  }

  if (action.type === ActionType.BindSave) {
    state.save = action.payload;
  }

  return state;
};
var reducers = combineReducers({
  ui: uiReducer,
  workspace: workspaceReducer,
  project: projectReducer,
  features: featureReducer,
  plugins: pluginReducer
}, defaultReducer);
export var defaultValue = function defaultValue(mode, plugins) {
  return {
    isReady: false,
    mode: mode,
    plugins: plugins.reduce(function (plugins, plugin) {
      plugins[plugin.id] = plugin;
      return plugins;
    }, {})
  };
};
export default (function (state, action) {
  if (action.type === ProjectActionType.ChangeCase) {
    var project = action.payload;
    var newState = reducers(state, action);
    newState = reducers(newState, {
      type: ActionType.SetToolbar,
      payload: getToolbar(state, project.type)
    });
    newState = reducers(newState, {
      type: ActionType.SetSidebar,
      payload: getSidebar(state, project.type)
    });
    newState = reducers(newState, {
      type: ActionType.SetFeatures,
      payload: getFeatures(state, project.type)
    });
    return reducers(newState, {
      type: ActionType.SetScena,
      payload: getScena(state, project.type)
    });
  }

  return reducers(state, action);
});