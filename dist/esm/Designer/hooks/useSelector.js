function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useEffect, useReducer, useRef } from 'react';
import useAsanyStore from "./useAsanyStore";

function toAsanyState(store) {
  return store.getState();
}

var defaultEqualityFn = function defaultEqualityFn(a, b) {
  return a === b;
};
/**
 * 模仿 Redux 的 useSelector
 * @param selector
 * @param equalityFn
 */


export default function useSelector(selector) {
  var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityFn;
  var store = useAsanyStore(); // 强制让当前组件渲染的方法

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1]; // 存储上一次selector的返回值。


  var latestSelectedState = useRef(); // 根据用户传入的selector，从store中拿到用户想要的值。

  var selectedState = selector(toAsanyState(store)); // 检查是否需要强制更新

  function checkForUpdates() {
    var newSelectedState = selector(toAsanyState(store)); // 如果比较相等，就啥也不做

    if (equalityFn(newSelectedState, latestSelectedState.current)) {
      return;
    } // 否则更新ref中保存的上一次渲染的值


    latestSelectedState.current = newSelectedState; // 然后强制渲染

    forceRender();
  } // 组件第一次渲染后 执行订阅store的逻辑


  useEffect(function () {
    // 在用户调用了dispatch后，执行checkForUpdates
    var unsubscribe = store.subscribe(checkForUpdates); // 组件被销毁后 需要调用unsubscribe停止订阅

    return unsubscribe; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return selectedState;
}