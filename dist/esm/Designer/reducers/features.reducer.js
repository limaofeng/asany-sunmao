function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { GlobalAsanyAction, IFeatureActionType } from "./actions";
var defaultState = {
  zoom: false,
  ruler: false,
  drag: false,
  selecto: false
};
export default function reducer(state, action) {
  if (action.type === GlobalAsanyAction.Init) {
    return defaultState;
  }

  if (action.type === IFeatureActionType.SetFeatures) {
    return Object.keys(defaultState).reduce(function (state, key) {
      state[key] = action.payload.includes(key);
      return state;
    }, _objectSpread({}, state));
  }

  if (action.type === IFeatureActionType.FeatureDrag) {
    return _objectSpread(_objectSpread({}, state), {}, {
      selecto: action.payload ? false : state.selecto,
      drag: action.payload
    });
  }

  if (action.type === IFeatureActionType.FeatureSelecto) {
    return _objectSpread(_objectSpread({}, state), {}, {
      drag: action.payload ? false : state.drag,
      selecto: action.payload
    });
  }

  if (action.type === IFeatureActionType.FeatureZoom) {
    return _objectSpread(_objectSpread({}, state), {}, {
      zoom: action.payload
    });
  }

  if (action.type === IFeatureActionType.FeatureRuler) {
    return _objectSpread(_objectSpread({}, state), {}, {
      ruler: action.payload
    });
  }

  return state;
}