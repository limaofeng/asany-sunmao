function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useEffect, useReducer, useRef } from 'react';
import { generateUUID } from "../utils";
import useComponent from "./useComponent";
import useSunmao from "./useSunmao";
var COMPONENT = 'component';

function buildComponentDragObject(item) {
  if (typeof item.selector === 'string') {
    return _objectSpread(_objectSpread({}, item), {}, {
      selector: function selector(component) {
        return !!component.tags && component.tags.some(function (tag) {
          return tag.startsWith(item.selector);
        });
      }
    });
  }

  return _objectSpread({}, item);
}

var buildCreateDragObject = function buildCreateDragObject(type) {
  return function (component) {
    return {
      id: generateUUID(),
      component: component.name,
      name: component.title,
      type: type
    };
  };
};

function defaultComponentSorter(_ref, _ref2) {
  var _ref$boost = _ref.boost,
      a = _ref$boost === void 0 ? 0 : _ref$boost;
  var _ref2$boost = _ref2.boost,
      b = _ref2$boost === void 0 ? 0 : _ref2$boost;
  return a - b;
}

function buildComponentGroup(item, sunmao) {
  return {
    title: item.title,
    type: item.type || COMPONENT,
    createDragObject: item.object || buildCreateDragObject(item.type || COMPONENT),
    components: sunmao.getComponents(item.selector).sort(item.sorter || defaultComponentSorter)
  };
}
/**
 * 获取 组件 对应的 symbols
 * @param id 组件ID
 */


function useSymbols(id) {
  var sunmao = useSunmao();
  var component = useComponent(id);

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1]; // 存储上一次selector的返回值。


  var latestState = useRef([]);
  useEffect(function () {
    if (component == null) {
      return;
    }

    var updateState = function updateState() {
      latestState.current = (component.symbols || []).map(buildComponentDragObject).map(function (item) {
        return buildComponentGroup(item, sunmao);
      });
      forceRender();
    };

    updateState();
    return sunmao.subscribe(updateState); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
  return latestState.current;
}

export default useSymbols;