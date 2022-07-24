function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { defaultEqualityFn } from "../typings";
export function useInternalStoreSelector(store, selector) {
  var equalityFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultEqualityFn;

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var latestSelectedState = useRef();
  var selectedState = selector(store.getState());
  var checkForUpdates = useCallback(function () {
    var newSelectedState = selector(store.getState());

    if (equalityFn(newSelectedState, latestSelectedState.current)) {
      return;
    }

    latestSelectedState.current = newSelectedState;
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(function () {
    return store.subscribe(checkForUpdates);
  }, []);
  return selectedState;
}
export function useInternalSelector(sketch, id, selector) {
  var equalityFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultEqualityFn;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      store = _useState2[0],
      setStore = _useState2[1];

  useEffect(function () {
    var component = sketch.getComponent(id);

    if (!!component) {
      setStore(component.store);
      return;
    }

    return sketch.on('add-component', function () {
      var component = sketch.getComponent(id);

      if (!component) {
        return;
      }

      setStore(component.store);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var temp = useRef({});
  temp.current = store ? store.getState() : {};

  var _useReducer3 = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      forceRender = _useReducer4[1];

  var latestSelectedState = useRef();
  var selectedState = selector(temp.current);
  var checkForUpdates = useCallback(function () {
    var newSelectedState = selector(temp.current);

    if (equalityFn(newSelectedState, latestSelectedState.current)) {
      return;
    }

    latestSelectedState.current = newSelectedState;
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (!store) {
      return;
    }

    store.subscribe(checkForUpdates);
  }, [checkForUpdates, store]);
  return selectedState;
}
export function toBlockCoreDatas(blocks) {
  return blocks.map(function (_ref) {
    var key = _ref.key,
        title = _ref.title,
        icon = _ref.icon,
        component = _ref.component,
        props = _ref.props;
    return {
      key: key,
      icon: icon,
      title: title,
      props: props,
      component: component,
      parentKey: key.includes('/') ? key.substring(0, key.lastIndexOf('/')) : undefined
    };
  });
}