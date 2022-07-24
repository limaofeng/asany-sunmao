function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import screens from "../../../assets/devices";
import { dispatchWindowResize } from "../../../utils";
import { GlobalAsanyAction, UIScenaGlobalActionType } from "../../actions";
import { combineReducers } from "../../thunk";
import moveableReducer from "./moveable.reducer";
import toolbarReducer from "./toolbar.reducer";
import viewerReducer from "./viewer.reducer";
export var defaultDeviceScreen = screens.find(function (i) {
  return i.id === 'Desktop HD';
});
var scales = [20, 25, 33, 50, 66, 100, 150, 200, 300, 400, 500, 800, 1000];
var minScale = scales[0];
var maxScale = scales[scales.length - 1];
export function calculateScaling(zoom) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'change';
  var newZoom = zoom;

  if (type === 'out') {
    newZoom = [].concat(scales).reverse().find(function (item) {
      return item < newZoom;
    }) || newZoom;
  } else if (type === 'in') {
    newZoom = scales.find(function (item) {
      return item > newZoom;
    }) || newZoom;
  }

  var scale = Math.max(Math.min(newZoom, maxScale), minScale);
  return Math.floor(scale);
}
var defaultState = {
  zoom: 1,
  loading: false,
  snaps: {
    vertical: [],
    horizontal: []
  },
  screen: defaultDeviceScreen
};
export function reducer(state, action) {
  if (action.type === UIScenaGlobalActionType.SetScena) {
    var _action$payload = action.payload,
        workspace = _action$payload.workspace,
        toolbar = _action$payload.toolbar;
    return _objectSpread(_objectSpread(_objectSpread({}, state), action.payload), {}, {
      workspace: workspace,
      toolbar: _objectSpread(_objectSpread({}, state.toolbar), toolbar)
    });
  }

  if (action.type === UIScenaGlobalActionType.Loading) {
    return _objectSpread(_objectSpread({}, state), {}, {
      loading: action.payload
    });
  }

  if (action.type === UIScenaGlobalActionType.ScenaReset) {
    return _objectSpread(_objectSpread({}, state), {}, {
      reset: action.payload
    });
  }

  if (action.type === UIScenaGlobalActionType.ChangeScreenSize) {
    setTimeout(dispatchWindowResize, 10);
    return _objectSpread(_objectSpread({}, state), {}, {
      screen: action.payload
    });
  }

  if (action.type === UIScenaGlobalActionType.CanvasZoom && action.payload !== state.zoom) {
    return _objectSpread(_objectSpread({}, state), {}, {
      zoom: calculateScaling(action.payload * 100) / 100
    });
  }

  if (action.type === UIScenaGlobalActionType.ChangeSnapGuides) {
    return _objectSpread(_objectSpread({}, state), {}, {
      snaps: _objectSpread(_objectSpread({}, state.snaps), {}, {
        horizontal: action.payload.horizontal,
        vertical: action.payload.vertical
      })
    });
  }

  if (action.type === UIScenaGlobalActionType.CanvasZoomOut) {
    return _objectSpread(_objectSpread({}, state), {}, {
      zoom: calculateScaling(state.zoom * 100, 'out') / 100
    });
  }

  if (action.type === UIScenaGlobalActionType.CanvasZoomIn) {
    return _objectSpread(_objectSpread({}, state), {}, {
      zoom: calculateScaling(state.zoom * 100, 'in') / 100
    });
  }

  if (action.type === GlobalAsanyAction.Init) {
    return _objectSpread(_objectSpread({}, state), defaultState);
  }

  return state;
}
export default combineReducers({
  moveable: moveableReducer,
  viewer: viewerReducer,
  toolbar: toolbarReducer
}, reducer);