function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import sketchReducer, { defaultValue } from "./reducers";
import { ActionType } from "./reducers/actions";
import { getReducers } from "./utils/plugin";
import { jsx as _jsx } from "react/jsx-runtime";

/**
 * 创建Content状态
 */
export var AsanyContext = /*#__PURE__*/React.createContext({
  getState: function getState() {
    return {
      save: function save(project) {
        console.warn('project', project);
      },
      isReady: true,
      project: {},
      mode: 'VIEW',
      workspace: {},
      features: {
        zoom: false,
        ruler: false,
        drag: false,
        selecto: false
      },
      plugins: {},
      ui: {
        sidebar: {},
        aside: {},
        toolbar: {},
        scena: {
          zoom: 1
        }
      }
    };
  },
  subscribe: function subscribe() {
    return function () {};
  },
  dispatch: function dispatch(action) {
    console.warn('action', action);
  }
});

function useStore(mode) {
  var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useReducer = useReducer(sketchReducer, defaultValue(mode, plugins)),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 1),
      listeners = _useState2[0];

  var handleUnsubscribe = function handleUnsubscribe(callback) {
    return function () {
      var index = listeners.indexOf(callback);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  };

  var handleSubscribe = useCallback(function (callback) {
    listeners.unshift(callback);
    return handleUnsubscribe(callback);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [listeners]); // TODO 后期需要优化，解决由于 hover 导致的频繁触发

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
  var initStore = {
    getState: function getState() {
      return state;
    },
    dispatch: dispatch,
    subscribe: handleSubscribe
  };

  var _useState3 = useState(initStore),
      _useState4 = _slicedToArray(_useState3, 1),
      store = _useState4[0];

  useEffect(function () {
    store.getState = function () {
      return state;
    };

    handleDispatchSubscribe(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return store;
}

export var AsanyProvider = function AsanyProvider(props) {
  var children = props.children,
      version = props.version,
      value = props.value,
      plugins = props.plugins;
  var store = useStore(props.mode || 'CONFIG', plugins);
  var dispatch = store.dispatch;
  useEffect(function () {
    dispatch({
      type: ActionType.Init
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (!value) {
      return;
    }

    dispatch({
      type: ActionType.ChangeCase,
      payload: value
    });
    var reducers = getReducers(store.getState(), value.type);
    dispatch({
      type: ActionType.ChangeStateByPlugin,
      payload: {
        reducers: reducers,
        project: value
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return useMemo(function () {
    return /*#__PURE__*/_jsx(AsanyContext.Provider, {
      value: store,
      children: store.getState().isReady && children
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [version, store.getState().isReady]);
};