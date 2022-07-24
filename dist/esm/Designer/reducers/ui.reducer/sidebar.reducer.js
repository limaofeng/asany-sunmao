function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { GlobalAsanyAction, UISidebarActionType } from "../actions";
var defaultState = {
  tools: [],
  width: 250,
  visible: false,
  library: undefined,
  activeKeys: [],
  minWidth: 170,
  minimizable: true
};
export default function reducer(state, action) {
  if (action.type === UISidebarActionType.ChangeSymbols) {
    return _objectSpread(_objectSpread({}, state), {}, {
      library: action.payload
    });
  }

  if (action.type === UISidebarActionType.ToolboardRef) {
    return _objectSpread(_objectSpread({}, state), {}, {
      control: action.payload
    });
  }

  if (action.type === UISidebarActionType.API) {
    return _objectSpread(_objectSpread({}, state), {}, {
      api: action.payload
    });
  }

  if (action.type === UISidebarActionType.SidebarSelect) {
    return _objectSpread(_objectSpread({}, state), {}, {
      activeKeys: [].concat(_toConsumableArray(state.activeKeys), [action.payload])
    });
  }

  if (action.type === UISidebarActionType.SidebarUnSelect) {
    return _objectSpread(_objectSpread({}, state), {}, {
      toolboardKey: state.toolboardKey === action.payload ? undefined : state.toolboardKey,
      activeKeys: state.activeKeys.filter(function (item) {
        return !action.payload.includes(item);
      })
    });
  }

  if (action.type === UISidebarActionType.ToolboardKey) {
    return _objectSpread(_objectSpread({}, state), {}, {
      toolboardKey: action.payload,
      activeKeys: [action.payload].concat(_toConsumableArray(state.activeKeys))
    });
  }

  if (action.type === UISidebarActionType.SidebarVisible) {
    return _objectSpread(_objectSpread({}, state), {}, {
      visible: action.payload
    });
  }

  if (action.type === UISidebarActionType.SidebarSetContent) {
    var content = action.payload.content;
    var width = action.payload.width || state.width;
    var minWidth = action.payload.minWidth || state.minWidth;
    return _objectSpread(_objectSpread({}, state), {}, {
      content: content,
      width: width,
      minWidth: minWidth
    });
  }

  if (action.type === UISidebarActionType.SidebarRemoveContent) {
    return _objectSpread(_objectSpread({}, state), {}, {
      content: undefined
    });
  }

  if (action.type === UISidebarActionType.SidebarContentMinimize) {
    return _objectSpread(_objectSpread({}, state), {}, {
      minimizable: action.payload
    });
  }

  if (action.type === UISidebarActionType.SidebarContentWidth) {
    return _objectSpread(_objectSpread({}, state), {}, {
      width: action.payload
    });
  }

  if (action.type === UISidebarActionType.SetSidebar) {
    var _content = action.payload.content;

    var _width = _content ? action.payload.width || state.width : 0;

    var minimizable = action.payload.minimizable || state.minimizable;

    var _minWidth = action.payload.minWidth || state.minWidth;

    return _objectSpread(_objectSpread({}, state), {}, {
      minWidth: _minWidth,
      width: _width,
      content: _content,
      minimizable: !action.payload.visible || minimizable,
      tools: action.payload.tools,
      visible: action.payload.visible !== false
    });
  }

  if (action.type === GlobalAsanyAction.Init) {
    return defaultState;
  }

  return state;
}