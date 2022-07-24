function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useCallback, useReducer, useRef, useState } from 'react';
import classnames from 'classnames';
import Icon from '@asany/icons';
import { Resizer } from "../../Designer";
import BlockLayers from "./BlockLayers";
import Pages from "./ProjectDetails"; // 折叠面板最小化

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SUBPANEL_MIN_HEIGHT = 36; // 折叠面板默认高度

var SUBPANEL_DEFAULT_HEIGHT = SUBPANEL_MIN_HEIGHT + 300;

function Sidebar(props) {
  var _props$dashboard = props.dashboard,
      dashboard = _props$dashboard === void 0 ? /*#__PURE__*/_jsx(Pages, {}) : _props$dashboard;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      active = _useState2[0],
      setActive = _useState2[1];

  var state = useRef({
    prevOutlinePaneHeight: SUBPANEL_DEFAULT_HEIGHT,
    outlinePaneHeight: SUBPANEL_DEFAULT_HEIGHT,
    outlinePaneExpanded: true
  });

  var _useReducer = useReducer(function (s) {
    return s + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceRender = _useReducer2[1];

  var handleClick = useCallback(function () {
    state.current.outlinePaneExpanded = !state.current.outlinePaneExpanded;
    forceRender();
  }, []);
  var handleResizeStart = useCallback(function () {
    // 如果面板已经折叠，将初始位置设置到底部
    if (!state.current.outlinePaneExpanded) {
      state.current.outlinePaneHeight = SUBPANEL_MIN_HEIGHT;
    } else {
      // 记录原来的高度
      state.current.prevOutlinePaneHeight = state.current.outlinePaneHeight;
    }

    setActive(true);
  }, []);
  var handleResize = useCallback(function (y) {
    state.current.outlinePaneHeight += y;
    state.current.outlinePaneExpanded = state.current.outlinePaneHeight > SUBPANEL_MIN_HEIGHT;
    forceRender();
  }, []);
  var handleResizeEnd = useCallback(function () {
    // 拖拽折叠后，记录原展开高度
    if (!state.current.outlinePaneExpanded) {
      state.current.outlinePaneHeight = state.current.prevOutlinePaneHeight;
    }

    setActive(false);
  }, []);
  var _state$current = state.current,
      outlinePaneExpanded = _state$current.outlinePaneExpanded,
      outlinePaneHeight = _state$current.outlinePaneHeight; // 折叠面板最大高度为: 侧边栏 - 侧边栏标题栏高度

  var SUBPANEL_MAX_HEIGHT = window.innerHeight - 50 - 40;
  var outlinepaneheight = Math.min(SUBPANEL_MAX_HEIGHT, Math.max(outlinePaneHeight, SUBPANEL_MIN_HEIGHT));
  outlinepaneheight = outlinePaneExpanded ? outlinepaneheight : SUBPANEL_MIN_HEIGHT;
  return /*#__PURE__*/_jsxs("div", {
    className: classnames('sidebar-panel', {
      'resizer-y-active': active
    }),
    children: [/*#__PURE__*/_jsx("div", {
      className: "sidebar-screen-panel",
      children: dashboard
    }), /*#__PURE__*/_jsxs(Resizer, {
      className: "sidebar-subpanel",
      direction: "y",
      onResizeStart: handleResizeStart,
      onResize: handleResize,
      onResizeEnd: handleResizeEnd,
      style: {
        flexBasis: outlinepaneheight
      },
      children: [/*#__PURE__*/_jsxs("div", {
        className: "sidebar-subpanel-header",
        children: [/*#__PURE__*/_jsx("div", {
          className: "header-left",
          children: "\u5927\u7EB2"
        }), /*#__PURE__*/_jsx("div", {
          className: "header-right",
          children: /*#__PURE__*/_jsx(Icon, {
            onClick: handleClick,
            className: classnames('header-icon', {
              expanded: outlinePaneExpanded
            }),
            name: "AsanyEditor/Arrow"
          })
        })]
      }), /*#__PURE__*/_jsx("div", {
        className: "sidebar-subpanel-body",
        children: /*#__PURE__*/_jsx(BlockLayers, {})
      })]
    })]
  });
}

export default Sidebar;