var _excluded = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { EventEmitter } from 'events';
import ReactComponentProvider from "../sketch/ReactComponentProvider";
import { useDeepCompareEffect } from "../utils";
import useComponent from "./useComponent";
import { jsx as _jsx } from "react/jsx-runtime";
var EVENT_REACT_COMPONENT_PROPS_CHANGE = 'EVENT_REACT_COMPONENT_PROPS_CHANGE';

function createReactComponentComponent(id, state, emitter, dev) {
  return /*#__PURE__*/React.forwardRef(function (externalProps, ref) {
    var children = externalProps.children,
        passthroughProps = _objectWithoutProperties(externalProps, _excluded);

    var _useReducer = useReducer(function (s) {
      return s + 1;
    }, 0),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        version = _useReducer2[0],
        forceRender = _useReducer2[1];

    var cache = useRef(externalProps || {});
    var _ref = state.current,
        component = _ref.component,
        props = _ref.props;
    useEffect(function () {
      emitter.addListener(EVENT_REACT_COMPONENT_PROPS_CHANGE, forceRender);
      return function () {
        emitter.removeListener(EVENT_REACT_COMPONENT_PROPS_CHANGE, forceRender);
      };
    }, []);
    useEffect(function () {
      for (var _i2 = 0, _Object$keys = Object.keys(externalProps); _i2 < _Object$keys.length; _i2++) {
        var _key = _Object$keys[_i2];

        if (cache.current[_key] !== externalProps[_key]) {
          forceRender();
          return;
        }
      }

      return function () {
        cache.current = externalProps;
      };
    }, [externalProps]);
    return /*#__PURE__*/_jsx(ReactComponentProvider, {
      id: id,
      value: props,
      dev: dev,
      version: version,
      children: component && /*#__PURE__*/React.createElement(component.component, _objectSpread(_objectSpread({}, passthroughProps), {}, {
        ref: ref
      }), children)
    });
  });
}

export default function useReactComponent(id) {
  var injectProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var component = useComponent(id);
  var emitter = useMemo(function () {
    return new EventEmitter();
  }, []);
  var state = useRef({
    component: component,
    props: injectProps
  });
  var reactComponent = useRef(createReactComponentComponent(options === null || options === void 0 ? void 0 : options.id, state, emitter, (options === null || options === void 0 ? void 0 : options.dev) || false));
  var forceRender = useCallback(function () {
    emitter.emit(EVENT_REACT_COMPONENT_PROPS_CHANGE); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    if (state.current.component === component) {
      return;
    }

    state.current.component = component;
    forceRender(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);
  useDeepCompareEffect(function () {
    if (state.current.props === injectProps) {
      return;
    }

    state.current.props = injectProps;
    forceRender();
  }, [injectProps]);
  return reactComponent.current;
}