var _excluded = ["className", "onSave", "container", "loading", "children"],
    _excluded2 = ["children"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

import { useImperativeHandle, useState } from 'react';
import React, { useCallback, useEffect, useReducer } from 'react';
import { isElement, isValidElementType } from 'react-is';
import classnames from 'classnames';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import Aside from "./components/aside";
import Scena from "./components/scena";
import Sidebar from "./components/sidebar";
import { AsanyProvider } from "./AsanyContext";
import { ActionType } from "./reducers/actions";
import RuntimeContainer from "./RuntimeContainer";
import Toolbar from "./components/toolbar/Toolbar";
import { useEditorDispatch, useEditor, useEditorSelector } from "./hooks";
import DefaultLoadingComponent from "./components/scena/LoadingComponent";
import "./icons";
import "./style/tailwind.css";
import "./style/index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Editor = /*#__PURE__*/React.forwardRef(function Editor(_ref, ref) {
  var _control$current;

  var className = _ref.className,
      onSave = _ref.onSave,
      container = _ref.container,
      _ref$loading = _ref.loading,
      LoadingComponent = _ref$loading === void 0 ? DefaultLoadingComponent : _ref$loading,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  var dispatch = useEditorDispatch();

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      offsetLeft = _useState2[0],
      setOffsetLeft = _useState2[1];

  var workspace = useEditorSelector(function (state) {
    return state.ui.scena.workspace;
  });
  var WorkComponent = useCallback(function (props) {
    if (isElement(workspace)) {
      return /*#__PURE__*/React.cloneElement(workspace, props);
    }

    if (isValidElementType(workspace)) {
      var _children = props.children,
          otherProps = _objectWithoutProperties(props, _excluded2);

      return /*#__PURE__*/React.createElement(workspace, otherProps, _children);
    }

    return /*#__PURE__*/_jsx("div", {
      children: "\u63D2\u4EF6\u672A\u914D\u7F6E Workspace \u7EC4\u4EF6"
    });
  }, [workspace]);
  var visible = useEditorSelector(function (state) {
    return state.ui.aside.visible;
  });
  var scenaToolbarVisible = useEditorSelector(function (state) {
    return state.ui.scena.toolbar.visible;
  });
  var loading = useEditorSelector(function (state) {
    return state.ui.scena.loading;
  });
  var control = useEditorSelector(function (state) {
    return state.ui.aside.control;
  });
  useEffect(function () {
    if (!onSave) {
      return;
    }

    dispatch({
      type: ActionType.BindSave,
      payload: onSave
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSave]);
  var handleResize = useCallback(function (x) {
    setOffsetLeft(x);
  }, []);
  var api = useEditor();
  useImperativeHandle(ref, function () {
    return api;
  });
  return /*#__PURE__*/_jsxs("div", {
    className: classnames('asany-editor sketch-container', className),
    children: [/*#__PURE__*/_jsx(Toolbar, _objectSpread({}, props)), /*#__PURE__*/_jsxs("div", {
      className: "asany-editor-body-container",
      children: [/*#__PURE__*/_jsxs("div", {
        className: classnames('sketch-body', {
          'settings-menu-expanded': visible
        }),
        children: [/*#__PURE__*/_jsx(Sidebar, {
          onResize: handleResize
        }), /*#__PURE__*/_jsx(Scena, {
          offsetLeft: offsetLeft,
          children: /*#__PURE__*/_jsx(WorkComponent, {})
        }), /*#__PURE__*/_jsx(Aside, {})]
      }), /*#__PURE__*/_jsx(LoadingComponent, {
        className: classnames({
          'scena-toolbar-visible': scenaToolbarVisible
        }),
        loading: loading,
        style: {
          paddingRight: visible ? control === null || control === void 0 ? void 0 : (_control$current = control.current) === null || _control$current === void 0 ? void 0 : _control$current.width : 0
        }
      })]
    })]
  });
});

function AsanyEditor(props, ref) {
  var children = props.children,
      project = props.project,
      onSave = props.onSave,
      onBack = props.onBack,
      _props$container = props.container,
      container = _props$container === void 0 ? RuntimeContainer : _props$container,
      _props$plugins = props.plugins,
      plugins = _props$plugins === void 0 ? [] : _props$plugins,
      loading = props.loading,
      className = props.className;

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      version = _useReducer2[0],
      forceRender = _useReducer2[1];

  useEffect(function () {
    if (!project) {
      return;
    }

    forceRender();
  }, [project]);
  return /*#__PURE__*/_jsx(AsanyProvider, {
    version: version,
    plugins: _toConsumableArray(plugins),
    value: project,
    children: /*#__PURE__*/_jsx(Editor, {
      ref: ref,
      className: className,
      onSave: onSave,
      loading: loading,
      container: container,
      onBack: onBack,
      children: children
    })
  });
}

export default /*#__PURE__*/React.forwardRef(AsanyEditor);