function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import isEqual from 'lodash/isEqual';
import useSketch from "../hooks/useSketch";
import { defaultEqualityFn } from "../typings";
import { generateUUID, useDeepCompareEffect } from "../utils";
import { BlockRootProvider } from "./BlockContext";
import reducers from "./reducer";
import { useInternalStoreSelector } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
export var ReactComponentContext = /*#__PURE__*/React.createContext([]);

function useStore(id, dev) {
  var sketch = useSketch();

  var _useState = useState(id || generateUUID()),
      _useState2 = _slicedToArray(_useState, 1),
      COMPONENT_ID = _useState2[0];

  var _useReducer = useReducer(reducers, {
    blocks: []
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 1),
      listeners = _useState4[0];

  var handleUnsubscribe = useCallback(function (callback) {
    return function () {
      var index = listeners.indexOf(callback);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [listeners]);
  var handleSubscribe = useCallback(function (callback) {
    listeners.unshift(callback);
    return handleUnsubscribe(callback);
  }, [handleUnsubscribe, listeners]);
  var handleDispatchSubscribe = useCallback(function () {
    var _iterator = _createForOfIteratorHelper(listeners),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var listener = _step.value;
        listener();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }, [listeners]);

  var _useState5 = useState({
    id: COMPONENT_ID,
    getBlock: function getBlock(key) {
      var state = store.getState();
      return state.blocks.find(function (item) {
        return item.key === key;
      });
    },
    getState: function getState() {
      return state;
    },
    dispatch: dispatch,
    subscribe: handleSubscribe
  }),
      _useState6 = _slicedToArray(_useState5, 1),
      store = _useState6[0];

  useEffect(function () {
    store.getState = function () {
      return state;
    };

    handleDispatchSubscribe(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  useEffect(function () {
    sketch.setDev(dev);
    sketch.add({
      id: COMPONENT_ID,
      store: store
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return store;
}

export function useDispatch() {
  var store = useContext(ReactComponentContext);
  return store.dispatch;
}
export function useSelector(selector) {
  var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityFn;
  var store = useContext(ReactComponentContext);
  return useInternalStoreSelector(store, selector, equalityFn);
}

function compact(data) {
  return data.map(function (_ref) {
    var key = _ref.key,
        props = _ref.props;
    return {
      key: key,
      props: props
    };
  });
}

export default function ReactComponentProvider(props) {
  var id = props.id,
      children = props.children,
      version = props.version,
      value = props.value,
      dev = props.dev;
  var store = useStore(id, dev);
  var dispatch = store.dispatch;
  useDeepCompareEffect(function () {
    if (!value || isEqual(compact(value), compact(store.getState().blocks))) {
      return;
    }

    dispatch({
      type: 'UpdateAllBlockProps',
      payload: value
    });
  }, [value]);
  return useMemo(function () {
    return /*#__PURE__*/_jsx(ReactComponentContext.Provider, {
      value: store,
      children: /*#__PURE__*/_jsx(BlockRootProvider, {
        children: children
      })
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [version]);
}