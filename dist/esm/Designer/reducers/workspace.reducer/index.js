function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { combineReducers } from "../thunk";
import { GlobalAsanyAction, IPluginActionType, WorkspaceActionType } from "../actions";
export default combineReducers({}, function (state, action) {
  var newState = state;
  var _newState = newState,
      reducers = _newState.reducers;

  if (WorkspaceActionType.ChangeStateByPlugin === action.type) {
    var _action$payload = action.payload,
        _reducers = _action$payload.reducers,
        project = _action$payload.project;

    if (_reducers) {
      newState = _reducers(newState, {
        type: IPluginActionType.PluginStateInit,
        payload: project
      });
      newState.reducers = _reducers;
    }
  }

  newState = reducers ? reducers(newState, action) : newState;

  if (action.type === GlobalAsanyAction.Init) {
    return _objectSpread({}, newState);
  }

  return newState;
});