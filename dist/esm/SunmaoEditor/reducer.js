function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { IPluginActionType } from "../Designer";
export var SketchActionType;

(function (SketchActionType) {
  SketchActionType["USER_CUSTOMIZER"] = "USER_CUSTOMIZER";
  SketchActionType["BLOCK_ACTIVE_KEY"] = "BLOCK_ACTIVE_KEY";
  SketchActionType["BLOCK_MOUSE_ENTER"] = "BLOCK_MOUSE_ENTER";
  SketchActionType["BLOCK_MOUSE_LEAVE"] = "BLOCK_MOUSE_LEAVE";
})(SketchActionType || (SketchActionType = {}));

var defaultState = {
  stack: []
};
export default function reducer(state, action) {
  if (action.type === IPluginActionType.PluginStateInit) {
    return defaultState;
  }

  if (action.type === SketchActionType.BLOCK_MOUSE_ENTER) {
    var key = action.payload.key;
    var stack = state.stack;
    stack.push(key);
    return _objectSpread(_objectSpread({}, state), {}, {
      stack: _toConsumableArray(stack)
    });
  }

  if (action.type === SketchActionType.BLOCK_ACTIVE_KEY) {
    return _objectSpread(_objectSpread({}, state), {}, {
      activeKey: action.payload
    });
  }

  if (action.type === SketchActionType.BLOCK_MOUSE_LEAVE) {
    var _stack = state.stack;

    _stack.pop();

    return _objectSpread(_objectSpread({}, state), {}, {
      stack: _toConsumableArray(_stack)
    });
  }

  if (action.type === SketchActionType.USER_CUSTOMIZER) {
    var customizer = action.payload.customizer;
    return _objectSpread(_objectSpread({}, state), {}, {
      customizer: customizer
    });
  }

  return state;
}