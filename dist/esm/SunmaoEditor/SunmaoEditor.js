function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import useMergedRef from '@react-hook/merged-ref';
import { SketchProvider, useSketch } from "../sunmao";
import AsanyEditor, { useDeepCompareMemo } from "../Designer";
import sketchPlugin from "./plugin";
import "./icons";
import { jsx as _jsx } from "react/jsx-runtime";
var InternalSunmaoEditor = /*#__PURE__*/React.forwardRef(function InternalSunmaoEditor(props, ref) {
  var id = props.id,
      name = props.name,
      data = props.data,
      dashboard = props.dashboard,
      onSave = props.onSave,
      onBack = props.onBack;

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      version = _useReducer2[0],
      forceRender = _useReducer2[1];

  var sketch = useSketch();
  var api = useRef(null);
  var project = useDeepCompareMemo(function () {
    return {
      id: id,
      name: name,
      data: data,
      type: 'component'
    };
  }, [id, name, data]);
  var handleSave = useCallback(function (project) {
    onSave && onSave(project.data);
  }, [onSave]);
  var multiRef = useMergedRef(api, ref, function () {
    forceRender();
  });
  useEffect(function () {
    if (!props.viewport || !api.current) {
      return;
    }

    if (typeof props.viewport == 'string') {
      api.current.scena.viewport(props.viewport);
    } else {
      api.current.scena.viewport(props.viewport.size[0], props.viewport.size[1]);
    }
  }, [version, props.viewport]);
  return /*#__PURE__*/_jsx(AsanyEditor, {
    ref: multiRef,
    plugins: [sketchPlugin(sketch, dashboard)],
    onSave: handleSave,
    onBack: onBack,
    className: "sunmao-editor",
    project: project
  });
});

function SunmaoEditor(props, ref) {
  return /*#__PURE__*/_jsx(SketchProvider, {
    children: /*#__PURE__*/_jsx(InternalSunmaoEditor, _objectSpread(_objectSpread({}, props), {}, {
      ref: ref
    }))
  });
}

export default /*#__PURE__*/React.forwardRef(SunmaoEditor);